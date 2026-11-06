import type { Metadata } from "next";
import { MediaAnalyzer } from "@/components/media-analyzer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection } from "@/components/faq-section";
import { MP3_FAQS } from "@/lib/seo/faqs";
import { WebApplicationJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { getCanonicalUrl } from "@/lib/seo/config";
import { Music, Sparkles, Volume2, Zap, Shield, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "Video to MP3 Converter — Free Online 192 kbps Audio Extractor",
  description:
    "Convert and extract high-bitrate 192 kbps MP3 audio from authorized YouTube videos, Shorts, Instagram Reels, and Facebook Watch clips online for free. Fast and direct streaming.",
  alternates: {
    canonical: getCanonicalUrl("/video-to-mp3"),
  },
  openGraph: {
    title: "Video to MP3 Converter | Universal Media Downloader",
    description:
      "Extract pure 192 kbps MP3 audio from supported YouTube, Instagram, and Facebook videos on-the-fly with integrated FFmpeg audio encoding.",
    url: getCanonicalUrl("/video-to-mp3"),
    type: "website",
  },
};

export default function VideoToMp3Page() {
  const faqJsonLd = MP3_FAQS.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <div className="space-y-12 pb-16">
      <WebApplicationJsonLd />
      <FaqJsonLd items={faqJsonLd} />

      <Breadcrumbs steps={[{ name: "Video to MP3 Converter", path: "/video-to-mp3" }]} />

      {/* Hero */}
      <section className="relative pt-6 sm:pt-10 pb-8 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold">
          <Music className="w-3.5 h-3.5" />
          <span>High-Bitrate 192 kbps Audio Extraction</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
            Free Online Video to <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
              MP3 Converter
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground">
            Extract pure, high-quality 192 kbps MP3 audio from your favorite authorized videos on YouTube, Instagram, and Facebook in seconds.
          </p>
        </div>

        {/* Downloader Interface with MP3 Preselected */}
        <div className="pt-2">
          <MediaAnalyzer initialPlatform="mp3" />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">192 kbps Crisp Audio</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Integrated with professional FFmpeg audio filters to deliver balanced, studio-quality 44.1 kHz stereo MP3 files.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">Zero Waiting / Streaming Transcode</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              No server buffering or disk queue delay. Converted audio chunks stream straight into your browser&apos;s download manager.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">Universal Device Compatibility</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Compatible with all media players on iOS, Android, Windows, macOS, car infotainment, and offline MP3 players.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection items={MP3_FAQS} />
    </div>
  );
}
