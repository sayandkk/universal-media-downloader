import { Ytdl, type VideoInfo, type VideoFormat } from "@distube/ytdl-core";
import { MediaFormat, MediaMetadata } from "../../types/media";
import { MediaNotFoundError, ProcessingError } from "../errors";

// Create a singleton instance with modern client configuration
const ytdl = new Ytdl();

function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  if (mins >= 60) {
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hours}:${remMins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatBytes(bytes?: number): string | undefined {
  if (!bytes || isNaN(bytes) || bytes <= 0) return undefined;
  const units = ["B", "KB", "MB", "GB"];
  let val = bytes;
  let idx = 0;
  while (val >= 1024 && idx < units.length - 1) {
    val /= 1024;
    idx++;
  }
  return `${val.toFixed(1)} ${units[idx]}`;
}

export async function analyzeYoutubeVideo(normalizedUrl: string, videoId: string): Promise<MediaMetadata> {
  let info: VideoInfo;

  try {
    info = await ytdl.getInfo(normalizedUrl);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("private") || msg.includes("Sign in")) {
      throw new MediaNotFoundError(
        "This YouTube video is private or age-restricted.",
        "This video cannot be accessed because it is private, age-restricted, or removed."
      );
    }
    if (msg.includes("Video unavailable") || msg.includes("not found")) {
      throw new MediaNotFoundError(
        "YouTube video not found.",
        "The requested YouTube video does not exist or has been removed."
      );
    }
    throw new ProcessingError(
      `Failed to analyze YouTube video: ${msg}`,
      "Could not retrieve media details from YouTube. Please check the link and try again."
    );
  }

  const details = info.videoDetails;
  const rawFormats = info.formats || [];

  // Pick highest resolution thumbnail
  const thumbs = details.thumbnails || [];
  const bestThumbnail =
    thumbs.length > 0
      ? thumbs[thumbs.length - 1].url
      : `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  const durationSec =
    typeof details.lengthSeconds === "number"
      ? details.lengthSeconds
      : parseInt(String(details.lengthSeconds || "0"), 10);

  // Group and deduct genuine available resolutions
  const formatList: MediaFormat[] = [];
  const seenResolutions = new Set<string>();

  // 1. Process progressive formats (Video + Audio combined)
  const progressiveFormats = rawFormats.filter((f) => f.hasVideo && f.hasAudio && f.container === "mp4");
  for (const f of progressiveFormats) {
    const res = f.qualityLabel || `${f.height}p`;
    const key = `prog-${res}`;
    if (!seenResolutions.has(key)) {
      seenResolutions.add(key);
      const size = f.contentLength
        ? Number(f.contentLength)
        : f.bitrate && durationSec
          ? Math.round((f.bitrate * durationSec) / 8)
          : undefined;

      formatList.push({
        formatId: String(f.itag),
        container: "mp4",
        resolution: res,
        category: "video_audio",
        hasVideo: true,
        hasAudio: true,
        isMuxed: true,
        filesize: size,
        filesizeFormatted: formatBytes(size),
        fps: f.fps,
        label: `${res} (MP4 Video + Audio)`,
        qualityLabel: f.qualityLabel,
        videoCodec: f.videoCodec,
        audioCodec: f.audioCodec,
      });
    }
  }

  // 2. Process high-definition video streams (Adaptive formats: 1080p, 1440p, 2160p, 720p, 480p)
  const videoOnlyFormats = rawFormats.filter((f) => f.hasVideo && !f.hasAudio && (f.container === "mp4" || f.container === "webm"));
  // Sort descending by height
  videoOnlyFormats.sort((a, b) => (b.height || 0) - (a.height || 0));

  for (const f of videoOnlyFormats) {
    const res = f.qualityLabel || `${f.height}p`;
    const key = `adaptive-${res}-${f.container}`;
    if (!seenResolutions.has(key) && f.height && f.height >= 144) {
      seenResolutions.add(key);
      const size = f.contentLength
        ? Number(f.contentLength)
        : f.bitrate && durationSec
          ? Math.round((f.bitrate * durationSec) / 8)
          : undefined;

      formatList.push({
        formatId: String(f.itag),
        container: f.container as "mp4" | "webm",
        resolution: res,
        category: "video_only",
        hasVideo: true,
        hasAudio: false,
        isMuxed: false,
        filesize: size,
        filesizeFormatted: formatBytes(size),
        fps: f.fps,
        label: `${res} (Video Only - ${f.container.toUpperCase()})`,
        qualityLabel: f.qualityLabel,
        videoCodec: f.videoCodec,
      });
    }
  }

  // 3. Process Audio Only formats
  const audioFormats = rawFormats.filter((f) => !f.hasVideo && f.hasAudio);
  audioFormats.sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0));

  // Add primary converted MP3 option
  const bestAudio = audioFormats[0];
  const estMp3Size = durationSec > 0 ? Math.round((192000 * durationSec) / 8) : undefined;
  formatList.push({
    formatId: "audio-mp3",
    container: "mp3",
    resolution: "Audio Only",
    category: "audio_only",
    hasVideo: false,
    hasAudio: true,
    isMuxed: false,
    filesize: estMp3Size,
    filesizeFormatted: formatBytes(estMp3Size),
    audioBitrate: 192,
    label: "MP3 Audio (192 kbps Converted)",
  });

  // Add native audio streams (e.g. M4A / AAC)
  for (const f of audioFormats) {
    if (f.container === "mp4" || f.container === "m4a") {
      const size = f.contentLength ? Number(f.contentLength) : undefined;
      formatList.push({
        formatId: String(f.itag),
        container: "m4a",
        resolution: "Audio Only",
        category: "audio_only",
        hasVideo: false,
        hasAudio: true,
        isMuxed: false,
        filesize: size,
        filesizeFormatted: formatBytes(size),
        audioBitrate: f.audioBitrate,
        label: `M4A Audio (${f.audioBitrate || 128} kbps Native)`,
        audioCodec: f.audioCodec,
      });
      break; // Keep the best native m4a
    }
  }

  return {
    id: videoId,
    platform: "youtube",
    originalUrl: normalizedUrl,
    title: details.title || "Untitled Video",
    thumbnail: bestThumbnail,
    author: details.author?.name || "YouTube Creator",
    duration: durationSec,
    durationFormatted: formatDuration(durationSec),
    formats: formatList,
    publishedAt: details.publishDate,
  };
}

export function getYoutubeDownloadStream(
  url: string,
  itagOrSpecial: string
) {
  if (itagOrSpecial === "audio-mp3") {
    // Request highest audio quality stream for conversion
    return ytdl.download(url, {
      quality: "highestaudio",
      filter: (f) => !f.hasVideo && f.hasAudio,
    });
  }

  const itagNum = parseInt(itagOrSpecial, 10);
  if (!isNaN(itagNum)) {
    return ytdl.download(url, { quality: itagNum });
  }

  // Fallback to highest progressive format
  return ytdl.download(url, {
    quality: "highest",
    filter: (f) => f.hasVideo && f.hasAudio,
  });
}
