import * as React from "react";
import Link from "next/link";
import { DownloadCloud, Shield, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <DownloadCloud className="w-4 h-4" />
              </div>
              <span className="text-foreground flex items-center gap-1 font-semibold">
                Media<span className="text-primary font-bold">Flow</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              High-performance, stateless universal media downloader and audio extraction tool. Engineered for speed, security, and respectful authorized content access.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-foreground">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground transition-colors">
                  FAQ & About
                </a>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-foreground">Compliance</h4>
            <div className="p-3 rounded-xl bg-secondary border border-border text-xs text-muted-foreground space-y-1.5 leading-relaxed">
              <p className="flex items-center gap-1.5 font-medium text-foreground">
                <Shield className="w-3.5 h-3.5 text-primary" /> Fair Use & Copyright
              </p>
              <p>
                MediaFlow is not affiliated with or endorsed by YouTube, Google, Instagram, or Meta. Users are solely responsible for ensuring rights to downloaded content.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} MediaFlow. All rights reserved. Zero database storage.</p>
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

