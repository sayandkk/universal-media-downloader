"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DownloadCloud, Menu, X, Music, Layers } from "lucide-react";
import { YoutubeIcon, InstagramIcon, FacebookIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { SITE_CONFIG } from "@/lib/seo/config";

interface NavbarProps {
  onSelectPlatform?: (platform: "youtube" | "instagram" | "facebook" | "mp3" | "all") => void;
}

export function Navbar({ onSelectPlatform }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const handleNavClick = (platform?: "youtube" | "instagram" | "facebook" | "mp3" | "all") => {
    if (onSelectPlatform && platform) {
      onSelectPlatform(platform);
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    {
      href: "/youtube-downloader",
      label: "YouTube",
      icon: <YoutubeIcon className="w-4 h-4 text-red-500" />,
      platform: "youtube" as const,
    },
    {
      href: "/instagram-downloader",
      label: "Instagram",
      icon: <InstagramIcon className="w-4 h-4 text-pink-500" />,
      platform: "instagram" as const,
    },
    {
      href: "/facebook-downloader",
      label: "Facebook",
      icon: <FacebookIcon className="w-4 h-4 text-blue-600" />,
      platform: "facebook" as const,
    },
    {
      href: "/video-to-mp3",
      label: "Video to MP3",
      icon: <Music className="w-4 h-4 text-purple-500" />,
      platform: "mp3" as const,
    },
    {
      href: "/supported-platforms",
      label: "Platforms",
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => handleNavClick("all")}
            className="flex items-center gap-2.5 font-bold text-lg tracking-tight group"
            title={SITE_CONFIG.name}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <DownloadCloud className="w-5 h-5" />
            </div>
            <span className="text-foreground flex items-center gap-1 font-semibold text-sm sm:text-base">
              Universal<span className="text-primary font-bold">Downloader</span>
              <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                Free
              </span>
            </span>
          </Link>

          {/* Desktop Semantic Crawlable Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              onClick={() => handleNavClick("all")}
              className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-lg transition-colors ${
                pathname === "/"
                  ? "bg-secondary text-foreground font-semibold"
                  : "text-foreground/80 hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              Home
            </Link>

            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.platform)}
                  className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "bg-secondary text-foreground font-semibold"
                      : "text-foreground/80 hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right actions: Theme toggle & Mobile menu button */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-lg px-4 pt-2 pb-5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => handleNavClick("all")}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary"
          >
            Home
          </Link>

          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.platform)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary"
            >
              {item.icon}
              <span>{item.label} Downloader</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
