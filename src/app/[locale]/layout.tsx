import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('www')
  const Title = t('title')
  const locale = await getLocale()

  return {
    title: {
      template: `%s | ${Title}`,
      default: Title,
    },
    description: "Coolha: Web3 marketing, DApp development, AI-powered blockchain applications, and real-world asset tokenization. Empower creators, brands, and organizations with blockchain infrastructure.",
    metadataBase: new URL('https://coolha.com'),
    alternates: {
      canonical: `https://coolha.com/${locale}`,
      languages: {
        'en': 'https://coolha.com/en',
        'zh-Hans': 'https://coolha.com/zh-Hans',
        'zh-Hant': 'https://coolha.com/zh-Hant',
        'x-default': 'https://coolha.com/en',
      },
    },
    openGraph: {
      title: Title,
      description: "Web3 marketing, DApp development, AI-powered blockchain applications, and RWA tokenization platform",
      url: 'https://coolha.com',
      siteName: 'Coolha',
      images: [
        {
          url: '/logo/logo.png',
          width: 1200,
          height: 630,
          alt: 'Coolha - Web3 Infrastructure Platform',
          type: 'image/png',
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: Title,
      description: "Web3 marketing, DApp development, AI-powered blockchain applications, and RWA tokenization",
      images: ['/logo/logo.png'],
      creator: '@coolha_com',
      site: '@coolha_com',
    },
    icons: {
      icon: 'favicon.ico',
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
              description: "Web3 blockchain marketing, DApp development, AI-powered blockchain applications, and real-world asset tokenization solutions",
              sameAs: ["https://x.com/coolha_com", "https://github.com/coolha-com", "https://www.linkedin.com/company/coolha/", "https://farcaster.xyz/coolha"],
              foundingDate: "2025-08-26",
              contactPoint: {
                "@type": "ContactPoint",
                "telephone": "+852-XXXX-XXXX",
                "contactType": "Sales",
                "email": "cs@coolha.com",
                "areaServed": "Worldwide",
                "availableLanguage": ["en", "zh-Hans", "zh-Hant"],
              },
              knowsAbout: ["Web3", "Blockchain", "DApp Development", "Smart Contracts", "Cryptocurrency", "AI Automation", "Real World Assets", "Tokenization"],
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
                    "text": "Coolha is a Web3 infrastructure company providing blockchain marketing, DApp development, AI-powered blockchain applications, and real-world asset (RWA) tokenization solutions.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "What is Coolha AI?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Coolha AI focuses on using agents to execute on-chain transactions and handle on-chain operations on behalf of users.",
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
                    "text": "Coolha provides Web3 marketing strategy, DApp development, smart contract development, NFT brand marketing, AI-powered blockchain applications, RWA tokenization infrastructure, and decentralized application development.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Is Coolha AI suitable for solo founders?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Coolha AI is suitable for solo founders, independent developers, creators, and digital operators who want agents to help execute on-chain workflows.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "How does Web3 automation work in Coolha?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Coolha uses AI agents orchestrated through the OpenClaw runtime, with blockchain infrastructure (Base chain, USDC, x402 Protocol) to automate business processes and enable crypto-native payments and settlements.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "What blockchain network does Coolha use?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Coolha primarily uses Base Chain, an L2 blockchain by Coinbase, for its infrastructure. Base provides low gas fees, native USDC support, and strong builder ecosystem.",
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
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://coolha.com"
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Company",
                  item: "https://coolha.com/company"
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "AI",
                  item: "https://coolha.com/ai"
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "RWA",
                  item: "https://coolha.com/rwa"
                }
              ]
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
