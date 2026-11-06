# MediaFlow — Universal Media Downloader

> A high-performance, stateless web application for analyzing, inspecting, and downloading supported YouTube, Instagram, and Facebook media into MP4 and MP3 formats with dynamic quality selection, real streaming pipelines, and 100% database-free architecture.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![FFmpeg](https://img.shields.io/badge/FFmpeg-Enabled-green?style=flat-square&logo=ffmpeg)](https://ffmpeg.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## ✨ Features

- **YouTube Media Suite**:
  - Full support for standard video URLs, YouTube Shorts, shortened `youtu.be` links, and query parameter variations.
  - Dynamic resolution selection (144p, 240p, 360p, 480p, 720p HD, 1080p Full HD, 1440p QHD, 2160p 4K).
  - Integrated high-bitrate **MP3 audio extraction** (192 kbps) powered by on-the-fly FFmpeg transcoding.
  - Transparent categorization: Video + Audio multiplexed vs. Adaptive Video Only vs. Audio tracks.
- **Instagram Media Suite**:
  - URL validation and inspection for Instagram Reels and public posts.
  - Stream extraction for high-definition MP4 video and on-the-fly converted MP3 audio tracks.
  - Ethical access boundaries: explicit explanations for private profiles and ephemeral Stories without pretending unsupported downloads work.
- **Facebook Media Suite**:
  - Full support for Facebook Watch links (`facebook.com/watch/?v=...`), Facebook Reels (`facebook.com/reel/...`), video posts, and shortened `fb.watch/...` links.
  - Dynamic quality options (720p HD, 360p SD MP4 Video + Audio).
  - High-bitrate **MP3 audio track extraction** (192 kbps) powered by FFmpeg.
- **Enterprise-Grade Security**:
  - Comprehensive Server-Side Request Forgery (SSRF) guard with protocol and domain allowlists (`youtube.com`, `instagram.com`, `facebook.com`).
  - Localhost and private IP blocking (`127.0.0.1`, `10.0.0.0/8`, `169.254.169.254` AWS metadata).
  - Sliding-window in-memory rate limiting to prevent automated abuse.
  - RFC 5987 / RFC 6266 sanitized `Content-Disposition` attachment headers supporting all international Unicode titles.
- **Modern SaaS UI/UX**:
  - Light and Dark modes with smooth transitions.
  - Clipboard paste button and automatic platform detection badge.
  - Indeterminate and determinate progress indicators.
  - Responsive mobile navigation drawer and accessible controls.
- **100% Database-Free & Zero Auth**:
  - No database required (no PostgreSQL, MongoDB, MySQL, Prisma, or Redis).
  - No user accounts, registration, or tracking cookies.
  - Ephemeral in-memory streaming with instant cleanup.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v20 or higher
- [npm](https://www.npmjs.com/) v10 or higher

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/mediaflow.git
   cd mediaflow
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

MediaFlow features comprehensive automated test coverage for URL parsing, SSRF defense, rate limiting, and live YouTube/Instagram stream resolution.

Run all tests:
```bash
npm test
```

Run unit tests only:
```bash
npx tsx --test tests/unit.test.ts
```

Run integration tests only:
```bash
npx tsx --test tests/integration.test.ts
```

---

## 🏗️ Production Build

To build the optimized Next.js production output:
```bash
npm run build
npm start
```

---

## 🐳 Docker Deployment

A production-ready multi-stage `Dockerfile` with native FFmpeg and a non-root system user is included:

```bash
# Build and run with Docker Compose
docker compose up -d --build
```
Access the application at `http://localhost:3000`.

---

## ☁️ Vercel Deployment

MediaFlow is designed for zero-config Vercel deployment:
1. Push this project to GitHub.
2. Import the project into the [Vercel Dashboard](https://vercel.com/new).
3. Deploy!

For complete details on Vercel function timeouts and chunked stream piping, see [Vercel Deployment Guide](docs/VERCEL_DEPLOYMENT.md).

---

## 📚 Documentation

- [System Architecture Blueprint](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Security & Threat Model](docs/SECURITY.md)
- [Vercel Deployment Guide](docs/VERCEL_DEPLOYMENT.md)

---

## ⚖️ License & Fair Use

MediaFlow is distributed under the MIT License. Users are responsible for ensuring they have the legal right or copyright permission to download and convert requested media.

