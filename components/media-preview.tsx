"use client";

import * as React from "react";
import Image from "next/image";
import { Clock, User, CheckCircle, ExternalLink } from "lucide-react";
import { YoutubeIcon, InstagramIcon, FacebookIcon } from "./icons";
import { MediaMetadata } from "../types/media";
import { DownloadSelector } from "./download-selector";

interface MediaPreviewProps {
  metadata: MediaMetadata;
}

export function MediaPreview({ metadata }: MediaPreviewProps) {
  const isYoutube = metadata.platform === "youtube";
  const isFacebook = metadata.platform === "facebook";

  return (
    <div className="w-full bg-card rounded-2xl border border-border/80 shadow-xl overflow-hidden transition-all duration-300">
      {/* Top Header Badge */}
      <div className="px-5 py-3 border-b border-border bg-secondary/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isYoutube ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
              <YoutubeIcon className="w-3.5 h-3.5" />
              YouTube Video
            </span>
          ) : isFacebook ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <FacebookIcon className="w-3.5 h-3.5" />
              Facebook Video
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
              <InstagramIcon className="w-3.5 h-3.5" />
              Instagram Media
            </span>
          )}
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-500" /> Analysis Complete
          </span>
        </div>

        <a
          href={metadata.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          title="Open original video in new tab"
        >
          <span>Original Link</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* Media Info Section (Thumbnail + Details) */}
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Thumbnail with overlay duration */}
          <div className="relative w-full sm:w-64 h-40 sm:h-36 rounded-xl overflow-hidden bg-slate-900 border border-border flex-shrink-0 group">
            {metadata.thumbnail ? (
              <img
                src={metadata.thumbnail}
                alt={metadata.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No preview available
              </div>
            )}

            {metadata.durationFormatted && (
              <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white font-mono text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{metadata.durationFormatted}</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-2.5 flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-foreground leading-snug line-clamp-2">
              {metadata.title}
            </h2>

            {metadata.author && (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                <User className="w-3.5 h-3.5 text-primary" />
                <span className="font-medium text-foreground/90">{metadata.author}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
              <span className="px-2.5 py-1 rounded-md bg-secondary border border-border">
                {metadata.formats.length} Quality Options
              </span>
              {metadata.publishedAt && (
                <span className="px-2.5 py-1 rounded-md bg-secondary border border-border">
                  Published: {new Date(metadata.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quality and Format Selector */}
        <div className="pt-2 border-t border-border">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">Select Format & Quality</h3>
            <p className="text-xs text-muted-foreground">
              Choose your preferred resolution or audio extraction option.
            </p>
          </div>

          <DownloadSelector metadata={metadata} />
        </div>
      </div>
    </div>
  );
}
