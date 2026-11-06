"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Why are the available resolutions different for each video?",
    a: "MediaFlow never displays hardcoded or fake resolutions. We dynamically inspect the video source and only show resolutions that the original creator uploaded and that are genuinely available from the streaming network.",
  },
  {
    q: "What is the difference between 'Video + Audio' and 'Video Only'?",
    a: "Streaming platforms store standard resolutions (like 360p and 720p) with video and audio multiplexed together. Higher resolutions (like 1080p, 1440p, and 4K) are often stored as standalone adaptive video tracks. MediaFlow categorizes them transparently so you know exactly what is included in your file.",
  },
  {
    q: "How does the MP3 audio extraction work?",
    a: "When you select MP3 audio, our backend pipes the highest-bitrate available audio stream from the media source directly through an integrated FFmpeg audio encoder, delivering a clean 192 kbps MP3 file straight to your download folder.",
  },
  {
    q: "Why can't I download private videos or Instagram Stories?",
    a: "In compliance with platform security rules and user privacy controls, MediaFlow only processes publicly accessible media. Stories and private accounts require personal login credentials, session cookies, and explicit follower permissions, which we strictly do not bypass.",
  },
  {
    q: "Does MediaFlow store my downloaded files or browsing history?",
    a: "No. MediaFlow is built on a 100% database-free, stateless architecture. Media is streamed directly through chunked HTTP transfer to your browser without long-term server disk storage or persistent tracking.",
  },
  {
    q: "Is downloading videos legal?",
    a: "You should only download content that you own, have express permission from the copyright owner to download, or that is distributed under Creative Commons or open public licenses. Please review our Terms of Service for complete usage guidelines.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24 border-t border-border/80 bg-secondary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <span className="text-xs uppercase font-bold tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Everything you need to know about formats, audio extraction, and our access policies.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className="rounded-xl border border-border/80 bg-card overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground hover:bg-secondary/40 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

