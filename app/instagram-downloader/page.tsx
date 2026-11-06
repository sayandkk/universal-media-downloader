import type { Metadata } from "next";
import { MediaAnalyzer } from "@/components/media-analyzer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection } from "@/components/faq-section";
import { INSTAGRAM_FAQS } from "@/lib/seo/faqs";
import { WebApplicationJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { InstagramIcon } from "@/components/icons";
import { getCanonicalUrl } from "@/lib/seo/config";
import { Film, Music, Shield, ShieldAlert, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Instagram Reel & Video Downloader — Fast Online MP4 & Audio",
  description:
    "Download authorized Instagram Reels, public video posts, and extract audio into MP4 or MP3. Fast, free, mobile-friendly, and completely database-free.",
  alternates: {
    canonical: getCanonicalUrl("/instagram-downloader"),
  },
  openGraph: {
    title: "Instagram Reel & Video Downloader | Universal Media Downloader",
    description:
      "Save public Instagram Reels and video posts in high-definition MP4. Respects user privacy and platform security rules.",
    url: getCanonicalUrl("/instagram-downloader"),
    type: "website",
  },
};

export default function InstagramDownloaderPage() {
  const faqJsonLd = INSTAGRAM_FAQS.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <div className="space-y-12 pb-16">
      <WebApplicationJsonLd />
      <FaqJsonLd items={faqJsonLd} />

      <Breadcrumbs steps={[{ name: "Instagram Downloader", path: "/instagram-downloader" }]} />

      {/* Hero */}
      <section className="relative pt-6 sm:pt-10 pb-8 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/20 bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-semibold">
          <InstagramIcon className="w-3.5 h-3.5" />
          <span>Instagram Reels & Public Video Utility</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
            Free Instagram Reel & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              Video Downloader
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground">
            Save authorized, public Instagram Reels and videos directly to your smartphone or desktop in original HD quality without registration.
          </p>
        </div>

        {/* Downloader Interface with Instagram Preselected */}
        <div className="pt-2">
          <MediaAnalyzer initialPlatform="instagram" />
        </div>
      </section>

      {/* Privacy Notice Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-3.5 text-xs sm:text-sm text-foreground">
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block">Privacy & Platform Boundaries</span>
            <p className="text-muted-foreground">
              We respect user privacy and Meta security policies. Only publicly accessible Reels and video posts are supported. Private profiles and ephemeral 24-hour Stories requiring login credentials cannot be accessed.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 flex items-center justify-center">
              <Film className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">Original HD Quality</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Streams directly from Meta content delivery networks preserving the creator&apos;s native resolution and frame rate.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Music className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">Reel Audio to MP3</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Extract trending audio tracks and creator voiceovers into clear 192 kbps MP3 audio files on-the-fly.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">Stateless & Anonymous</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Zero login required, no tracking pixels, and no search logs retained. Streamed directly through chunked HTTP transfer.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection items={INSTAGRAM_FAQS} />
    </div>
  );
}
