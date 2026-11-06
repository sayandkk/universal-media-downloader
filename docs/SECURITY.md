# MediaFlow Application Security Guide

## 1. Threat Model & Mitigations

### Server-Side Request Forgery (SSRF) Protection
- **Vulnerability**: Malicious users supply internal network URLs (e.g. `http://169.254.169.254/latest/meta-data` or `http://localhost:6379`) to probe internal infrastructure.
- **Mitigation (`lib/security/ssrf.ts`)**:
  - Enforces strict protocol allowlisting (`http:` / `https:` only).
  - Enforces hostname allowlisting (`youtube.com`, `youtu.be`, `instagram.com`).
  - Blocks loopback (`127.0.0.0/8`), RFC 1918 private IP ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), link-local metadata ranges (`169.254.169.254`), and IPv6 equivalents (`::1`, `fc00::`).
  - Strips credentials from user-supplied URLs.

### Command Injection Defense
- **Vulnerability**: Passing unsanitized user inputs to FFmpeg or shell subprocesses.
- **Mitigation (`lib/processing/ffmpeg.ts`)**:
  - Uses `fluent-ffmpeg` structured API bindings (`audioCodec`, `audioBitrate`, `format`) rather than executing raw shell strings (`exec` / `sh -c`).
  - Arguments are passed as discrete token arrays.
  - Zero arbitrary user-supplied arguments are allowed into FFmpeg.

### Content-Disposition Header Injection & Path Traversal
- **Vulnerability**: Video titles containing control characters or path traversal delimiters (`../../`) could cause header splitting or write outside permitted directories.
- **Mitigation (`app/api/media/download/route.ts`)**:
  - Sanitizes filenames using regex `/[<>:"/\\|?*\x00-\x1F]/g`.
  - Emits both standard ASCII filename and RFC 5987 encoded `filename*="UTF-8''..."` attributes.

### Abuse Prevention Without User Accounts
- **Vulnerability**: Automated bots exhausting bandwidth or CPU by flooding stream requests.
- **Mitigation (`lib/security/rate-limiter.ts`)**:
  - Sliding-window in-memory rate limiting per client IP.
  - Analyze limit: 40 requests/minute.
  - Download limit: 20 requests/minute.
  - Memory cleanup: Purges expired timestamps every 5 minutes to prevent memory leaks.

### Platform Access Boundaries
- **Private Content & DRM**:
  - MediaFlow does not crack DRM or decrypt encrypted media streams.
  - MediaFlow does not bypass Instagram private account walls, authentication gates, or ephemeral Stories without authorized login.

