import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('aios');

  return {
    title: t('page_title') || 'AI Company Operating System | Coolha',
    description: t('page_description') || 'Automate your entire business with AI agents. One-person company OS powered by Web3 and AI. AIOS enables solo founders to build scalable businesses with AI employees.',
    keywords: ['AIOS', 'AI Company OS', 'Web3 automation', 'one-person company', 'AI agents', 'business automation', 'crypto infrastructure'],
    openGraph: {
      title: t('page_title') || 'AI Company Operating System | Coolha',
      description: t('page_description') || 'Automate your entire business with AI agents',
      type: 'website',
      url: 'https://coolha.com/aios',
      images: [
        {
          url: '/logo/logo.png',
          width: 1200,
          height: 630,
          alt: 'AIOS - AI Company Operating System',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('page_title') || 'AI Company Operating System | Coolha',
      description: t('page_description') || 'One-person company OS powered by Web3 and AI',
      images: ['/logo/logo.png'],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "AIOS - AI Company Operating System",
            description: "AI-powered automation platform that enables one person to run a fully operational company using AI agents combined with Web3 infrastructure",
            url: "https://coolha.com/aios",
            image: "/logo/logo.png",
            applicationCategory: "BusinessApplication",
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "USD",
              lowPrice: "29",
              highPrice: "299",
              offerCount: 3
            },
            featureList: [
              "AI CEO Agent",
              "AI Marketing Officer",
              "AI Sales Officer",
              "AI CTO",
              "AI CFO",
              "Web3 Infrastructure",
              "Crypto Payments (USDC)",
              "Base Chain Integration",
              "Workflow Automation"
            ],
            creator: {
              "@type": "Organization",
              name: "Coolha",
              url: "https://coolha.com"
            },
            datePublished: "2025-08-26",
            inLanguage: ["en", "zh-Hans", "zh-Hant"]
          }),
        }}
      />
    </>
  );
}
