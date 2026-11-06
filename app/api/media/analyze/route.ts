import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limiter";
import { parseAndValidateMediaUrl } from "@/lib/validators/media-url";
import { analyzeYoutubeVideo } from "@/lib/extractors/youtube";
import { analyzeInstagramMedia } from "@/lib/extractors/instagram";
import { analyzeFacebookVideo } from "@/lib/extractors/facebook";
import { AppError, formatErrorResponse } from "@/lib/errors";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    checkRateLimit(ip, "analyze");

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      throw new AppError("Invalid JSON in request body.", 400, "INVALID_JSON");
    }

    if (!body || typeof body !== "object" || !("url" in body)) {
      throw new AppError("A media URL is required.", 400, "MISSING_URL");
    }

    const { url } = body as { url: string };
    const parsed = parseAndValidateMediaUrl(url);

    let metadata;
    if (parsed.platform === "youtube") {
      metadata = await analyzeYoutubeVideo(parsed.normalizedUrl, parsed.id);
    } else if (parsed.platform === "instagram") {
      metadata = await analyzeInstagramMedia(parsed.normalizedUrl, parsed.id, parsed.type as "reel" | "post" | "story");
    } else if (parsed.platform === "facebook") {
      metadata = await analyzeFacebookVideo(parsed.normalizedUrl, parsed.id);
    } else {
      throw new AppError("Unsupported media platform.", 400, "UNSUPPORTED_PLATFORM");
    }

    return NextResponse.json({
      success: true,
      data: metadata,
    });
  } catch (err: unknown) {
    const errorDetails = formatErrorResponse(err);
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    return NextResponse.json(errorDetails, { status: statusCode });
  }
}

