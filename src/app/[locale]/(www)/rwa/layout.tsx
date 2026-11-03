import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildAlternates, toOgLocale } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'rwa' });
  const alternates = buildAlternates('rwa', locale);
  const title = t('page_title');
  const description = t('page_description');

  return {
    title,
    description,
    alternates,
    keywords: ['RWA', 'real world assets', 'tokenization', 'blockchain assets', 'asset liquidity', 'fractional ownership', 'crypto infrastructure'],
    openGraph: {
      title,
      description,
      type: 'website',
      url: alternates.canonical,
      siteName: 'Coolha',
      locale: toOgLocale(locale),
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: 'Coolha RWA - Real World Assets Tokenization',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og.png'],
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
            name: "RWA Platform - Real World Assets Tokenization",
            description: "Blockchain-based platform for tokenizing real-world assets including real estate, commodities, bonds, stocks, and carbon credits",
            url: "https://coolha.com/rwa",
            image: "/logo/logo.png",
            applicationCategory: "FinanceApplication",
            offers: {
              "@type": "Offer",
              description: "Enterprise and custom pricing available",
              url: "https://coolha.com/rwa"
            },
            featureList: [
              "Asset Tokenization",
              "Fractional Ownership",
              "Blockchain Transparency",
              "Smart Contract Automation",
              "P2P Settlement",
              "Liquidity Unlocking",
              "Real Estate Support",
              "Commodity Support",
              "Financial Asset Support"
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
