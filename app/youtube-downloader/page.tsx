import type { Metadata } from "next";
import { MediaAnalyzer } from "@/components/media-analyzer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection } from "@/components/faq-section";
import { YOUTUBE_FAQS } from "@/lib/seo/faqs";
import { WebApplicationJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { YoutubeIcon } from "@/components/icons";
import { getCanonicalUrl } from "@/lib/seo/config";
import { CheckCircle2, Film, Music, Shield, Sparkles, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube Video & Shorts Downloader — Free Online 1080p, 4K & MP3",
  description:
    "Download authorized YouTube videos, Shorts, and audio in 1080p Full HD, 4K, 720p, or extract clean 192 kbps MP3 files. Fast, free, and no registration required.",
  alternates: {
    canonical: getCanonicalUrl("/youtube-downloader"),
  },
  openGraph: {
    title: "YouTube Video & Shorts Downloader | Universal Media Downloader",
    description:
      "Save authorized YouTube videos in progressive 720p/1080p MP4 or convert audio to 192 kbps MP3. 100% private and database-free.",
    url: getCanonicalUrl("/youtube-downloader"),
    type: "website",
  },
};

export default function YouTubeDownloaderPage() {
  const faqJsonLd = YOUTUBE_FAQS.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <div className="space-y-12 pb-16">
      <WebApplicationJsonLd />
      <FaqJsonLd items={faqJsonLd} />

      <Breadcrumbs steps={[{ name: "YouTube Downloader", path: "/youtube-downloader" }]} />

      {/* Hero */}
      <section className="relative pt-6 sm:pt-10 pb-8 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold">
          <YoutubeIcon className="w-3.5 h-3.5" />
          <span>YouTube Standard, Shorts & Audio Converter</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
            Free YouTube Video & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 bg-clip-text text-transparent">
              Shorts Downloader
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground">
            Analyze any public YouTube URL and download it in your preferred resolution (360p up to 4K) or extract crystal-clear 192 kbps MP3 audio.
          </p>
        </div>

        {/* Downloader Interface with YouTube Preselected */}
        <div className="pt-2">
          <MediaAnalyzer initialPlatform="youtube" />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center">
              <Film className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">Standard & Shorts Support</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Compatible with all YouTube URL variants including shortened youtu.be links, channel shares, and vertical Shorts.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Music className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">192 kbps MP3 Extraction</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Extract background music, podcasts, or lectures straight into clean MP3 audio files with integrated FFmpeg encoding.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">100% Private & Direct</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              No account creation, no cookies stored, and zero database logging. Media streams directly from source to browser.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection items={YOUTUBE_FAQS} />
    </div>
  );
}
