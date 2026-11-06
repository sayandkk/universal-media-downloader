export interface FaqItem {
  q: string;
  a: string;
}

export const HOMEPAGE_FAQS: FaqItem[] = [
  {
    q: "Why are the available resolutions different for each video?",
    a: "Universal Media Downloader never displays hardcoded or fake resolutions. We dynamically inspect the video source and only show resolutions that the original creator uploaded and that are genuinely available from the streaming network.",
  },
  {
    q: "What is the difference between 'Video + Audio' and 'Video Only'?",
    a: "Streaming platforms store standard resolutions (like 360p and 720p) with video and audio multiplexed together. Higher resolutions (like 1080p, 1440p, and 4K) are often stored as standalone adaptive video tracks. Universal Media Downloader categorizes them transparently so you know exactly what is included in your file.",
  },
  {
    q: "How does the MP3 audio extraction work?",
    a: "When you select MP3 audio, our backend pipes the highest-bitrate available audio stream from the media source directly through an integrated FFmpeg audio encoder, delivering a clean 192 kbps MP3 file straight to your download folder.",
  },
  {
    q: "Why can't I download private videos or Instagram Stories?",
    a: "In compliance with platform security rules and user privacy controls, Universal Media Downloader only processes publicly accessible media. Stories and private accounts require personal login credentials, session cookies, and explicit follower permissions, which we strictly do not bypass.",
  },
  {
    q: "Does Universal Media Downloader store my downloaded files or browsing history?",
    a: "No. Universal Media Downloader is built on a 100% database-free, stateless architecture. Media is streamed directly through chunked HTTP transfer to your browser without long-term server disk storage or persistent tracking.",
  },
  {
    q: "Is downloading videos legal?",
    a: "You should only download content that you own, have express permission from the copyright owner to download, or that is distributed under Creative Commons or open public licenses. Please review our Terms of Service for complete usage guidelines.",
  },
];

export const YOUTUBE_FAQS: FaqItem[] = [
  {
    q: "Can I download YouTube Shorts as well as standard videos?",
    a: "Yes. Our extractor recognizes standard watch links (youtube.com/watch?v=...), mobile Shorts (youtube.com/shorts/...), shortened links (youtu.be/...), and embed links seamlessly.",
  },
  {
    q: "Are 1080p, 1440p, and 4K YouTube resolutions supported?",
    a: "Yes. When the original creator uploaded the video in Full HD or 4K, our analyzer dynamically detects the adaptive streams and presents them for direct download.",
  },
  {
    q: "How do I download just the MP3 audio from a YouTube video?",
    a: "Paste the YouTube link, click Analyze, select the 'Audio Only' tab, and choose 'MP3 Audio Track'. Our backend pipes the stream through FFmpeg and converts it to a 192 kbps MP3 on-the-fly.",
  },
  {
    q: "Why does a YouTube video fail to analyze?",
    a: "Videos that are private, age-restricted, geoblocked by copyright holders in certain territories, or require paid YouTube Premium access cannot be fetched by our public proxy.",
  },
];

export const INSTAGRAM_FAQS: FaqItem[] = [
  {
    q: "Can I download public Instagram Reels?",
    a: "Yes. Simply paste the link to any public Instagram Reel (instagram.com/reel/...) into the analyzer to download the high-definition MP4 video or extract the audio.",
  },
  {
    q: "Why can't I download Instagram Stories?",
    a: "Instagram Stories are ephemeral and require private user session credentials to access. In adherence to privacy guidelines and access controls, we strictly do not support downloading private Stories.",
  },
  {
    q: "Do I need to log in to my Instagram account?",
    a: "No. You never have to log in, provide passwords, or connect your account. We only access authorized public media.",
  },
  {
    q: "Can I convert an Instagram Reel to an MP3 audio track?",
    a: "Yes. After analyzing the Reel, select 'Audio Only' and choose the 'Instagram Audio Track (MP3)' option to download a 192 kbps MP3.",
  },
];

export const FACEBOOK_FAQS: FaqItem[] = [
  {
    q: "Can I download Facebook Reels as well as Watch videos?",
    a: "Yes. Our analyzer supports Facebook Watch (facebook.com/watch/?v=...), mobile Reels (facebook.com/reel/...), Facebook Share links (/share/r/...), and shortened fb.watch URLs.",
  },
  {
    q: "Does the downloaded Facebook video include both video and sound?",
    a: "Yes. We automatically prioritize progressive 720p HD and 360p SD streams where video and audio are already combined by Meta, guaranteeing full playback on all devices and media players.",
  },
  {
    q: "Can I extract audio from a Facebook video into an MP3 file?",
    a: "Yes. Analyze the Facebook URL, click 'Audio Only', and choose 'MP3 Audio Track'. Our backend converts the audio track into a 192 kbps MP3 using FFmpeg.",
  },
  {
    q: "Why does a Facebook video link fail to load?",
    a: "If the video is posted inside a private Facebook group, set to 'Friends Only', or has audience/country restrictions, Meta requires personal login cookies which our public proxy strictly does not bypass.",
  },
];

export const MP3_FAQS: FaqItem[] = [
  {
    q: "What audio bitrate does the MP3 converter provide?",
    a: "We extract and encode audio at 192 kbps CBR (Constant Bitrate) in MP3 format, providing studio-quality clarity suitable for music, speech, lectures, and podcasts.",
  },
  {
    q: "Which platforms can I extract audio from?",
    a: "You can extract MP3 audio from any public, authorized video link across YouTube (standard videos and Shorts), Instagram (Reels and video posts), and Facebook (Watch and Reels).",
  },
  {
    q: "Do I have to wait for the whole video to download before converting?",
    a: "No. Our backend pipes the raw media stream directly into an active FFmpeg audio transcoding process on-the-fly, streaming converted MP3 chunks to your browser in real-time.",
  },
  {
    q: "Will the MP3 play on all phones and computers?",
    a: "Yes. Standard ISO MPEG Audio Layer 3 (MP3) at 44.1 kHz is universal and plays natively on iPhone, Android, Windows, Mac, Linux, car audio systems, and smart speakers without needing extra apps.",
  },
];
