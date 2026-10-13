"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowRightSLine, RiHome7Line } from "react-icons/ri";

export interface TocItem {
  id: string;
  title: string;
}

export interface LegalLayoutProps {
  title: string;
  effectiveDate?: string;
  lastUpdated?: string;
  breadcrumbLabel: string;
  toc: TocItem[];
  children: React.ReactNode;
}

export default function LegalLayout({
  title,
  effectiveDate,
  lastUpdated,
  breadcrumbLabel,
  toc,
  children,
}: LegalLayoutProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <RiHome7Line className="h-4 w-4" />
            Home
          </Link>
          <RiArrowRightSLine className="h-4 w-4" />
          <span className="text-foreground font-medium">{breadcrumbLabel}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                On this page
              </p>
              <nav aria-label="Table of contents" className="border-l border-border pl-4">
                <ul className="space-y-1.5">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`text-sm leading-relaxed transition-colors ${
                          activeId === item.id
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <article className="min-w-0 max-w-none">
            <header className="mb-10 border-b border-border pb-8">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                {title}
              </h1>
              {(effectiveDate || lastUpdated) && (
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  {effectiveDate && (
                    <p>
                      <span className="font-medium text-foreground">Effective Date:</span>{" "}
                      {effectiveDate}
                    </p>
                  )}
                  {lastUpdated && (
                    <p>
                      <span className="font-medium text-foreground">Last Updated:</span>{" "}
                      {lastUpdated}
                    </p>
                  )}
                </div>
              )}
            </header>

            {/* Mobile TOC */}
            <details className="lg:hidden mb-8 rounded-2xl border border-border bg-muted/30">
              <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-foreground list-none flex items-center justify-between">
                <span>On this page</span>
                <RiArrowRightSLine className="h-4 w-4 transition-transform open:rotate-90" />
              </summary>
              <nav className="px-5 pb-5 pt-1">
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </details>

            <div className="legal-content space-y-8 text-base leading-7 text-foreground/90">
              {children}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
