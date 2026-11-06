"use client";

import * as React from "react";
import { MediaAnalyzer } from "@/components/media-analyzer";
import { FeatureSection } from "@/components/feature-section";
import { HowItWorks } from "@/components/how-it-works";
import { SupportedPlatforms } from "@/components/supported-platforms";
import { FaqSection } from "@/components/faq-section";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-8 sm:pb-12 overflow-hidden">
        {/* Subtle decorative glowing background gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 dark:bg-primary/15 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[250px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card/80 backdrop-blur-sm text-xs font-medium text-foreground shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Fast, Authorized & Completely Database-Free</span>
          </div>

          {/* Headings */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
              Download Your <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-500 bg-clip-text text-transparent">
                Favorite Media
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
              Download and convert supported media into your preferred format with a simple and fast experience.
            </p>
          </div>

          {/* Quick Perks */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Dynamic Quality up to 4K
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" /> High-Bitrate MP3 Audio
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Zero Data Tracking
            </span>
          </div>

          {/* Main Media Input Interface */}
          <div className="pt-4 sm:pt-6">
            <MediaAnalyzer />
          </div>
        </div>
      </section>

      {/* Process / How It Works */}
      <HowItWorks />

      {/* Feature Showcase */}
      <FeatureSection />

      {/* Supported Platforms & Boundaries */}
      <SupportedPlatforms />

      {/* FAQ */}
      <FaqSection />
    </div>
  );
}

