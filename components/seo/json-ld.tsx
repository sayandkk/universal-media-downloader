import React from "react";
import { SITE_CONFIG, getCanonicalUrl } from "@/lib/seo/config";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebApplicationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": SITE_CONFIG.name,
    "alternateName": SITE_CONFIG.shortName,
    "url": SITE_CONFIG.productionUrl,
    "description": SITE_CONFIG.description,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All (Web Browser)",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "featureList": [
      "YouTube video and Shorts download with dynamic quality selection",
      "Instagram Reel and video post download",
      "Facebook Watch video and Reel download",
      "Live 192 kbps MP3 audio extraction from supported video streams",
      "100% database-free architecture with zero personal data retention",
    ],
    "author": {
      "@type": "Organization",
      "name": SITE_CONFIG.author,
      "url": SITE_CONFIG.productionUrl,
    },
  };

  return <JsonLd data={schema} />;
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.productionUrl,
    "description": SITE_CONFIG.description,
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.productionUrl,
    },
  };

  return <JsonLd data={schema} />;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}

export interface BreadcrumbStep {
  name: string;
  path: string;
}

export function BreadcrumbsJsonLd({ steps }: { steps: BreadcrumbStep[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": steps.map((step, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": step.name,
      "item": getCanonicalUrl(step.path),
    })),
  };

  return <JsonLd data={schema} />;
}

