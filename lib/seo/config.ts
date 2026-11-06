export const SITE_CONFIG = {
  name: "Universal Media Downloader",
  shortName: "MediaDownloader",
  titleTemplate: "%s | Universal Media Downloader",
  defaultTitle: "Universal Media Downloader — Free Online Video & Audio Downloader",
  description:
    "Fast, lightweight, and modern online utility to analyze, select quality, and download authorized YouTube, Instagram, and Facebook videos to MP4 and high-bitrate MP3 audio. 100% database-free with zero user tracking.",
  productionUrl: "https://universal-media-downloader-five.vercel.app",
  author: "Universal Media Downloader Team",
  creator: "Universal Media Downloader",
  publisher: "Universal Media Downloader",
  keywords: [
    "Universal Media Downloader",
    "Free Online Video Downloader",
    "YouTube Video Downloader",
    "YouTube Shorts Downloader",
    "Instagram Reel Downloader",
    "Instagram Video Downloader",
    "Facebook Video Downloader",
    "Facebook Reel Downloader",
    "Video to MP3 Converter",
    "Online MP4 Downloader",
    "Audio Extractor",
    "Fast Media Utility",
  ],
  links: {
    github: "https://github.com/sayandkk",
  },
  platforms: [
    {
      name: "YouTube",
      path: "/youtube-downloader",
      description: "Download standard videos, Shorts, and audio extraction up to 4K resolution.",
    },
    {
      name: "Instagram",
      path: "/instagram-downloader",
      description: "Save public Instagram Reels and high-resolution video posts cleanly.",
    },
    {
      name: "Facebook",
      path: "/facebook-downloader",
      description: "Extract HD Watch videos, public Facebook Reels, and share links to MP4.",
    },
    {
      name: "Video to MP3",
      path: "/video-to-mp3",
      description: "Extract pure 192 kbps MP3 audio streams from supported video URLs.",
    },
  ],
} as const;

export function getCanonicalUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const normalized = cleanPath === "/" ? "" : cleanPath;
  return `${SITE_CONFIG.productionUrl}${normalized}`;
}
