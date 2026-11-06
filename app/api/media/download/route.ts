import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limiter";
import { parseAndValidateMediaUrl } from "@/lib/validators/media-url";
import { analyzeYoutubeVideo, getYoutubeDownloadStream } from "@/lib/extractors/youtube";
import { analyzeInstagramMedia } from "@/lib/extractors/instagram";
import { analyzeFacebookVideo, getFacebookStreamInfo } from "@/lib/extractors/facebook";
import { convertToMp3Stream, nodeToWebStream } from "@/lib/processing/ffmpeg";
import { AppError, formatErrorResponse, ProcessingError } from "@/lib/errors";
import { Readable } from "stream";

export const dynamic = "force-dynamic";

function buildSafeContentDisposition(rawTitle: string, ext: string): string {
  // Strip illegal filesystem characters for Windows, macOS, and Linux
  let cleanTitle = rawTitle.replace(/[<>:"/\\|?*\x00-\x1F]/g, "").trim();

  // Strip leading and trailing periods, spaces, underscores, and dashes
  // (Windows Explorer cannot open files named solely with dots like '....mp4' or ending in spaces)
  cleanTitle = cleanTitle.replace(/^[.\-_\s]+|[.\-_\s]+$/g, "");

  // If the title is empty or was only dots/symbols, provide a standard media name
  if (!cleanTitle || cleanTitle.length < 2) {
    cleanTitle = "media";
  }

  // Check against reserved Windows DOS device names (CON, PRN, AUX, NUL, COM1-9, LPT1-9)
  const reservedRegex = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i;
  if (reservedRegex.test(cleanTitle)) {
    cleanTitle = `${cleanTitle}_file`;
  }

  // RFC 6266 / RFC 5987: The fallback 'filename' parameter MUST only contain ASCII
  let asciiOnly = cleanTitle.replace(/[^\x20-\x7E]/g, "").trim();
  asciiOnly = asciiOnly.replace(/^[.\-_\s]+|[.\-_\s]+$/g, "").slice(0, 60);
  const fallbackFilename = `${asciiOnly || "media"}.${ext}`;

  // The modern 'filename*' parameter safely handles full Unicode (e.g. Malayalam, Hindi, Japanese, Emojis)
  const fullFilename = `${cleanTitle}.${ext}`;
  const encodedFilename = encodeURIComponent(fullFilename);

  return `attachment; filename="${fallbackFilename}"; filename*=UTF-8''${encodedFilename}`;
}

async function handleDownload(url: string, formatId: string) {
  const parsed = parseAndValidateMediaUrl(url);

  // --- YouTube Download Pipeline ---
  if (parsed.platform === "youtube") {
    const meta = await analyzeYoutubeVideo(parsed.normalizedUrl, parsed.id);

    if (formatId === "audio-mp3") {
      const rawAudioStream = getYoutubeDownloadStream(parsed.normalizedUrl, "audio-mp3");
      const mp3Stream = convertToMp3Stream(rawAudioStream, 192);
      const webStream = nodeToWebStream(mp3Stream);

      return new Response(webStream, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Disposition": buildSafeContentDisposition(meta.title, "mp3"),
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    }

    const targetFormat = meta.formats.find((f) => f.formatId === formatId);
    const ext = targetFormat?.container || "mp4";
    const mimeType = ext === "webm" ? "video/webm" : ext === "m4a" ? "audio/mp4" : "video/mp4";

    const videoStream = getYoutubeDownloadStream(parsed.normalizedUrl, formatId);
    const webStream = nodeToWebStream(videoStream);

    return new Response(webStream, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": buildSafeContentDisposition(meta.title, ext),
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }

  // --- Instagram Download Pipeline ---
  if (parsed.platform === "instagram") {
    const meta = await analyzeInstagramMedia(parsed.normalizedUrl, parsed.id, parsed.type as any);

    if (!meta.directDownloadUrl) {
      throw new ProcessingError("Could not resolve downloadable stream for this Instagram media.");
    }

    const remoteResponse = await fetch(meta.directDownloadUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!remoteResponse.ok || !remoteResponse.body) {
      throw new ProcessingError("Failed to stream Instagram media from source CDN.");
    }

    if (formatId === "insta-audio-mp3") {
      // Audio extraction to MP3 via FFmpeg
      const nodeStream = Readable.fromWeb(remoteResponse.body as any);
      const mp3Stream = convertToMp3Stream(nodeStream, 192);
      const webStream = nodeToWebStream(mp3Stream);

      return new Response(webStream, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Disposition": buildSafeContentDisposition(meta.title, "mp3"),
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    }

    // Direct MP4 video download stream
    return new Response(remoteResponse.body, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": buildSafeContentDisposition(meta.title, "mp4"),
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }

  // --- Facebook Download Pipeline ---
  if (parsed.platform === "facebook") {
    const { streamUrl, headers, title } = await getFacebookStreamInfo(parsed.normalizedUrl, formatId);

    const remoteResponse = await fetch(streamUrl, {
      headers,
    });

    if (!remoteResponse.ok || !remoteResponse.body) {
      throw new ProcessingError("Failed to stream Facebook video from source CDN.");
    }

    if (formatId === "fb-audio-mp3") {
      // Audio extraction to MP3 via FFmpeg
      const nodeStream = Readable.fromWeb(remoteResponse.body as any);
      const mp3Stream = convertToMp3Stream(nodeStream, 192);
      const webStream = nodeToWebStream(mp3Stream);

      return new Response(webStream, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Disposition": buildSafeContentDisposition(title, "mp3"),
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    }

    // Direct MP4 video download stream
    return new Response(remoteResponse.body, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": buildSafeContentDisposition(title, "mp4"),
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }

  throw new ProcessingError("Direct streaming for this format/platform is not currently supported.");
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    checkRateLimit(ip, "download");

    const body = await req.json();
    const { url, formatId } = body;

    if (!url || !formatId) {
      throw new AppError("URL and formatId are required parameters.", 400, "MISSING_PARAMS");
    }

    return await handleDownload(url, formatId);
  } catch (err: unknown) {
    const errorDetails = formatErrorResponse(err);
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    return NextResponse.json(errorDetails, { status: statusCode });
  }
}

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    checkRateLimit(ip, "download");

    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    const formatId = searchParams.get("formatId");

    if (!url || !formatId) {
      throw new AppError("Both 'url' and 'formatId' query parameters are required.", 400, "MISSING_PARAMS");
    }

    return await handleDownload(url, formatId);
  } catch (err: unknown) {
    const errorDetails = formatErrorResponse(err);
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    return NextResponse.json(errorDetails, { status: statusCode });
  }
}
