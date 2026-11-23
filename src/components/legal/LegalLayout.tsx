"use client";

import { useLocale } from "next-intl";
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
  effectiveLabel?: string;
  lastUpdatedLabel?: string;
  breadcrumbLabel: string;
  homeLabel?: string;
  tocLabel?: string;
  breadcrumbAria?: string;
  tocAria?: string;
  lang?: string;
  toc: TocItem[];
  html?: string;
  children?: React.ReactNode;
}

export default function LegalLayout({
  title,
  effectiveDate,
  lastUpdated,
  effectiveLabel = "Effective Date:",
  lastUpdatedLabel = "Last Updated:",
  breadcrumbLabel,
  homeLabel = "Home",
  tocLabel = "On this page",
  breadcrumbAria = "Breadcrumb",
  tocAria = "Table of contents",
  lang,
  toc,
  html,
  children,
}: LegalLayoutProps) {
  const locale = useLocale();
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
    <main className="site-shell min-h-screen">
      {/* 背景光晕：阅读场景保持克制，不与正文抢注意力 */}
      <div className="pointer-events-none absolute -right-40 top-10 size-[26rem] rounded-full bg-[#C8F237]/8 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-1/3 size-[24rem] rounded-full bg-[#C8F237]/6 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-12 md:pb-28">
        {/* Breadcrumb */}
        <nav
          aria-label={breadcrumbAria}
          className="mb-10 flex items-center gap-1.5 text-sm text-white/50"
        >
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <RiHome7Line className="size-4" />
            {homeLabel}
          </Link>
          <RiArrowRightSLine className="size-4 text-white/30" />
          <span className="font-medium text-white/85">{breadcrumbLabel}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="glass-panel sticky top-28 rounded-3xl p-5">
              <p className="quiet-label mb-4 text-[11px] font-semibold">
                {tocLabel}
              </p>
              <nav aria-label={tocAria} className="border-l border-white/10 pl-4">
                <ul className="space-y-1.5">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block text-sm leading-relaxed transition-colors ${
                          activeId === item.id
                            ? "font-medium text-[#C8F237]"
                            : "text-white/50 hover:text-white"
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
          <article lang={lang} className="min-w-0 max-w-none">
            <div className="glass-panel-strong rounded-[2rem] p-7 sm:p-10 md:p-12">
              <header className="mb-10 border-b border-white/10 pb-8">
                <div className="mb-7 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#C8F237]/70" />
                  <span className="quiet-label text-[11px] font-semibold">Coolha</span>
                </div>
                <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  {title}
                </h1>
                {(effectiveDate || lastUpdated) && (
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
                    {effectiveDate && (
                      <p>
                        <span className="font-medium text-white/85">{effectiveLabel}</span>{" "}
                        {effectiveDate}
                      </p>
                    )}
                    {lastUpdated && (
                      <p>
                        <span className="font-medium text-white/85">{lastUpdatedLabel}</span>{" "}
                        {lastUpdated}
                      </p>
                    )}
                  </div>
                )}
              </header>

              {/* Mobile TOC */}
              <details className="glass-panel mb-9 rounded-2xl lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium text-white/85">
                  <span>{tocLabel}</span>
                  <RiArrowRightSLine className="size-4 transition-transform open:rotate-90" />
                </summary>
                <nav aria-label={tocAria} className="px-5 pb-5 pt-1">
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="block text-sm text-white/55 transition-colors hover:text-white"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </details>

              {html !== undefined ? (
                <div
                  className="legal-content space-y-8 text-base leading-7 text-white/75"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : (
                <div className="legal-content space-y-8 text-base leading-7 text-white/75">
                  {children}
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
