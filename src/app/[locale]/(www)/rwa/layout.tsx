import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('rwa');

  return {
    title: t('page_title') || 'Real World Assets Tokenization Platform | Coolha',
    description: t('page_description') || 'Tokenize real-world assets on blockchain. Unlock liquidity for real estate, commodities, bonds, and more. Coolha RWA platform enables fractional ownership and transparent asset management.',
    keywords: ['RWA', 'real world assets', 'tokenization', 'blockchain assets', 'asset liquidity', 'fractional ownership', 'crypto infrastructure'],
    openGraph: {
      title: t('page_title') || 'Real World Assets Tokenization Platform | Coolha',
      description: t('page_description') || 'Tokenize real-world assets and unlock liquidity on blockchain',
      type: 'website',
      url: 'https://coolha.com/rwa',
      images: [
        {
          url: '/logo/logo.png',
          width: 1200,
          height: 630,
          alt: 'Coolha RWA - Real World Assets Tokenization',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('page_title') || 'Real World Assets Tokenization Platform | Coolha',
      description: t('page_description') || 'Blockchain-based RWA tokenization platform',
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
