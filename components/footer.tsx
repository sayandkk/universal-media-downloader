import * as React from "react";
import Link from "next/link";
import { DownloadCloud, Shield, Heart } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo/config";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <DownloadCloud className="w-4 h-4" />
              </div>
              <span className="text-foreground flex items-center gap-1 font-semibold text-sm sm:text-base">
                Universal<span className="text-primary font-bold">Downloader</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              High-performance, stateless universal media downloader and audio extraction tool. Engineered for speed, security, and respectful authorized content access.
            </p>
          </div>

          {/* Tools & Downloaders */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-foreground">Media Tools</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/youtube-downloader" className="hover:text-primary transition-colors">
                  YouTube Video Downloader
                </Link>
              </li>
              <li>
                <Link href="/instagram-downloader" className="hover:text-primary transition-colors">
                  Instagram Reel Downloader
                </Link>
              </li>
              <li>
                <Link href="/facebook-downloader" className="hover:text-primary transition-colors">
                  Facebook Video Downloader
                </Link>
              </li>
              <li>
                <Link href="/video-to-mp3" className="hover:text-primary transition-colors">
                  Video to MP3 Converter
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Resources */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-foreground">Resources</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/supported-platforms" className="hover:text-primary transition-colors">
                  Supported Platforms & Formats
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-primary transition-colors">
                  FAQ & Knowledgebase
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Compliance */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-foreground">Compliance & Disclaimer</h3>
            <div className="p-3 rounded-xl bg-secondary border border-border text-[11px] text-muted-foreground space-y-1.5 leading-relaxed">
              <p className="flex items-center gap-1.5 font-medium text-foreground">
                <Shield className="w-3.5 h-3.5 text-primary" /> Fair Use & DMCA
              </p>
              <p>
                Universal Media Downloader is not affiliated with YouTube, Google, Instagram, or Meta. This utility is intended strictly for personal archiving of authorized, public content.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved. 100% database-free.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for clean media
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
