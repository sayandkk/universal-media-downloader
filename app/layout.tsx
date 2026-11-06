import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "MediaFlow — Universal YouTube, Instagram & Facebook Media Downloader",
  description:
    "Fast, lightweight, and modern media utility to analyze, select quality, and download supported YouTube videos, Shorts, Instagram media, and Facebook videos to MP4 and MP3.",
  keywords: [
    "YouTube downloader",
    "Instagram downloader",
    "Facebook video downloader",
    "Video to MP3",
    "MP4 downloader",
    "YouTube Shorts",
    "Facebook Reels",
    "Media utility",
  ],
  authors: [{ name: "MediaFlow Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
