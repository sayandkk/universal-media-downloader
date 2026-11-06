import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbsJsonLd, BreadcrumbStep } from "./seo/json-ld";

interface BreadcrumbsProps {
  steps: BreadcrumbStep[];
}

export function Breadcrumbs({ steps }: BreadcrumbsProps) {
  const allSteps: BreadcrumbStep[] = [
    { name: "Home", path: "/" },
    ...steps,
  ];

  return (
    <>
      <BreadcrumbsJsonLd steps={allSteps} />
      <nav aria-label="Breadcrumb" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          {allSteps.map((step, index) => {
            const isLast = index === allSteps.length - 1;
            return (
              <li key={step.path} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 flex-shrink-0" />}
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {step.name}
                  </span>
                ) : (
                  <Link
                    href={step.path}
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {index === 0 && <Home className="w-3.5 h-3.5" />}
                    <span>{step.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
