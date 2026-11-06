"use client";

import * as React from "react";
import Link from "next/link";
import { DownloadCloud, Menu, X, Music } from "lucide-react";
import { YoutubeIcon, InstagramIcon, FacebookIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";

interface NavbarProps {
  onSelectPlatform?: (platform: "youtube" | "instagram" | "facebook" | "mp3" | "all") => void;
}

export function Navbar({ onSelectPlatform }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (platform?: "youtube" | "instagram" | "facebook" | "mp3" | "all") => {
    if (onSelectPlatform && platform) {
      onSelectPlatform(platform);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => handleNavClick("all")}
            className="flex items-center gap-2.5 font-bold text-lg tracking-tight group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <DownloadCloud className="w-5 h-5" />
            </div>
            <span className="text-foreground flex items-center gap-1 font-semibold">
              Media<span className="text-primary font-bold">Flow</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                v1.0
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            <Link
              href="/"
              onClick={() => handleNavClick("all")}
              className="px-3.5 py-2 text-sm font-medium rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={() => handleNavClick("youtube")}
              className="px-3.5 py-2 text-sm font-medium rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-1.5"
            >
              <YoutubeIcon className="w-4 h-4 text-red-500" />
              YouTube
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("instagram")}
              className="px-3.5 py-2 text-sm font-medium rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-1.5"
            >
              <InstagramIcon className="w-4 h-4 text-pink-500" />
              Instagram
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("facebook")}
              className="px-3.5 py-2 text-sm font-medium rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-1.5"
            >
              <FacebookIcon className="w-4 h-4 text-blue-600" />
              Facebook
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("mp3")}
              className="px-3.5 py-2 text-sm font-medium rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-1.5"
            >
              <Music className="w-4 h-4 text-blue-500" />
              Video to MP3
            </button>
            <a
              href="#faq"
              className="px-3.5 py-2 text-sm font-medium rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            >
              About & FAQ
            </a>
          </nav>

          {/* Right actions: Theme toggle & Mobile menu button */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-lg px-4 pt-2 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => handleNavClick("all")}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-secondary"
          >
            Home
          </Link>
          <button
            type="button"
            onClick={() => handleNavClick("youtube")}
            className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-secondary"
          >
            <YoutubeIcon className="w-5 h-5 text-red-500" />
            YouTube Downloader
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("instagram")}
            className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-secondary"
          >
            <InstagramIcon className="w-5 h-5 text-pink-500" />
            Instagram Downloader
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("facebook")}
            className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-secondary"
          >
            <FacebookIcon className="w-5 h-5 text-blue-600" />
            Facebook Downloader
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("mp3")}
            className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-secondary"
          >
            <Music className="w-5 h-5 text-blue-500" />
            Video to MP3 Converter
          </button>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-secondary"
          >
            About & FAQ
          </a>
        </div>
      )}
    </header>
  );
}
