"use client";

import * as React from "react";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export type StatusType = "idle" | "analyzing" | "preparing" | "ready" | "error";

interface ProcessingStatusProps {
  status: StatusType;
  message?: string;
  errorMessage?: string;
}

export function ProcessingStatus({ status, message, errorMessage }: ProcessingStatusProps) {
  if (status === "idle") return null;

  if (status === "analyzing" || status === "preparing") {
    return (
      <div className="w-full p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 flex items-center gap-3 animate-in fade-in">
        <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
        <div className="space-y-0.5">
          <p className="text-sm font-semibold">
            {status === "analyzing" ? "Analyzing Media URL..." : "Preparing Media Stream..."}
          </p>
          <p className="text-xs text-muted-foreground">
            {message || "Retrieving genuine available formats and stream manifests from the source."}
          </p>
        </div>
      </div>
    );
  }

  if (status === "ready") {
    return (
      <div className="w-full p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 flex items-center gap-3 animate-in fade-in">
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold">Analysis Successful</p>
          <p className="text-xs text-muted-foreground">{message || "Available download options are ready below."}</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="w-full p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive flex items-center gap-3 animate-in fade-in">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold">Unable to Process Media</p>
          <p className="text-xs text-muted-foreground">
            {errorMessage || message || "Please verify the link and ensure the content is publicly accessible."}
          </p>
        </div>
      </div>
    );
  }

  return null;
}

