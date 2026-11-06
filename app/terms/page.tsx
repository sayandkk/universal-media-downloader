import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SITE_CONFIG, getCanonicalUrl } from "@/lib/seo/config";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms and conditions for using the ${SITE_CONFIG.name} online utility.`,
  alternates: {
    canonical: getCanonicalUrl("/terms"),
  },
};

export default function TermsPage() {
  return (
    <div className="space-y-6 pb-16">
      <Breadcrumbs steps={[{ name: "Terms of Service", path: "/terms" }]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 bg-card p-6 sm:p-10 rounded-2xl border border-border shadow-sm">
          <div className="space-y-2 border-b border-border pb-6">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Shield className="w-4 h-4" /> Legal Agreement
            </div>
            <h1 className="text-3xl font-extrabold text-foreground">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">Last updated: November 2026</p>
          </div>

          <section className="space-y-3 text-sm text-foreground/80 leading-relaxed">
            <h2 className="text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using {SITE_CONFIG.name}, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any of these terms, you are prohibited from using the service.
            </p>
          </section>

          <section className="space-y-3 text-sm text-foreground/80 leading-relaxed">
            <h2 className="text-lg font-bold text-foreground">2. Permitted Use & Copyright</h2>
            <p>
              {SITE_CONFIG.name} provides technical utility tools to download and format media for authorized purposes only. You agree that you will only use this service to access content:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>That you personally own or created;</li>
              <li>For which you have express written authorization or licensing from the copyright holder;</li>
              <li>That is distributed under open public licenses (e.g., Creative Commons, public domain);</li>
              <li>Under recognized fair use exceptions permitted under applicable copyright laws.</li>
            </ul>
          </section>

          <section className="space-y-3 text-sm text-foreground/80 leading-relaxed">
            <h2 className="text-lg font-bold text-foreground">3. Respect for Platform Restrictions</h2>
            <p>
              You agree not to use the service to bypass digital rights management (DRM), authentication gates, paywalls, or private account restrictions. We strictly reject requests targeting private accounts, private groups, or ephemeral content such as Instagram Stories.
            </p>
          </section>

          <section className="space-y-3 text-sm text-foreground/80 leading-relaxed">
            <h2 className="text-lg font-bold text-foreground">4. Disclaimer of Warranty & Platform Affiliation</h2>
            <p>
              {SITE_CONFIG.name} is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind. We are an independent software project not affiliated with, endorsed by, or sponsored by YouTube, Google, Instagram, Facebook, or Meta.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
