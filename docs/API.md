# MediaFlow API Documentation

All API endpoints are hosted under `/api/media`.

---

## 1. Analyze Media URL

Inspects a media URL and returns verified metadata, available resolutions, and stream categories.

- **Method**: `POST`
- **Path**: `/api/media/analyze`
- **Content-Type**: `application/json`

### Request Body
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "id": "dQw4w9WgXcQ",
    "platform": "youtube",
    "originalUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "title": "Rick Astley - Never Gonna Give You Up (Official Music Video)",
    "thumbnail": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    "author": "Rick Astley",
    "duration": 213,
    "durationFormatted": "3:33",
    "formats": [
      {
        "formatId": "22",
        "container": "mp4",
        "resolution": "720p",
        "category": "video_audio",
        "hasVideo": true,
        "hasAudio": true,
        "isMuxed": true,
        "filesize": 34500000,
        "filesizeFormatted": "32.9 MB",
        "fps": 30,
        "label": "720p (MP4 Video + Audio)"
      },
      {
        "formatId": "audio-mp3",
        "container": "mp3",
        "resolution": "Audio Only",
        "category": "audio_only",
        "hasVideo": false,
        "hasAudio": true,
        "isMuxed": false,
        "filesize": 5112000,
        "filesizeFormatted": "4.9 MB",
        "audioBitrate": 192,
        "label": "MP3 Audio (192 kbps Converted)"
      }
    ]
  }
}
```

### Error Responses
- `400 Bad Request`: Invalid or malformed URL, unsupported platform.
- `404 Not Found`: Media does not exist, is private, or requires login credentials.
- `429 Too Many Requests`: Exceeded 40 analyze requests per minute.

---

## 2. Download Media Stream

Initiates a direct binary stream transfer with `Content-Disposition: attachment`.

- **Method**: `GET` or `POST`
- **Path**: `/api/media/download`

### GET Query Parameters
- `url`: Encoded media URL
- `formatId`: Chosen format ID (e.g. `22`, `18`, `audio-mp3`)

**Example**:
```
GET /api/media/download?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ&formatId=audio-mp3
```

### POST Request Body
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "formatId": "audio-mp3"
}
```

### Response Headers
```http
HTTP/1.1 200 OK
Content-Type: audio/mpeg (or video/mp4)
Content-Disposition: attachment; filename="Rick Astley - Never Gonna Give You Up.mp3"; filename*=UTF-8''...
Transfer-Encoding: chunked
```
Body contains binary media stream.

---

## 3. Health Check

- **Method**: `GET`
- **Path**: `/api/health`

### Response
```json
{
  "status": "ok",
  "timestamp": "2026-11-05T16:30:00.000Z",
  "service": "universal-media-downloader",
  "version": "1.0.0"
}
```

