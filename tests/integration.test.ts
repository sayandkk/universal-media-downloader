import test from "node:test";
import assert from "node:assert/strict";
import { analyzeYoutubeVideo, getYoutubeDownloadStream } from "../lib/extractors/youtube";
import { analyzeInstagramMedia } from "../lib/extractors/instagram";
import { analyzeFacebookVideo } from "../lib/extractors/facebook";
import { MediaNotFoundError, ValidationError } from "../lib/errors";

test("Integration — YouTube Video Analysis", async () => {
  const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const meta = await analyzeYoutubeVideo(url, "dQw4w9WgXcQ");

  assert.equal(meta.id, "dQw4w9WgXcQ");
  assert.equal(meta.platform, "youtube");
  assert(meta.title.length > 0, "Title should not be empty");
  assert(meta.thumbnail.startsWith("http"), "Thumbnail should be a valid URL");
  assert(meta.duration && meta.duration > 0, "Duration should be positive");
  assert(meta.formats.length > 0, "Formats list should not be empty");

  // Verify MP3 option was dynamically generated
  const mp3Fmt = meta.formats.find((f) => f.formatId === "audio-mp3");
  assert(mp3Fmt, "MP3 audio option should be present");
  assert.equal(mp3Fmt?.container, "mp3");
  assert.equal(mp3Fmt?.hasVideo, false);
  assert.equal(mp3Fmt?.hasAudio, true);

  // Verify progressive / video formats are present
  const videoFmts = meta.formats.filter((f) => f.hasVideo);
  assert(videoFmts.length > 0, "Video formats should be present");
});

test("Integration — YouTube Stream Creation", () => {
  const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const stream = getYoutubeDownloadStream(url, "18"); // itag 18 is 360p mp4
  assert(stream, "Stream should be created");
  assert.equal(typeof stream.pipe, "function", "Stream should be readable");
  stream.destroy();
});

test("Integration — Unicode / Non-ASCII Video Title Download Safety", async () => {
  // Test with the exact Malayalam YouTube Short requested by user
  const url = "https://youtube.com/shorts/g4da6yc3hAk";
  const meta = await analyzeYoutubeVideo("https://www.youtube.com/watch?v=g4da6yc3hAk", "g4da6yc3hAk");
  
  assert(meta.title.length > 0);
  
  // Verify Header construction does not throw ByteString errors with non-ASCII titles
  const cleanTitle = meta.title.replace(/[<>:"/\\|?*\x00-\x1F]/g, "").trim() || "media";
  const asciiOnly = cleanTitle.replace(/[^\x20-\x7E]/g, "").trim().slice(0, 60);
  const fallbackFilename = `${asciiOnly || "media"}.mp4`;
  const encodedFilename = encodeURIComponent(`${cleanTitle}.mp4`);
  const headerVal = `attachment; filename="${fallbackFilename}"; filename*=UTF-8''${encodedFilename}`;

  const h = new Headers();
  // This must not throw
  h.set("Content-Disposition", headerVal);
  assert(h.get("Content-Disposition")?.includes("filename*="));
});

test("Integration — Instagram Public Reel Analysis and Extraction", async () => {
  const url = "https://www.instagram.com/reel/DfNgvt5TL-s/";
  const meta = await analyzeInstagramMedia(url, "DfNgvt5TL-s", "reel");
  assert.equal(meta.platform, "instagram");
  assert.equal(meta.id, "DfNgvt5TL-s");
  assert(meta.formats.length > 0);
  assert(meta.directDownloadUrl && meta.directDownloadUrl.startsWith("http"));
});

test("Integration — Facebook Video Analysis and Formats", async () => {
  const url = "https://www.facebook.com/watch/?v=10153231379946729";
  const meta = await analyzeFacebookVideo(url, "10153231379946729");
  assert.equal(meta.platform, "facebook");
  assert.equal(meta.id, "10153231379946729");
  assert(meta.formats.length > 0);
  assert(meta.formats.some((f) => f.formatId === "fb-audio-mp3"));
  assert(meta.directDownloadUrl && meta.directDownloadUrl.startsWith("http"));
});

test("Integration — Windows / OS Filename Safety with Dot/Symbol Titles", () => {
  const { cleanFacebookTitle } = require("../lib/extractors/facebook");
  // Dots-only title (like user's Facebook reel)
  const dotTitle = cleanFacebookTitle("...", "19jt53MnRY");
  assert.equal(dotTitle, "Facebook Video (19jt53MnRY)");
  assert(!dotTitle.startsWith("."));

  // Spaces and hyphens
  const symbolTitle = cleanFacebookTitle("   ---   ", "12345");
  assert.equal(symbolTitle, "Facebook Video (12345)");

  // Real title
  const realTitle = cleanFacebookTitle("Amazing Cooking Recipe", "12345");
  assert.equal(realTitle, "Amazing Cooking Recipe");
});

test("Integration — Instagram Stories Guard", async () => {
  await assert.rejects(
    async () => {
      await analyzeInstagramMedia("https://www.instagram.com/stories/user/123/", "123", "story");
    },
    (err: unknown) => {
      assert(err instanceof ValidationError);
      return true;
    }
  );
});

test("Integration — Instagram Protected Reel Guard", async () => {
  // A non-existent or login-walled reel should throw MediaNotFoundError with clear explanation
  await assert.rejects(
    async () => {
      await analyzeInstagramMedia("https://www.instagram.com/reel/nonexistent_123456789/", "nonexistent_123456789", "reel");
    },
    (err: unknown) => {
      assert(err instanceof MediaNotFoundError);
      assert((err as MediaNotFoundError).message.includes("protected by Meta's authentication policy"));
      return true;
    }
  );
});

