import { validateSafeUrl } from "../security/ssrf";
import { UnsupportedPlatformError, ValidationError } from "../errors";
import { PlatformType } from "../../types/media";

export interface ParsedMediaUrl {
  platform: PlatformType;
  id: string;
  normalizedUrl: string;
  type?: "video" | "short" | "reel" | "post" | "story";
}

const YOUTUBE_VIDEO_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;
const INSTAGRAM_SHORTCODE_REGEX = /^[a-zA-Z0-9_-]{5,30}$/;

export function parseAndValidateMediaUrl(input: string): ParsedMediaUrl {
  const parsed = validateSafeUrl(input);
  const hostname = parsed.hostname.toLowerCase();
  const pathname = parsed.pathname;

  // 1. Check YouTube
  if (
    hostname === "youtube.com" ||
    hostname.endsWith(".youtube.com") ||
    hostname === "youtu.be"
  ) {
    let videoId: string | null = null;
    let type: "video" | "short" = "video";

    if (hostname === "youtu.be") {
      // Shortened format: youtu.be/VIDEO_ID
      const parts = pathname.split("/").filter(Boolean);
      videoId = parts[0] || null;
    } else if (pathname.startsWith("/shorts/")) {
      // Shorts: /shorts/VIDEO_ID
      const parts = pathname.replace("/shorts/", "").split("/").filter(Boolean);
      videoId = parts[0] || null;
      type = "short";
    } else if (pathname.startsWith("/embed/")) {
      // Embed: /embed/VIDEO_ID
      const parts = pathname.replace("/embed/", "").split("/").filter(Boolean);
      videoId = parts[0] || null;
    } else if (pathname.startsWith("/live/")) {
      // Live: /live/VIDEO_ID
      const parts = pathname.replace("/live/", "").split("/").filter(Boolean);
      videoId = parts[0] || null;
    } else {
      // Standard: /watch?v=VIDEO_ID
      videoId = parsed.searchParams.get("v");
    }

    if (!videoId || !YOUTUBE_VIDEO_ID_REGEX.test(videoId)) {
      throw new ValidationError(
        "Could not extract a valid YouTube video ID.",
        "Please provide a valid YouTube video or Shorts link."
      );
    }

    return {
      platform: "youtube",
      id: videoId,
      normalizedUrl: `https://www.youtube.com/watch?v=${videoId}`,
      type,
    };
  }

  // 2. Check Instagram
  if (
    hostname === "instagram.com" ||
    hostname.endsWith(".instagram.com") ||
    hostname === "instagr.am"
  ) {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
      throw new ValidationError(
        "Instagram home URL provided without media path.",
        "Please provide a link to a specific Instagram Reel or Post."
      );
    }

    const firstSegment = segments[0].toLowerCase();

    // Check for Stories
    if (firstSegment === "stories") {
      throw new ValidationError(
        "Instagram Stories require private account login and cannot be accessed via public links.",
        "Instagram Stories are ephemeral and require private user login. Downloading Stories without authorized personal authentication is not supported."
      );
    }

    // Reels, Posts, TV
    if (firstSegment === "reel" || firstSegment === "reels" || firstSegment === "p" || firstSegment === "tv") {
      const shortcode = segments[1];
      if (!shortcode || !INSTAGRAM_SHORTCODE_REGEX.test(shortcode)) {
        throw new ValidationError(
          "Invalid Instagram post/reel identifier.",
          "Please check the Instagram link. It appears to be missing a valid Reel or Post ID."
        );
      }

      const mediaType = firstSegment.startsWith("reel") ? "reel" : "post";
      return {
        platform: "instagram",
        id: shortcode,
        normalizedUrl: `https://www.instagram.com/reel/${shortcode}/`,
        type: mediaType,
      };
    }

    throw new ValidationError(
      `Unsupported Instagram path: /${firstSegment}`,
      "Only public Instagram Reels and Posts are supported."
    );
  }

  // 3. Check Facebook
  if (
    hostname === "facebook.com" ||
    hostname.endsWith(".facebook.com") ||
    hostname === "fb.watch" ||
    hostname === "fb.com"
  ) {
    let videoId: string | null = null;
    let type: "video" | "reel" = "video";

    if (hostname === "fb.watch") {
      const parts = pathname.split("/").filter(Boolean);
      videoId = parts[0] || null;
    } else if (pathname.includes("/videos/")) {
      const parts = pathname.split("/videos/")[1]?.split("/").filter(Boolean);
      videoId = parts?.[0] || null;
    } else if (pathname.includes("/reel/") || pathname.includes("/reels/")) {
      const parts = (pathname.split("/reel/")[1] || pathname.split("/reels/")[1])?.split("/").filter(Boolean);
      videoId = parts?.[0] || null;
      type = "reel";
    } else if (pathname.includes("/watch")) {
      videoId = parsed.searchParams.get("v") || pathname.split("/watch/")[1]?.split("/").filter(Boolean)[0] || null;
    } else if (pathname.includes("/share/")) {
      const parts = pathname.split("/share/")[1]?.split("/").filter(Boolean);
      videoId = parts?.[1] || parts?.[0] || null;
      if (pathname.includes("/share/r/")) type = "reel";
    }

    if (!videoId) {
      throw new ValidationError(
        "Could not extract a valid Facebook video ID.",
        "Please provide a valid Facebook video, reel, or watch link."
      );
    }

    return {
      platform: "facebook",
      id: videoId,
      normalizedUrl: input.trim(),
      type,
    };
  }

  throw new UnsupportedPlatformError(
    `Domain ${hostname} is not supported.`,
    "Only YouTube, Instagram, and Facebook URLs are currently supported."
  );
}

export function detectPlatformFromInput(input: string): PlatformType | null {
  if (!input || typeof input !== "string") return null;
  const lower = input.toLowerCase().trim();
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  if (lower.includes("instagram.com") || lower.includes("instagr.am")) return "instagram";
  if (lower.includes("facebook.com") || lower.includes("fb.watch") || lower.includes("fb.com")) return "facebook";
  return null;
}

