import { RateLimitError } from "../errors";

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory sliding window store (stateless per instance, no database required)
const ipStore = new Map<string, RateLimitRecord>();

// Periodic cleanup of stale records every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of ipStore.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 60000);
      if (record.timestamps.length === 0) {
        ipStore.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

export function checkRateLimit(
  ip: string,
  action: "analyze" | "download" = "analyze",
  maxRequests = action === "analyze" ? 40 : 20,
  windowMs = 60000
): void {
  const key = `${action}:${ip || "unknown"}`;
  const now = Date.now();

  let record = ipStore.get(key);
  if (!record) {
    record = { timestamps: [] };
    ipStore.set(key, record);
  }

  // Retain only requests within the sliding window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= maxRequests) {
    throw new RateLimitError(
      `Rate limit exceeded for action "${action}".`,
      `Rate limit reached. Please wait a minute before attempting another ${action}.`
    );
  }

  record.timestamps.push(now);
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

