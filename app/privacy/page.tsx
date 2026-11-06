import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SITE_CONFIG, getCanonicalUrl } from "@/lib/seo/config";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Zero data collection and privacy policy for ${SITE_CONFIG.name}.`,
  alternates: {
    canonical: getCanonicalUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <div className="space-y-6 pb-16">
      <Breadcrumbs steps={[{ name: "Privacy Policy", path: "/privacy" }]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 bg-card p-6 sm:p-10 rounded-2xl border border-border shadow-sm">
          <div className="space-y-2 border-b border-border pb-6">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Lock className="w-4 h-4" /> Zero Data Collection
            </div>
            <h1 className="text-3xl font-extrabold text-foreground">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: November 2026</p>
          </div>

          <section className="space-y-3 text-sm text-foreground/80 leading-relaxed">
            <h2 className="text-lg font-bold text-foreground">1. Complete Absence of Persistent Databases</h2>
            <p>
              {SITE_CONFIG.name} was intentionally architected from the ground up without a database. We do not use PostgreSQL, MongoDB, MySQL, Redis, or any other persistent datastore. We do not require accounts, usernames, email addresses, or payment credentials.
            </p>
          </section>

          <section className="space-y-3 text-sm text-foreground/80 leading-relaxed">
            <h2 className="text-lg font-bold text-foreground">2. Ephemeral Media Processing</h2>
            <p>
              When a media URL is submitted, stream extraction and audio transcoding are handled strictly in-memory or piped through temporary OS streams. Media bytes are never retained on our servers after your download completes.
            </p>
          </section>

          <section className="space-y-3 text-sm text-foreground/80 leading-relaxed">
            <h2 className="text-lg font-bold text-foreground">3. Temporary In-Memory Rate Limiting</h2>
            <p>
              To prevent denial-of-service attacks and automated scraping abuse, client IP addresses are temporarily tracked in volatile server memory using a 60-second sliding window. These timestamps are purged automatically every 5 minutes and are never persisted to disk or sold to third parties.
            </p>
          </section>

          <section className="space-y-3 text-sm text-foreground/80 leading-relaxed">
            <h2 className="text-lg font-bold text-foreground">4. Third-Party Platforms</h2>
            <p>
              When you download public media, requests are routed to the respective content delivery networks (Google/YouTube, Meta/Instagram/Facebook). Those platforms may observe the request in accordance with their standard public web traffic logging.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
