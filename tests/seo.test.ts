import { test } from "node:test";
import assert from "node:assert/strict";
import { SITE_CONFIG, getCanonicalUrl } from "../lib/seo/config";
import robots from "../app/robots";
import sitemap from "../app/sitemap";

test("SEO — Production URL and Canonical Generator", () => {
  assert.equal(SITE_CONFIG.productionUrl, "https://universal-media-downloader-five.vercel.app");
  
  assert.equal(getCanonicalUrl("/"), "https://universal-media-downloader-five.vercel.app");
  assert.equal(getCanonicalUrl("/youtube-downloader"), "https://universal-media-downloader-five.vercel.app/youtube-downloader");
  assert.equal(getCanonicalUrl("instagram-downloader"), "https://universal-media-downloader-five.vercel.app/instagram-downloader");
  assert.equal(getCanonicalUrl("/facebook-downloader"), "https://universal-media-downloader-five.vercel.app/facebook-downloader");
  assert.equal(getCanonicalUrl("/video-to-mp3"), "https://universal-media-downloader-five.vercel.app/video-to-mp3");
});

test("SEO — Robots.txt Directives", () => {
  const robotsData = robots();
  assert(robotsData, "robots output must be defined");
  assert.equal(robotsData.host, "https://universal-media-downloader-five.vercel.app");
  assert.equal(robotsData.sitemap, "https://universal-media-downloader-five.vercel.app/sitemap.xml");

  const rules = Array.isArray(robotsData.rules) ? robotsData.rules : [robotsData.rules];
  const generalRule = rules.find((r) => r.userAgent === "*");
  assert(generalRule, "Must have general wildcard userAgent rule");
  assert.equal(generalRule.allow, "/");
  assert(Array.isArray(generalRule.disallow) ? generalRule.disallow.includes("/api/") : generalRule.disallow === "/api/");
});

test("SEO — Sitemap XML Generation", () => {
  const sitemapData = sitemap();
  assert(Array.isArray(sitemapData), "sitemap must return an array of routes");
  assert(sitemapData.length >= 6, "Must contain all primary landing and legal pages");

  const urls = sitemapData.map((entry) => entry.url);
  assert(urls.includes("https://universal-media-downloader-five.vercel.app"));
  assert(urls.includes("https://universal-media-downloader-five.vercel.app/youtube-downloader"));
  assert(urls.includes("https://universal-media-downloader-five.vercel.app/instagram-downloader"));
  assert(urls.includes("https://universal-media-downloader-five.vercel.app/facebook-downloader"));
  assert(urls.includes("https://universal-media-downloader-five.vercel.app/video-to-mp3"));
  assert(urls.includes("https://universal-media-downloader-five.vercel.app/supported-platforms"));
  assert(urls.includes("https://universal-media-downloader-five.vercel.app/terms"));
  assert(urls.includes("https://universal-media-downloader-five.vercel.app/privacy"));

  // Verify none contain /api/
  for (const entry of sitemapData) {
    assert(!entry.url.includes("/api/"), "Sitemap must never include internal API routes");
    assert(entry.priority !== undefined && entry.priority > 0 && entry.priority <= 1.0, "Priority must be 0 < p <= 1");
    assert(entry.lastModified, "Each entry must include a valid lastModified timestamp");
  }
});
