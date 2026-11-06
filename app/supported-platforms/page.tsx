import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SupportedPlatforms } from "@/components/supported-platforms";
import { WebApplicationJsonLd } from "@/components/seo/json-ld";
import { getCanonicalUrl } from "@/lib/seo/config";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Supported Platforms & Formats Guide — YouTube, Instagram & Facebook",
  description:
    "Comprehensive guide to supported video and audio formats, resolutions up to 4K, MP3 audio extraction, and platform access boundaries.",
  alternates: {
    canonical: getCanonicalUrl("/supported-platforms"),
  },
  openGraph: {
    title: "Supported Platforms & Formats Guide | Universal Media Downloader",
    description:
      "Explore supported resolutions, codecs, platforms, and privacy guidelines for Universal Media Downloader.",
    url: getCanonicalUrl("/supported-platforms"),
    type: "website",
  },
};

export default function SupportedPlatformsPage() {
  return (
    <div className="space-y-12 pb-16">
      <WebApplicationJsonLd />

      <Breadcrumbs steps={[{ name: "Supported Platforms", path: "/supported-platforms" }]} />

      {/* Header */}
      <section className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 pt-6">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
          Compatibility & Specs
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Supported Platforms & Quality Specifications
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Universal Media Downloader provides genuine, dynamic quality extraction without hardcoded fake resolutions. Below is our complete matrix of supported media types, containers, and codecs.
        </p>
      </section>

      {/* Detailed Specifications Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto rounded-2xl border border-border/80 bg-card shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-secondary/60 border-b border-border text-foreground font-semibold">
              <tr>
                <th className="p-4 sm:p-5">Platform</th>
                <th className="p-4 sm:p-5">Supported URLs</th>
                <th className="p-4 sm:p-5">Video Formats</th>
                <th className="p-4 sm:p-5">Max Resolution</th>
                <th className="p-4 sm:p-5">Audio Extraction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr className="hover:bg-secondary/20 transition-colors">
                <td className="p-4 sm:p-5 font-semibold text-foreground">YouTube</td>
                <td className="p-4 sm:p-5">Standard, Shorts, youtu.be, embed</td>
                <td className="p-4 sm:p-5">MP4 (H.264), WebM (VP9/AV1)</td>
                <td className="p-4 sm:p-5 text-emerald-600 dark:text-emerald-400 font-medium">Up to 2160p 4K</td>
                <td className="p-4 sm:p-5">192 kbps MP3 & Native M4A</td>
              </tr>
              <tr className="hover:bg-secondary/20 transition-colors">
                <td className="p-4 sm:p-5 font-semibold text-foreground">Instagram</td>
                <td className="p-4 sm:p-5">Public Reels, Video Posts</td>
                <td className="p-4 sm:p-5">MP4 (H.264/AAC)</td>
                <td className="p-4 sm:p-5 font-medium">Original HD (1080x1920)</td>
                <td className="p-4 sm:p-5">192 kbps MP3</td>
              </tr>
              <tr className="hover:bg-secondary/20 transition-colors">
                <td className="p-4 sm:p-5 font-semibold text-foreground">Facebook</td>
                <td className="p-4 sm:p-5">Watch, Reels, /share/r/, fb.watch</td>
                <td className="p-4 sm:p-5">MP4 (H.264/AAC)</td>
                <td className="p-4 sm:p-5 font-medium">720p HD Progressive</td>
                <td className="p-4 sm:p-5">192 kbps MP3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Platform Showcase Cards */}
      <SupportedPlatforms />

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="p-8 sm:p-12 rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/10 to-transparent space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Ready to Download Media?</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Choose any supported platform and analyze your favorite authorized video or audio track now.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/youtube-downloader"
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              YouTube Downloader
            </Link>
            <Link
              href="/instagram-downloader"
              className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Instagram Downloader
            </Link>
            <Link
              href="/facebook-downloader"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Facebook Downloader
            </Link>
            <Link
              href="/video-to-mp3"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Video to MP3
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
