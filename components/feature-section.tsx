import * as React from "react";
import { Zap, ShieldCheck, Database, Music2, Sliders, Smartphone, CheckCircle2, Sparkles } from "lucide-react";

const features = [
  {
    icon: Sliders,
    title: "Dynamic Quality up to 4K UHD",
    description: "Inspects genuine platform streams to deliver the original uploaded resolutions — from lightweight 360p mobile files up to 1080p Full HD, 1440p QHD, and 4K 2160p.",
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    icon: Music2,
    title: "High-Bitrate 192 kbps MP3 Audio",
    description: "Extract pristine audio tracks from any supported video URL and convert them to universal 192 kbps MP3 files on-the-fly with integrated FFmpeg audio processing.",
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    icon: Sparkles,
    title: "No Watermark or Re-encoding Loss",
    description: "Downloads media directly from authorized content delivery networks in standard ISO MP4 and MP3 containers without adding watermarks or degrading visual quality.",
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    icon: Database,
    title: "100% Database-Free & Zero Tracking",
    description: "Strictly stateless architecture. We do not store your downloads, track search queries, retain IP logs, or require user accounts and passwords.",
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "High-Speed Chunked Streaming",
    description: "Direct chunked HTTP transfer streams video and audio bytes straight into your browser's download manager with zero server disk buffering delay.",
    color: "text-indigo-500 bg-indigo-500/10",
  },
  {
    icon: Smartphone,
    title: "Cross-Device Mobile & Desktop Web App",
    description: "Works natively inside Chrome, Safari, Edge, and Firefox on iPhone, Android, iPad, Windows, and Mac without needing to install third-party APKs or software.",
    color: "text-pink-500 bg-pink-500/10",
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-16 sm:py-24 border-t border-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs uppercase font-bold tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            Why Choose Universal Media Downloader
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            The Ultimate Free Online Video & Audio Downloader
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            A fast, clean, and reliable media utility engineered without intrusive pop-up ads, malware, sign-up forms, or artificial speed throttles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 sm:p-7 rounded-2xl bg-card border border-border/80 hover:border-foreground/20 hover:shadow-lg transition-all duration-300 space-y-3.5"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
