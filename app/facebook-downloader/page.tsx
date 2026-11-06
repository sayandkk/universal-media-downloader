import type { Metadata } from "next";
import { MediaAnalyzer } from "@/components/media-analyzer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection } from "@/components/faq-section";
import { FACEBOOK_FAQS } from "@/lib/seo/faqs";
import { WebApplicationJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { FacebookIcon } from "@/components/icons";
import { getCanonicalUrl } from "@/lib/seo/config";
import { Film, Music, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Facebook Video & Reel Downloader — Free Online 720p/1080p MP4 & MP3",
  description:
    "Download authorized Facebook Watch videos, public Facebook Reels, and share links into high-definition MP4 or extract 192 kbps MP3 audio. Fast, clean, and free.",
  alternates: {
    canonical: getCanonicalUrl("/facebook-downloader"),
  },
  openGraph: {
    title: "Facebook Video & Reel Downloader | Universal Media Downloader",
    description:
      "Save public Facebook videos and Reels directly to your phone or PC in HD quality with audio combined.",
    url: getCanonicalUrl("/facebook-downloader"),
    type: "website",
  },
};

export default function FacebookDownloaderPage() {
  const faqJsonLd = FACEBOOK_FAQS.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <div className="space-y-12 pb-16">
      <WebApplicationJsonLd />
      <FaqJsonLd items={faqJsonLd} />

      <Breadcrumbs steps={[{ name: "Facebook Downloader", path: "/facebook-downloader" }]} />

      {/* Hero */}
      <section className="relative pt-6 sm:pt-10 pb-8 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
          <FacebookIcon className="w-3.5 h-3.5" />
          <span>Facebook Watch & Reels Video Utility</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
            Free Facebook Video & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Reel Downloader
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground">
            Download authorized public Facebook videos, Reels, and watch clips in crisp HD MP4 with audio or extract clean 192 kbps MP3 files.
          </p>
        </div>

        {/* Downloader Interface with Facebook Preselected */}
        <div className="pt-2">
          <MediaAnalyzer initialPlatform="facebook" />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Film className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">HD Video with Full Audio</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Fetches progressive HD streams directly from Meta CDN with complete audio tracks and standards-compliant filenames.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">Share Links & Short Links</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Handles mobile app share links (/share/r/), desktop watch URLs, and shortened fb.watch URLs with automatic redirect resolution.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">100% Database-Free</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              No login, no user accounts, and zero history logged on the server. Your downloads are direct and private.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection items={FACEBOOK_FAQS} />
    </div>
  );
}
