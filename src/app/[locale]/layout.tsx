import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { SITE_URL, buildAlternates, toOgLocale } from '@/lib/seo';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'www' });
  const Title = t('title');
  const description = t('meta_description');
  const alternates = buildAlternates('', locale);

  return {
    title: {
      template: `%s | ${Title}`,
      default: Title,
    },
    description,
    metadataBase: new URL(SITE_URL),
    alternates,
    openGraph: {
      title: Title,
      description,
      url: alternates.canonical,
      siteName: 'Coolha',
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: 'Coolha - Web3 Infrastructure Platform',
          type: 'image/png',
        },
      ],
      locale: toOgLocale(locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: Title,
      description,
      images: ['/og.png'],
      creator: '@coolha_com',
      site: '@coolha_com',
    },
    icons: {
      icon: [
        { url: '/icon.png', sizes: '32x32', type: 'image/png' },
        { url: '/logo/icon192.png', sizes: '192x192', type: 'image/png' },
      ],
      shortcut: '/shortcut-icon.png',
      apple: '/apple-icon.png',
    },
    manifest: '/manifest.json',
  }
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    viewportFit: 'cover',
    themeColor: '#C0E218',
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh-Hans' }, { locale: 'zh-Hant' }];
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const messages = (await import(`../../i18n/${locale}.json`)).default;

  return (
    <html lang={locale} className={`font-sans ${inter.variable} dark`}>
      <head>
        <meta name="talentapp:project_verification" content="3b8c0a3f9992f43448334d9ad892606045b08bb7e5b6a1abb0b31d6acdae4bee2cef56cf646f1ec2c19298f251d6af3229056d828568fd812b331c12e1cfd301"></meta>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Coolha Limited",
              alternateName: "酷哈公司",
              url: "https://coolha.com",
              description: "Coolha builds Web3 agent infrastructure: on-chain AI agents, ERC-8004 agent identity, x402 programmable payments, and real-world asset (RWA) tokenization.",
              sameAs: ["https://x.com/coolha_com", "https://github.com/coolha-com", "https://www.linkedin.com/company/coolha/", "https://farcaster.xyz/coolha"],
              foundingDate: "2025-08-26",
              contactPoint: {
                "@type": "ContactPoint",
                "contactType": "Sales",
                "email": "connect@coolha.com",
                "areaServed": "Worldwide",
                "availableLanguage": ["en", "zh-Hans", "zh-Hant"],
              },
              knowsAbout: ["Web3", "Blockchain", "AI Agents", "ERC-8004", "x402", "Smart Contracts", "Real World Assets", "Tokenization"],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  "name": "What is Coolha?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Coolha is a Web3 infrastructure company building on-chain AI agent infrastructure, including agent identity (ERC-8004), programmable agent payments (x402), and real-world asset (RWA) tokenization.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "What is Coolha AI?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Coolha AI is a suite of on-chain agent tools: AI chat for on-chain analysis and contract auditing, an agent assistant that executes transactions and manages wallets, an agent factory for minting agents with verifiable on-chain reputation, an agent marketplace, and token-based AI compute APIs.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "What are Real World Assets (RWA)?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Real World Assets are tangible and intangible assets such as real estate, commodities, bonds, stocks, and carbon credits that are tokenized on blockchain for improved liquidity and transparency.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "What services does Coolha provide?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Coolha provides Web3 infrastructure development (DApps, EVM smart contracts, wallet integration), on-chain AI agent tools and marketplaces, token-based AI compute APIs, RWA tokenization solutions, and brand strategy and business consulting for Web3.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Who can use Coolha AI?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Coolha AI is built for creators, brands, communities, organizations, and independent operators who want agents to manage on-chain workflows — including AI chat for analysis and auditing, an agent assistant for wallet and transaction execution, an agent factory for issuing agents with on-chain identity, and an agent marketplace.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "How does Web3 automation work in Coolha?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Coolha runs AI agents on EVM-compatible blockchain infrastructure, combining on-chain agent identity (ERC-8004), stablecoin settlement (USDC/USDT), and the x402 protocol so agents can call paid APIs and settle transactions programmatically.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "What blockchain network does Coolha use?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Coolha builds on EVM-compatible chains, so agents can interact with the same contracts, wallets, and token standards used across the Ethereum ecosystem.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "How can RWA tokenization benefit my business?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "RWA tokenization unlocks liquidity through asset fractionalization, provides transparency via immutable blockchain records, reduces settlement friction with P2P transactions, and lowers transaction fees compared to traditional finance.",
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Coolha",
              url: SITE_URL,
              inLanguage: ["en", "zh-Hans", "zh-Hant"],
              publisher: {
                "@type": "Organization",
                name: "Coolha Limited",
                url: SITE_URL,
              },
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        ) : null}
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
