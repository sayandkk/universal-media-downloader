"use client";

import * as React from "react";
import { Download, Film, Music, Volume2, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { MediaFormat, MediaMetadata } from "../types/media";

interface DownloadSelectorProps {
  metadata: MediaMetadata;
  onDownloadStart?: (format: MediaFormat) => void;
}

export function DownloadSelector({ metadata, onDownloadStart }: DownloadSelectorProps) {
  const [activeTab, setActiveTab] = React.useState<"all" | "video_audio" | "video_only" | "audio_only">("all");
  const [selectedFormatId, setSelectedFormatId] = React.useState<string>(() => {
    // Default to progressive 720p, 360p or MP3 if available
    const defaultFmt =
      metadata.formats.find((f) => f.category === "video_audio") ||
      metadata.formats.find((f) => f.formatId === "audio-mp3") ||
      metadata.formats[0];
    return defaultFmt?.formatId || "";
  });

  // Keep selected format synchronized when a new video is analyzed
  React.useEffect(() => {
    const defaultFmt =
      metadata.formats.find((f) => f.category === "video_audio") ||
      metadata.formats.find((f) => f.formatId === "audio-mp3") ||
      metadata.formats[0];
    if (defaultFmt) {
      setSelectedFormatId(defaultFmt.formatId);
    }
  }, [metadata]);
  const [downloading, setDownloading] = React.useState(false);
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);
  const [downloadError, setDownloadError] = React.useState<string | null>(null);

  const filteredFormats = React.useMemo(() => {
    if (activeTab === "all") return metadata.formats;
    return metadata.formats.filter((f) => f.category === activeTab);
  }, [metadata.formats, activeTab]);

  const selectedFormat = metadata.formats.find((f) => f.formatId === selectedFormatId);

  const handleDownload = async () => {
    if (!selectedFormat) return;
    setDownloading(true);
    setDownloadError(null);
    setDownloadSuccess(false);

    if (onDownloadStart) {
      onDownloadStart(selectedFormat);
    }

    try {
      // Trigger download using GET endpoint with proper query parameters
      // This allows direct browser streaming with native browser download manager
      const downloadUrl = `/api/media/download?url=${encodeURIComponent(
        metadata.originalUrl
      )}&formatId=${encodeURIComponent(selectedFormat.formatId)}`;

      // Determine proper file extension and build clean, extension-safe filename for Windows/macOS/Linux
      const ext = selectedFormat.container || (selectedFormat.category === "audio_only" ? "mp3" : "mp4");
      const rawTitle = metadata.title || "media";
      let cleanTitle = rawTitle.replace(/[<>:"/\\|?*\x00-\x1F]/g, "").trim();
      cleanTitle = cleanTitle.replace(/^[.\-_\s]+|[.\-_\s]+$/g, "");
      if (!cleanTitle || cleanTitle.length < 2) {
        cleanTitle = `${metadata.platform}_video_${metadata.id || "media"}`;
      }
      const safeFilename = `${cleanTitle.slice(0, 50)}.${ext}`;

      // Create a temporary hidden link to start download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", safeFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 6000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to initiate download.";
      setDownloadError(msg);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-secondary/80 rounded-xl border border-border">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
            activeTab === "all"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All Formats ({metadata.formats.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("video_audio")}
          className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "video_audio"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Film className="w-3.5 h-3.5 text-emerald-500" />
          Video + Audio
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("audio_only")}
          className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "audio_only"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Music className="w-3.5 h-3.5 text-blue-500" />
          Audio (MP3 / M4A)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("video_only")}
          className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "video_only"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Film className="w-3.5 h-3.5 text-indigo-500" />
          Video Only (HD / 4K)
        </button>
      </div>

      {/* Dynamic Available Resolutions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
        {filteredFormats.map((fmt) => {
          const isSelected = selectedFormatId === fmt.formatId;
          const isMp3 = fmt.formatId === "audio-mp3";
          const is4K = fmt.resolution.includes("2160p") || fmt.resolution.includes("4K");
          const isHD = fmt.resolution.includes("1080p") || fmt.resolution.includes("720p");

          return (
            <button
              key={`${fmt.formatId}-${fmt.resolution}-${fmt.container}`}
              type="button"
              onClick={() => setSelectedFormatId(fmt.formatId)}
              className={`text-left p-3.5 rounded-xl border transition-all relative group flex items-start justify-between ${
                isSelected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm"
                  : "border-border bg-card/60 hover:bg-card hover:border-foreground/20"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm sm:text-base text-foreground">
                    {fmt.resolution}
                  </span>
                  <span className="text-xs uppercase px-1.5 py-0.5 rounded font-mono font-medium bg-secondary text-foreground/80">
                    {fmt.container}
                  </span>

                  {is4K && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      4K Ultra
                    </span>
                  )}
                  {isHD && !is4K && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                      HD
                    </span>
                  )}
                  {isMp3 && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-500 border border-purple-500/20 flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> MP3
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  {fmt.hasAudio && fmt.hasVideo && (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <Volume2 className="w-3 h-3" /> Audio Included
                    </span>
                  )}
                  {fmt.hasVideo && !fmt.hasAudio && (
                    <span className="text-muted-foreground">Video Only</span>
                  )}
                  {fmt.hasAudio && !fmt.hasVideo && (
                    <span className="text-purple-600 dark:text-purple-400">Audio Track</span>
                  )}
                  {fmt.fps && <span>{fmt.fps} FPS</span>}
                </div>
              </div>

              {fmt.filesizeFormatted && (
                <div className="text-right">
                  <span className="text-xs font-mono font-medium text-muted-foreground bg-secondary/80 px-2 py-1 rounded-md">
                    {fmt.filesizeFormatted}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Action / Download CTA */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleDownload}
          disabled={!selectedFormat || downloading}
          className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
            downloading
              ? "bg-primary/70 cursor-not-allowed"
              : "bg-primary hover:bg-primary-hover shadow-primary/25 hover:shadow-primary/35 active:scale-[0.99]"
          }`}
        >
          {downloading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Preparing Download Stream...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>
                Download {selectedFormat?.resolution || "Media"} (.{selectedFormat?.container || "mp4"})
              </span>
            </>
          )}
        </button>

        {downloadSuccess && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Download dispatched! Your browser is streaming the file.</span>
          </div>
        )}

        {downloadError && (
          <div className="mt-3 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{downloadError}</span>
          </div>
        )}
      </div>
    </div>
  );
}

