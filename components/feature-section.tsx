import * as React from "react";
import { Zap, ShieldCheck, Database, Music2, Sliders, Smartphone } from "lucide-react";

const features = [
  {
    icon: Sliders,
    title: "Dynamic Quality Detection",
    description: "Inspects genuine available streams — from lightweight 360p mobile formats up to crystal-clear 1080p and 4K UHD resolutions.",
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    icon: Music2,
    title: "Audio Extraction to MP3",
    description: "Extract soundtrack audio and convert it to high-bitrate 192 kbps MP3 files on the fly with integrated FFmpeg processing.",
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    icon: Database,
    title: "Zero Database & Zero Tracking",
    description: "Stateless architecture. We do not store your download history, track personal files, or maintain user accounts.",
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Chunked Stream Delivery",
    description: "Direct HTTP streaming transfers media bytes straight to your browser without long server buffering delays.",
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Security & SSRF Hardening",
    description: "Strict URL validation, protocol allowlisting, and private IP protection ensure safe and abuse-resistant operations.",
    color: "text-indigo-500 bg-indigo-500/10",
  },
  {
    icon: Smartphone,
    title: "Mobile & Desktop Optimized",
    description: "Fully responsive modern interface tailored for quick paste-and-download workflows across any device.",
    color: "text-pink-500 bg-pink-500/10",
  },
];

export function FeatureSection() {
  return (
    <section className="py-16 sm:py-24 border-t border-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Engineered for Speed, Quality & Simplicity
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            A purpose-built media utility engineered without bloated ads, tracking cookies, or subscription walls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 rounded-2xl bg-card border border-border/80 hover:border-foreground/20 hover:shadow-lg transition-all duration-300 space-y-3"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

