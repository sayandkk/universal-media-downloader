import { MediaFormat, MediaMetadata } from "../../types/media";
import { MediaNotFoundError, ProcessingError } from "../errors";

interface SnapSaveMedia {
  url: string;
  thumbnail?: string;
  type?: string;
  resolution?: string;
  shouldRender?: boolean;
}

interface SnapSaveResponse {
  success: boolean;
  data?: {
    media?: SnapSaveMedia[];
    description?: string;
    preview?: string;
  };
  message?: string;
}

export function cleanFacebookTitle(rawDesc: string | undefined, videoId: string): string {
  if (!rawDesc) return `Facebook Video (${videoId})`;
  const normalized = rawDesc.replace(/\s+/g, " ").trim();
  // Strip leading/trailing dots, spaces, dashes, and underscores
  const stripped = normalized.replace(/^[.\-_\s]+|[.\-_\s]+$/g, "");
  if (!stripped || stripped.length < 2) {
    return `Facebook Video (${videoId})`;
  }
  return stripped.slice(0, 90);
}

export function extractDirectFbcdnStream(rawUrl: string): { url: string; headers: Record<string, string> } {
  const defaultHeaders: Record<string, string> = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  };

  try {
    if (rawUrl.includes("token=")) {
      const token = rawUrl.split("token=")[1].split("&")[0];
      const payloadStr = Buffer.from(token.split(".")[1], "base64").toString("utf8");
      const payload = JSON.parse(payloadStr);

      if (payload.url && typeof payload.url === "string" && payload.url.startsWith("http")) {
        return {
          url: payload.url,
          headers: payload.headers ? { ...defaultHeaders, ...payload.headers } : defaultHeaders,
        };
      }
    }
  } catch {
    // If token parsing fails, fall back to raw URL
  }

  return { url: rawUrl, headers: defaultHeaders };
}

export async function analyzeFacebookVideo(
  normalizedUrl: string,
  videoId: string
): Promise<MediaMetadata> {
  try {
    const { snapsave } = await import("snapsave-media-downloader");
    const result = (await snapsave(normalizedUrl, {
      retry: 2,
      retryDelay: 500,
    })) as SnapSaveResponse;

    if (result && result.success && result.data?.media && result.data.media.length > 0) {
      const allMedia = result.data.media;
      // Filter out formats that require external asynchronous cloud rendering queues if direct formats exist
      const directMedia = allMedia.filter((m) => !m.shouldRender && !m.url.includes("render.php"));
      const mediaList = directMedia.length > 0 ? directMedia : allMedia;
      const primaryMedia = mediaList[0];

      const thumbnail =
        result.data.preview ||
        primaryMedia.thumbnail ||
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop&q=80";

      const title = cleanFacebookTitle(result.data.description, videoId);

      const formats: MediaFormat[] = [];

      // Add each valid direct video resolution
      for (let i = 0; i < mediaList.length; i++) {
        const item = mediaList[i];
        const resLabel = item.resolution || (i === 0 ? "720p HD" : "360p SD");
        const formatId = `fb-${resLabel.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}-${i}`;

        formats.push({
          formatId,
          container: "mp4",
          resolution: resLabel,
          category: "video_audio",
          hasVideo: true,
          hasAudio: true,
          isMuxed: true,
          label: `${resLabel} (MP4 Video + Audio)`,
        });
      }

      // Add MP3 Audio extraction format
      formats.push({
        formatId: "fb-audio-mp3",
        container: "mp3",
        resolution: "Audio Only",
        category: "audio_only",
        hasVideo: false,
        hasAudio: true,
        isMuxed: false,
        audioBitrate: 192,
        label: "MP3 Audio Track (192 kbps Converted)",
      });

      return {
        id: videoId,
        platform: "facebook",
        originalUrl: normalizedUrl,
        title,
        thumbnail,
        author: "Facebook Creator",
        formats,
        directDownloadUrl: primaryMedia.url,
      };
    }
  } catch (err: unknown) {
    console.warn("[Facebook] Primary resolver warning:", err);
  }

  throw new MediaNotFoundError(
    "This Facebook video is private, restricted, or unavailable.",
    "This Facebook video could not be accessed. It may be restricted to private groups, require Facebook login, or have been deleted."
  );
}

export async function getFacebookStreamInfo(
  normalizedUrl: string,
  formatId: string
): Promise<{ streamUrl: string; headers: Record<string, string>; title: string }> {
  const { snapsave } = await import("snapsave-media-downloader");
  const result = (await snapsave(normalizedUrl, {
    retry: 2,
    retryDelay: 500,
  })) as SnapSaveResponse;

  if (!result || !result.success || !result.data?.media || result.data.media.length === 0) {
    throw new MediaNotFoundError(
      "Could not resolve downloadable stream for this Facebook video.",
      "The video could not be streamed from Facebook CDN."
    );
  }

  const allMedia = result.data.media;
  const directMedia = allMedia.filter((m) => !m.shouldRender && !m.url.includes("render.php"));
  const mediaList = directMedia.length > 0 ? directMedia : allMedia;

  let targetMedia = mediaList[0];

  if (formatId !== "fb-audio-mp3") {
    const parts = formatId.split("-");
    const idx = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(idx) && mediaList[idx]) {
      targetMedia = mediaList[idx];
    }
  }

  const extracted = extractDirectFbcdnStream(targetMedia.url);
  const title = cleanFacebookTitle(result.data.description, "Video");

  return {
    streamUrl: extracted.url,
    headers: extracted.headers,
    title,
  };
}
