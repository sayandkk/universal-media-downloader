import { MediaFormat, MediaMetadata } from "../../types/media";
import { MediaNotFoundError, ValidationError, ProcessingError } from "../errors";

interface SnapSaveMedia {
  url: string;
  thumbnail?: string;
  type?: string;
  resolution?: string;
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

export async function analyzeInstagramMedia(
  normalizedUrl: string,
  shortcode: string,
  type: "reel" | "post" | "story" = "reel"
): Promise<MediaMetadata> {
  if (type === "story") {
    throw new ValidationError(
      "Instagram Stories require active user authentication and are ephemeral.",
      "Instagram Stories are private/ephemeral content requiring account login. Downloading Stories without user credentials is not supported."
    );
  }

  try {
    // Dynamically import snapsave-media-downloader (ESM module)
    const { snapsave } = await import("snapsave-media-downloader");
    const result = (await snapsave(normalizedUrl, { retry: 2, retryDelay: 500 })) as SnapSaveResponse;

    if (result && result.success && result.data?.media && result.data.media.length > 0) {
      const primaryMedia = result.data.media[0];
      const videoUrl = primaryMedia.url;
      const thumbnail =
        primaryMedia.thumbnail ||
        result.data.preview ||
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80";

      const rawDesc = result.data.description?.replace(/\s+/g, " ").trim() || "";
      const strippedDesc = rawDesc.replace(/^[.\-_\s]+|[.\-_\s]+$/g, "");
      const title =
        strippedDesc.length > 2
          ? strippedDesc.slice(0, 80)
          : type === "reel"
          ? `Instagram Reel (${shortcode})`
          : `Instagram Post (${shortcode})`;

      const formats: MediaFormat[] = [
        {
          formatId: "insta-video",
          container: "mp4",
          resolution: primaryMedia.resolution || "HD Video",
          category: "video_audio",
          hasVideo: true,
          hasAudio: true,
          isMuxed: true,
          label: "Instagram HD Video (MP4 Video + Audio)",
        },
        {
          formatId: "insta-audio-mp3",
          container: "mp3",
          resolution: "Audio Only",
          category: "audio_only",
          hasVideo: false,
          hasAudio: true,
          isMuxed: false,
          label: "Instagram Audio Track (MP3)",
        },
      ];

      return {
        id: shortcode,
        platform: "instagram",
        originalUrl: normalizedUrl,
        title,
        thumbnail,
        author: "Instagram Creator",
        formats,
        directDownloadUrl: videoUrl,
      };
    }
  } catch (err: unknown) {
    console.warn("[Instagram] Primary resolver failed, testing fallback:", err);
  }

  // Fallback: If media could not be resolved
  throw new MediaNotFoundError(
    "This Instagram Reel/Post is protected by Meta's authentication policy or is private.",
    "This Instagram Reel could not be accessed. It may belong to a private account, require Instagram login, or be restricted by regional Meta controls."
  );
}
