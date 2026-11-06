import type { Metadata } from "next";
import Link from "next/link";
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
import { Sparkles, ShieldCheck, Zap, ArrowRight, Film, Music, CheckCircle2 } from "lucide-react";
import { YoutubeIcon, InstagramIcon, FacebookIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Universal Media Downloader — Free Online Video & Audio Downloader",
  description:
    "Fast, free online media downloader to analyze and save authorized YouTube videos, Shorts, Instagram Reels, and Facebook Watch videos into MP4 and 192 kbps MP3 audio. 100% database-free.",
  keywords: [
    "universal media downloader",
    "free online video downloader",
    "youtube video downloader",
    "youtube shorts downloader",
    "instagram reel downloader",
    "facebook video downloader",
    "video to mp3 converter",
    "online mp4 downloader",
    "download video without watermark",
    "high quality video downloader",
  ],
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

      {/* Comprehensive Topical SEO Guide Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 border-t border-border/80">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            Comprehensive Media Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            All-in-One Online Video Downloader & Converter
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Universal Media Downloader provides a unified web interface to analyze, format, and download authorized online media across the web&apos;s leading video platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* YouTube Guide Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-card border border-border/80 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-red-500 font-bold text-base">
                <YoutubeIcon className="w-5 h-5" />
                <h3>YouTube Video & Shorts Downloader</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Save standard YouTube videos, mobile Shorts, and playlists in dynamic resolutions including 720p HD, 1080p Full HD, 1440p QHD, and 2160p 4K UHD. Or extract clean background music and lectures directly to 192 kbps MP3 files.
              </p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Supports youtube.com/watch, /shorts, and youtu.be links</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Integrated on-the-fly MP3 audio conversion via FFmpeg</span>
                </li>
              </ul>
            </div>
            <Link
              href="/youtube-downloader"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline pt-2"
            >
              <span>Explore YouTube Downloader</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Instagram Guide Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-card border border-border/80 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-pink-500 font-bold text-base">
                <InstagramIcon className="w-5 h-5" />
                <h3>Instagram Reel & Video Downloader</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Save authorized public Instagram Reels and high-resolution video posts directly to your iOS or Android camera roll or computer without installing third-party apps or logging in with your personal account.
              </p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Original HD video clarity and audio fidelity</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>No login, password, or cookies required</span>
                </li>
              </ul>
            </div>
            <Link
              href="/instagram-downloader"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline pt-2"
            >
              <span>Explore Instagram Downloader</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Facebook Guide Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-card border border-border/80 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-blue-600 font-bold text-base">
                <FacebookIcon className="w-5 h-5" />
                <h3>Facebook Watch & Reel Downloader</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Download public Facebook Watch videos, viral Reels, and mobile share links (/share/r/) in progressive HD MP4 with synchronized audio tracks that play smoothly on all desktop and mobile video players.
              </p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Progressive 720p HD with combined video + audio</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Clean Windows & macOS file naming standards</span>
                </li>
              </ul>
            </div>
            <Link
              href="/facebook-downloader"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline pt-2"
            >
              <span>Explore Facebook Downloader</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Video to MP3 Guide Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-card border border-border/80 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-purple-500 font-bold text-base">
                <Music className="w-5 h-5" />
                <h3>Video to MP3 Converter</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Convert any public YouTube, Instagram, or Facebook video into a 192 kbps MP3 audio file. Perfect for creating offline music playlists, speech notes, podcast archives, and study audio.
              </p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>192 kbps Constant Bitrate (CBR) stereo audio</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Piped through live streaming FFmpeg encoder</span>
                </li>
              </ul>
            </div>
            <Link
              href="/video-to-mp3"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline pt-2"
            >
              <span>Explore Video to MP3</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection items={HOMEPAGE_FAQS} />
    </div>
  );
}
