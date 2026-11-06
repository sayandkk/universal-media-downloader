import type { Metadata } from "next";
import { MediaAnalyzer } from "@/components/media-analyzer";
import { FeatureSection } from "@/components/feature-section";
import { HowItWorks } from "@/components/how-it-works";
import { SupportedPlatforms } from "@/components/supported-platforms";
import { FaqSection } from "@/components/faq-section";
import { HOMEPAGE_FAQS } from "@/lib/seo/faqs";
import {
  WebApplicationJsonLd,
  WebSiteJsonLd,
  FaqJsonLd,
} from "@/components/seo/json-ld";
import { SITE_CONFIG } from "@/lib/seo/config";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Universal Media Downloader — Free Online Video & Audio Downloader",
  description:
    "Download and convert authorized YouTube videos, Shorts, Instagram Reels, and Facebook Watch videos into MP4 and high-bitrate MP3 audio. 100% database-free, fast, and secure.",
  alternates: {
    canonical: SITE_CONFIG.productionUrl,
  },
  openGraph: {
    title: "Universal Media Downloader — Free Online Video & Audio Downloader",
    description:
      "Download and convert authorized YouTube, Instagram, and Facebook media into MP4 and MP3 audio with dynamic quality detection up to 4K.",
    url: SITE_CONFIG.productionUrl,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal Media Downloader — Free Online Media Utility",
    description:
      "Download authorized YouTube, Instagram, and Facebook videos in dynamic resolutions or extract 192 kbps MP3 audio.",
  },
};

export default function HomePage() {
  const faqJsonLdItems = HOMEPAGE_FAQS.map((f) => ({
    question: f.q,
    answer: f.a,
  }));

  return (
    <div className="space-y-12 sm:space-y-20 pb-16">
      {/* Schema.org Structured Data injected on Server Render */}
      <WebApplicationJsonLd />
      <WebSiteJsonLd />
      <FaqJsonLd items={faqJsonLdItems} />

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
              Universal Media <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-500 bg-clip-text text-transparent">
                Downloader
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
              Download and convert your favorite authorized videos and audio from YouTube, Instagram, and Facebook into crisp MP4 and 192 kbps MP3 files.
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
      <FaqSection items={HOMEPAGE_FAQS} />
    </div>
  );
}
