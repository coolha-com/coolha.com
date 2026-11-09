import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import {
  parseLegalMarkdown,
  selectLegalContentLocale,
  type LegalMeta,
  type LegalTocItem,
  type ParsedLegalMarkdown,
} from "@/lib/legal-markdown";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/seo";

export type LegalDocId = "privacy" | "terms";

/**
 * One Markdown file per locale under `content/legal/<doc>/<locale>.md`.
 * The directory arguments stay static so the file trace stays inside that folder.
 */
function legalPath(doc: LegalDocId, locale: Locale): string {
  return path.join(process.cwd(), "content", "legal", doc, `${locale}.md`);
}

export interface LoadedLegalDocument extends ParsedLegalMarkdown {
  meta: LegalMeta;
  toc: LegalTocItem[];
  /** Locale of the Markdown file actually rendered. */
  contentLocale: Locale;
  /** Route locale after unknown locales are coerced to English. */
  routeLocale: Locale;
  /**
   * True when a known locale had no file and English was used.
   * Title, body, dates, and JSON-LD inLanguage / headline then come from en.md.
   * The canonical URL still uses the route locale.
   */
  fellBackToEnglish: boolean;
}

/**
 * Loads `content/legal/<doc>/<locale>.md`.
 *
 * Fallback:
 * - An unknown locale is treated as `en`.
 * - A known locale whose file is missing is rendered from `en.md`.
 * - If `en.md` itself is missing, this throws.
 */
export const loadLegalDocument = cache((doc: LegalDocId, locale: string): LoadedLegalDocument => {
  const selection = selectLegalContentLocale(
    locale,
    (candidate) => fs.existsSync(legalPath(doc, candidate as Locale)),
    LOCALES,
    DEFAULT_LOCALE,
  );
  const routeLocale = selection.routeLocale as Locale;
  const contentLocale = selection.contentLocale as Locale;
  const filePath = legalPath(doc, contentLocale);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing legal markdown: content/legal/${doc}/${contentLocale}.md`);
  }

  let parsed: ParsedLegalMarkdown;
  try {
    parsed = parseLegalMarkdown(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${filePath}: ${message}`);
  }

  if (parsed.meta.inLanguage !== contentLocale) {
    throw new Error(
      `${filePath} inLanguage is ${parsed.meta.inLanguage}, expected ${contentLocale}`,
    );
  }

  return {
    ...parsed,
    contentLocale,
    routeLocale,
    fellBackToEnglish: selection.fellBackToEnglish,
  };
});

export function buildLegalJsonLd(doc: LoadedLegalDocument, pageUrl: string, homeUrl: string) {
  return {
    article: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: doc.meta.title,
      description: doc.meta.description,
      url: pageUrl,
      inLanguage: doc.meta.inLanguage,
      publisher: {
        "@type": "Organization",
        name: "Coolha Limited",
        url: "https://coolha.com",
      },
      datePublished: doc.meta.datePublished,
      dateModified: doc.meta.dateModified,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": pageUrl,
      },
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: doc.meta.home,
          item: homeUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: doc.meta.breadcrumb,
          item: pageUrl,
        },
      ],
    },
  };
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
