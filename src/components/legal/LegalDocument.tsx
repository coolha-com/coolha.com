import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import { buildLegalJsonLd, jsonLdScript, loadLegalDocument, type LegalDocId } from "@/lib/legal";
import { SITE_URL, buildAlternates, toOgLocale } from "@/lib/seo";

export async function legalMetadata(doc: LegalDocId, locale: string): Promise<Metadata> {
  const loaded = loadLegalDocument(doc, locale);
  const alternates = buildAlternates(doc, loaded.routeLocale);

  return {
    title: loaded.meta.title,
    description: loaded.meta.description,
    alternates,
    openGraph: {
      title: loaded.meta.title,
      description: loaded.meta.description,
      url: alternates.canonical,
      type: "article",
      siteName: "Coolha",
      locale: toOgLocale(loaded.contentLocale),
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: loaded.meta.ogAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: loaded.meta.title,
      description: loaded.meta.description,
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function LegalDocument({ doc, locale }: { doc: LegalDocId; locale: string }) {
  const loaded = loadLegalDocument(doc, locale);
  const alternates = buildAlternates(doc, loaded.routeLocale);
  const pageUrl = alternates.canonical;
  const homeUrl = `${SITE_URL}/${loaded.routeLocale}`;
  const structured = buildLegalJsonLd(loaded, pageUrl, homeUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(structured.article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(structured.breadcrumb) }}
      />
      <LegalLayout
        key={`${loaded.routeLocale}-${loaded.contentLocale}`}
        lang={loaded.contentLocale}
        title={loaded.meta.title}
        breadcrumbLabel={loaded.meta.breadcrumb}
        homeLabel={loaded.meta.home}
        tocLabel={loaded.meta.onThisPage}
        effectiveLabel={loaded.meta.effectiveLabel}
        lastUpdatedLabel={loaded.meta.lastUpdatedLabel}
        effectiveDate={loaded.meta.effectiveDate}
        lastUpdated={loaded.meta.lastUpdated}
        breadcrumbAria={loaded.meta.breadcrumbAria}
        tocAria={loaded.meta.tocAria}
        toc={loaded.toc}
        html={loaded.html}
      />
    </>
  );
}
