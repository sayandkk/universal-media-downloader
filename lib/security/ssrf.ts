import { UnsupportedPlatformError, ValidationError } from "../errors";

const ALLOWED_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "music.youtube.com",
  "instagram.com",
  "www.instagram.com",
  "m.instagram.com",
  "instagr.am",
  "facebook.com",
  "www.facebook.com",
  "m.facebook.com",
  "web.facebook.com",
  "fb.watch",
  "fb.com",
]);

const FORBIDDEN_IP_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^169\.254\./, // AWS/GCP metadata
  /^::1$/,
  /^fc00:/i,
  /^fe80:/i,
  /^0\.0\.0\.0$/,
];

export function validateSafeUrl(rawUrl: string): URL {
  if (!rawUrl || typeof rawUrl !== "string") {
    throw new ValidationError("URL must be a non-empty string.", "Please provide a valid URL.");
  }

  const trimmed = rawUrl.trim();
  if (trimmed.length > 2048) {
    throw new ValidationError("URL exceeds maximum permitted length.", "The URL provided is too long.");
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new ValidationError("Malformed URL.", "Please enter a valid, well-formed web address.");
  }

  // Enforce HTTPS or HTTP only
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new ValidationError(
      `Disallowed URL protocol: ${parsed.protocol}`,
      "Only HTTP and HTTPS links are supported."
    );
  }

  const hostname = parsed.hostname.toLowerCase();

  // Guard against IP literals or local addresses
  for (const pattern of FORBIDDEN_IP_PATTERNS) {
    if (pattern.test(hostname)) {
      throw new ValidationError("Access to local or private IP addresses is denied.", "Invalid URL destination.");
    }
  }

  // Ensure hostname belongs to permitted platforms
  const isAllowed = Array.from(ALLOWED_HOSTS).some(
    (allowed) => hostname === allowed || hostname.endsWith(`.${allowed}`)
  );

  if (!isAllowed) {
    throw new UnsupportedPlatformError(
      `Host "${hostname}" is not permitted.`,
      "Only links from YouTube, Instagram, and Facebook are supported."
    );
  }

  // Strip credentials if any
  parsed.username = "";
  parsed.password = "";

  return parsed;
}

