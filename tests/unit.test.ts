import test from "node:test";
import assert from "node:assert/strict";
import { parseAndValidateMediaUrl, detectPlatformFromInput } from "../lib/validators/media-url";
import { checkRateLimit } from "../lib/security/rate-limiter";
import { ValidationError, UnsupportedPlatformError, RateLimitError } from "../lib/errors";

test("URL Validation — Standard YouTube Video", () => {
  const result = parseAndValidateMediaUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  assert.equal(result.platform, "youtube");
  assert.equal(result.id, "dQw4w9WgXcQ");
  assert.equal(result.normalizedUrl, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});

test("URL Validation — YouTube Shorts", () => {
  const result = parseAndValidateMediaUrl("https://www.youtube.com/shorts/dQw4w9WgXcQ");
  assert.equal(result.platform, "youtube");
  assert.equal(result.id, "dQw4w9WgXcQ");
  assert.equal(result.type, "short");
});

test("URL Validation — Shortened youtu.be link", () => {
  const result = parseAndValidateMediaUrl("https://youtu.be/dQw4w9WgXcQ");
  assert.equal(result.platform, "youtube");
  assert.equal(result.id, "dQw4w9WgXcQ");
});

test("URL Validation — YouTube URL with extra parameters", () => {
  const result = parseAndValidateMediaUrl(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s&list=RDdQw4w9WgXcQ&index=1"
  );
  assert.equal(result.platform, "youtube");
  assert.equal(result.id, "dQw4w9WgXcQ");
});

test("URL Validation — Instagram Reel", () => {
  const result = parseAndValidateMediaUrl("https://www.instagram.com/reel/C8q43_hM_6G/");
  assert.equal(result.platform, "instagram");
  assert.equal(result.id, "C8q43_hM_6G");
  assert.equal(result.type, "reel");
});

test("URL Validation — Instagram Post", () => {
  const result = parseAndValidateMediaUrl("https://www.instagram.com/p/C8q43_hM_6G/?igsh=abc123");
  assert.equal(result.platform, "instagram");
  assert.equal(result.id, "C8q43_hM_6G");
  assert.equal(result.type, "post");
});

test("URL Validation — Facebook Watch Video", () => {
  const result = parseAndValidateMediaUrl("https://www.facebook.com/watch/?v=10153231379946729");
  assert.equal(result.platform, "facebook");
  assert.equal(result.id, "10153231379946729");
});

test("URL Validation — Facebook Reel", () => {
  const result = parseAndValidateMediaUrl("https://www.facebook.com/reel/9876543210/");
  assert.equal(result.platform, "facebook");
  assert.equal(result.id, "9876543210");
  assert.equal(result.type, "reel");
});

test("URL Validation — Facebook Shortened fb.watch link", () => {
  const result = parseAndValidateMediaUrl("https://fb.watch/sampleReel123/");
  assert.equal(result.platform, "facebook");
  assert.equal(result.id, "sampleReel123");
});

test("URL Validation — Rejection of Instagram Stories with clear explanation", () => {
  assert.throws(
    () => parseAndValidateMediaUrl("https://www.instagram.com/stories/username/1234567890/"),
    (err: unknown) => {
      assert(err instanceof ValidationError);
      assert((err as ValidationError).userMessage.includes("Instagram Stories are ephemeral"));
      return true;
    }
  );
});

test("URL Validation — Unsupported Domain", () => {
  assert.throws(
    () => parseAndValidateMediaUrl("https://tiktok.com/@creator/video/12345678"),
    UnsupportedPlatformError
  );
});

test("URL Validation — Malformed / Non-URL input", () => {
  assert.throws(() => parseAndValidateMediaUrl("not-a-valid-url"), ValidationError);
});

test("SSRF Protection — Localhost & Private IP Rejection", () => {
  assert.throws(() => parseAndValidateMediaUrl("http://localhost:3000/watch?v=dQw4w9WgXcQ"), ValidationError);
  assert.throws(() => parseAndValidateMediaUrl("http://127.0.0.1/watch?v=dQw4w9WgXcQ"), ValidationError);
  assert.throws(() => parseAndValidateMediaUrl("http://169.254.169.254/latest/meta-data"), ValidationError);
  assert.throws(() => parseAndValidateMediaUrl("http://192.168.1.1/watch?v=dQw4w9WgXcQ"), ValidationError);
});

test("Platform Detection Helper", () => {
  assert.equal(detectPlatformFromInput("https://youtu.be/dQw4w9WgXcQ"), "youtube");
  assert.equal(detectPlatformFromInput("https://www.instagram.com/reel/xyz123"), "instagram");
  assert.equal(detectPlatformFromInput("https://www.facebook.com/watch/?v=123"), "facebook");
  assert.equal(detectPlatformFromInput("https://fb.watch/sample/"), "facebook");
  assert.equal(detectPlatformFromInput("https://example.com"), null);
});

test("Rate Limiter — Sliding window enforcement", () => {
  const testIp = `test-ip-${Date.now()}`;
  // 5 allowed requests
  for (let i = 0; i < 5; i++) {
    checkRateLimit(testIp, "analyze", 5, 1000);
  }
  // 6th request should fail
  assert.throws(() => checkRateLimit(testIp, "analyze", 5, 1000), RateLimitError);
});

