import * as React from "react";
import { Link2, SlidersHorizontal, Download } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Paste Media Link",
    description: "Copy any supported public URL from YouTube (Videos or Shorts) or Instagram (Reels or Posts) and paste it into the analyzer.",
    icon: Link2,
  },
  {
    step: "02",
    title: "Inspect & Choose Quality",
    description: "Our server analyzes genuine stream formats available from the source, letting you select between HD video or MP3 audio.",
    icon: SlidersHorizontal,
  },
  {
    step: "03",
    title: "Instant Stream Download",
    description: "Click download to stream the media directly to your device via chunked HTTP transfer with instant cleanup.",
    icon: Download,
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 border-t border-border/80 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs uppercase font-bold tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            How MediaFlow Works
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Fast, intuitive, and designed to get your content downloaded in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="relative p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-black text-primary/30">{st.step}</span>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground">{st.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{st.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

