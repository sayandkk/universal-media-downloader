import * as React from "react";
import { Music, Film, Check, AlertTriangle } from "lucide-react";
import { YoutubeIcon, InstagramIcon, FacebookIcon } from "./icons";

export function SupportedPlatforms() {
  return (
    <section className="py-16 sm:py-24 border-t border-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Supported Media Platforms & Policies
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Transparent coverage of supported URLs and our strict commitment to authorized access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* YouTube Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/80 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                <YoutubeIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">YouTube Video & Audio</h3>
                <p className="text-xs text-muted-foreground">Standard videos, Shorts & Music</p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-foreground/80">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Standard URLs:</strong> Full support for <code>youtube.com/watch?v=...</code> with extra query parameters.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>YouTube Shorts:</strong> Vertical videos via <code>youtube.com/shorts/...</code> links.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Shortened Links:</strong> <code>youtu.be/...</code> mobile sharing links.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Dynamic Resolutions:</strong> 360p, 720p HD, 1080p Full HD, up to 4K UHD.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>MP3 Conversion:</strong> On-the-fly extraction of crystal-clear 192 kbps audio tracks.
                </span>
              </li>
            </ul>
          </div>

          {/* Instagram Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/80 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Instagram Media</h3>
                <p className="text-xs text-muted-foreground">Public Reels & Video Posts</p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-foreground/80">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Instagram Reels:</strong> Links matching <code>instagram.com/reel/...</code>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Public Video Posts:</strong> Standard post links <code>instagram.com/p/...</code>
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Private Stories:</strong> Ephemeral Stories require account login.
                </span>
              </li>
            </ul>
          </div>

          {/* Facebook Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/80 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <FacebookIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Facebook Videos</h3>
                <p className="text-xs text-muted-foreground">Watch, Reels & Public Videos</p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-foreground/80">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Facebook Watch:</strong> <code>facebook.com/watch/?v=...</code> and <code>fb.watch/...</code>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Facebook Reels:</strong> Short-form reels matching <code>facebook.com/reel/...</code>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Full Audio MP3 Extraction:</strong> Convert any public Facebook video into clean 192 kbps MP3.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
