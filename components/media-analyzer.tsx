"use client";

import * as React from "react";
import {
  Link as LinkIcon,
  Clipboard,
  X,
  Search,
  Music,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { YoutubeIcon, InstagramIcon, FacebookIcon } from "./icons";
import { detectPlatformFromInput } from "@/lib/validators/media-url";
import { MediaMetadata } from "@/types/media";
import { ProcessingStatus, StatusType } from "./processing-status";
import { MediaPreview } from "./media-preview";

interface MediaAnalyzerProps {
  initialPlatform?: "youtube" | "instagram" | "facebook" | "mp3" | "all";
}

export function MediaAnalyzer({ initialPlatform = "all" }: MediaAnalyzerProps) {
  const [url, setUrl] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState<"all" | "youtube" | "instagram" | "facebook" | "mp3">(initialPlatform);
  const [status, setStatus] = React.useState<StatusType>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [metadata, setMetadata] = React.useState<MediaMetadata | null>(null);

  // Sync tab if initialPlatform prop changes
  React.useEffect(() => {
    if (initialPlatform) {
      setSelectedTab(initialPlatform);
    }
  }, [initialPlatform]);

  const detectedPlatform = React.useMemo(() => detectPlatformFromInput(url), [url]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
      }
    } catch {
      // Clipboard access denied or unsupported
    }
  };

  const handleClear = () => {
    setUrl("");
    setStatus("idle");
    setErrorMessage(null);
    setMetadata(null);
  };

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanUrl = url.trim();

    if (!cleanUrl) {
      setErrorMessage("Please enter or paste a valid media URL.");
      setStatus("error");
      return;
    }

    setStatus("analyzing");
    setErrorMessage(null);
    setMetadata(null);

    try {
      const res = await fetch("/api/media/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: cleanUrl }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to analyze media.");
      }

      setMetadata(data.data);
      setStatus("ready");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Platform Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/80 shadow-sm w-fit mx-auto">
        <button
          type="button"
          onClick={() => setSelectedTab("all")}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
            selectedTab === "all"
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Auto Detect
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab("youtube")}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
            selectedTab === "youtube"
              ? "bg-red-600 text-white shadow-md shadow-red-600/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <YoutubeIcon className="w-4 h-4 text-red-500 group-hover:text-white" />
          YouTube
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab("instagram")}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
            selectedTab === "instagram"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-pink-600/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <InstagramIcon className="w-4 h-4 text-pink-500" />
          Instagram
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab("facebook")}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
            selectedTab === "facebook"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FacebookIcon className="w-4 h-4 text-blue-500 group-hover:text-white" />
          Facebook
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab("mp3")}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
            selectedTab === "mp3"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Music className="w-4 h-4 text-indigo-400" />
          Video to MP3
        </button>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleAnalyze} className="relative">
        <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5 p-2 bg-card rounded-2xl border-2 border-border/80 shadow-2xl focus-within:border-primary/80 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
          <div className="relative flex items-center flex-1 min-w-0 pl-3">
            <LinkIcon className="w-5 h-5 text-muted-foreground flex-shrink-0 mr-3" />

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={
                selectedTab === "instagram"
                  ? "Paste Instagram Reel or Post link (e.g. instagram.com/reel/...)"
                  : selectedTab === "facebook"
                  ? "Paste Facebook Video, Watch, or Reel link (e.g. facebook.com/watch/...)"
                  : selectedTab === "mp3"
                  ? "Paste YouTube or Facebook link to extract high-bitrate MP3 audio..."
                  : "Paste YouTube, Instagram, or Facebook link here..."
              }
              className="w-full bg-transparent text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
              autoFocus
            />

            {/* Platform Detection Pill */}
            {detectedPlatform && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full mr-2 bg-secondary border border-border text-foreground/80 flex-shrink-0 animate-in fade-in">
                {detectedPlatform === "youtube" ? (
                  <YoutubeIcon className="w-3 h-3 text-red-500" />
                ) : detectedPlatform === "instagram" ? (
                  <InstagramIcon className="w-3 h-3 text-pink-500" />
                ) : (
                  <FacebookIcon className="w-3 h-3 text-blue-600" />
                )}
                <span className="capitalize">{detectedPlatform}</span>
              </span>
            )}

            {/* Clear Button */}
            {url && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary mr-1 transition-colors"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Paste Button */}
            <button
              type="button"
              onClick={handlePaste}
              className="hidden sm:flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors mr-1"
              title="Paste from clipboard"
            >
              <Clipboard className="w-3.5 h-3.5" />
              Paste
            </button>
          </div>

          {/* Mobile Paste Button */}
          <div className="flex sm:hidden justify-between items-center px-1">
            <button
              type="button"
              onClick={handlePaste}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-secondary text-foreground"
            >
              <Clipboard className="w-3.5 h-3.5" />
              Paste from Clipboard
            </button>
            {detectedPlatform && (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-foreground/80">
                <span className="capitalize">{detectedPlatform}</span>
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "analyzing"}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            {status === "analyzing" ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Analyze</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Processing Status Banner */}
      <ProcessingStatus
        status={status}
        errorMessage={errorMessage || undefined}
        message={status === "analyzing" ? "Inspecting media metadata and stream resolutions..." : undefined}
      />

      {/* Media Preview Card */}
      {metadata && <MediaPreview metadata={metadata} />}
    </div>
  );
}
