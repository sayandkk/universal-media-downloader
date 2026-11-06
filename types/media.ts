export type PlatformType = "youtube" | "instagram" | "facebook";

export type MediaFormatCategory = "video_audio" | "video_only" | "audio_only";

export interface MediaFormat {
  formatId: string;
  container: "mp4" | "webm" | "mp3" | "m4a" | "ogg";
  resolution: string; // e.g., '1080p', '720p', 'Audio Only'
  category: MediaFormatCategory;
  hasVideo: boolean;
  hasAudio: boolean;
  isMuxed?: boolean;
  filesize?: number;
  filesizeFormatted?: string;
  fps?: number;
  label: string;
  qualityLabel?: string;
  audioBitrate?: number;
  videoCodec?: string;
  audioCodec?: string;
}

export interface MediaMetadata {
  id: string;
  platform: PlatformType;
  originalUrl: string;
  title: string;
  thumbnail: string;
  author?: string;
  duration?: number; // in seconds
  durationFormatted?: string;
  formats: MediaFormat[];
  directDownloadUrl?: string; // used for direct Instagram stream if available
  publishedAt?: string;
}

export interface AnalyzeResponse {
  success: boolean;
  data?: MediaMetadata;
  error?: string;
  code?: string;
}

export interface DownloadRequestPayload {
  url: string;
  formatId: string;
  type?: "video" | "audio";
}

