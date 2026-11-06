import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Terms of Service — MediaFlow",
  description: "Terms and conditions for using the MediaFlow media downloader service.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

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
            By accessing and using MediaFlow, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any of these terms, you are prohibited from using the service.
          </p>
        </section>

        <section className="space-y-3 text-sm text-foreground/80 leading-relaxed">
          <h2 className="text-lg font-bold text-foreground">2. Permitted Use & Copyright</h2>
          <p>
            MediaFlow provides technical utility tools to download and format media for authorized purposes only. You agree that you will only use this service to access content:
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
            MediaFlow strictly enforces ethical access policies. We do not circumvent digital rights management (DRM), bypass paywalls, scrape private profiles, or access login-restricted Instagram Stories. Any attempt to exploit, reverse engineer, or abuse our APIs will result in immediate IP banning.
          </p>
        </section>

        <section className="space-y-3 text-sm text-foreground/80 leading-relaxed">
          <h2 className="text-lg font-bold text-foreground">4. Disclaimer of Warranties & Limitation of Liability</h2>
          <p>
            MediaFlow is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. MediaFlow is not affiliated with, endorsed by, or sponsored by YouTube, Google LLC, Instagram, or Meta Platforms, Inc. In no event shall MediaFlow or its maintainers be liable for any damages arising out of the use or inability to use the service.
          </p>
        </section>
      </div>
    </div>
  );
}

