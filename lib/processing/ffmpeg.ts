import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { PassThrough, Readable } from "stream";
import { ProcessingError } from "../errors";

// Set binary path if available
if (ffmpegInstaller && ffmpegInstaller.path) {
  ffmpeg.setFfmpegPath(ffmpegInstaller.path);
}

export function convertToMp3Stream(inputStream: Readable, bitrate = 192): Readable {
  const passThrough = new PassThrough();

  try {
    ffmpeg(inputStream)
      .format("mp3")
      .audioCodec("libmp3lame")
      .audioBitrate(bitrate)
      .on("start", (commandLine) => {
        if (process.env.NODE_ENV === "development") {
          console.log("[FFmpeg] Spawned command:", commandLine);
        }
      })
      .on("error", (err) => {
        console.error("[FFmpeg] Transcoding error:", err.message);
        passThrough.destroy(new ProcessingError(`FFmpeg conversion failed: ${err.message}`));
      })
      .pipe(passThrough, { end: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    passThrough.destroy(new ProcessingError(`Failed to initialize FFmpeg pipeline: ${msg}`));
  }

  return passThrough;
}

/**
 * Converts a Node.js Readable stream into a modern WHATWG / Web ReadableStream
 * compatible with Next.js Response streaming.
 */
export function nodeToWebStream(nodeStream: Readable): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      nodeStream.on("data", (chunk: Buffer | Uint8Array) => {
        controller.enqueue(new Uint8Array(chunk));
      });

      nodeStream.on("end", () => {
        controller.close();
      });

      nodeStream.on("error", (err) => {
        controller.error(err);
      });
    },
    cancel() {
      if (typeof (nodeStream as unknown as { destroy?: () => void }).destroy === "function") {
        (nodeStream as unknown as { destroy: () => void }).destroy();
      }
    },
  });
}

