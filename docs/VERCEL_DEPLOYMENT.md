# Vercel Deployment Guide

## 1. Overview

MediaFlow is built with Next.js 15 App Router and is optimized for deployment on Vercel. 

### Serverless Execution Boundaries on Vercel

| Resource | Vercel Hobby Limit | Vercel Pro Limit | MediaFlow Strategy |
| :--- | :--- | :--- | :--- |
| **Execution Duration** | 10 seconds | 60–300 seconds | Uses chunked HTTP streaming (`ReadableStream`) directly from source to client to start delivery immediately without buffering timeouts. |
| **Payload Size** | 4.5 MB | 4.5 MB (buffered) | **Bypassed via streaming**: Chunked streaming responses are not subject to the 4.5 MB buffered payload ceiling. |
| **Temporary Filesystem** | Ephemeral `/tmp` (512 MB) | Ephemeral `/tmp` (1024 MB) | Zero disk writes: all audio conversions and video transfers stream via in-memory pipes. |
| **FFmpeg Binary** | Packaged via `@ffmpeg-installer/ffmpeg` | Packaged via `@ffmpeg-installer/ffmpeg` | Configured with `serverExternalPackages: ["@ffmpeg-installer/ffmpeg", "fluent-ffmpeg"]` in `next.config.ts`. |

---

## 2. Deployment Steps via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy Project**:
   ```bash
   vercel
   ```

4. **Production Deployment**:
   ```bash
   vercel --prod
   ```

---

## 3. Deployment Steps via GitHub / Vercel Dashboard

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Open [vercel.com/new](https://vercel.com/new).
3. Import your repository.
4. Leave Build Settings at their defaults (`Next.js` preset, `npm run build`, output `.next`).
5. Click **Deploy**.

---

## 4. Alternative: Standalone Docker Deployment

For high-volume video processing or videos requiring extensive multiplexing (e.g. 4K stream merging):
Deploy using the included `Dockerfile` and `docker-compose.yml` on Railway, Render, Fly.io, or any VPS:

```bash
docker compose up -d --build
```
The application will be accessible at `http://localhost:3000`.

