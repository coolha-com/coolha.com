
import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import Theme from "@/config/Theme";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });


export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('www')
  const Title = t('title')

  return {
    title: {
      template: `%s | ${Title}`,
      default: Title,
    },
    description: "coolha.com, Coolha is a decentralized social application built on Lens Protocol / Lens Chain",
    metadataBase: new URL('https://coolha.com'),
    icons: {
      icon: 'favicon.ico',
      shortcut: '/shortcut-icon.png',
      apple: '/apple-icon.png',
    },
    manifest: '/manifest.json',

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




export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const locale = await getLocale();
  const messages = (await import(`../i18n/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning className={`font-sans ${inter.variable}`}>
      <head>

        <meta name="talentapp:project_verification" content="3b8c0a3f9992f43448334d9ad892606045b08bb7e5b6a1abb0b31d6acdae4bee2cef56cf646f1ec2c19298f251d6af3229056d828568fd812b331c12e1cfd301"></meta>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
          <Theme>
            {children}
          </Theme>
        </NextIntlClientProvider>


        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Coolha Limited",
              alternateName: "酷哈公司",
              url: "https://coolha.com",
              description:
                "Web3 blockchain marketing, DApp development, and smart contract solutions",
              sameAs: ["https://x.com/coolha_com", "https://github.com/coolha-com", "https://www.linkedin.com/company/coolha/", "https://farcaster.xyz/coolha"],
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
                  name: "What services does Coolha provide?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Coolha provides Web3 marketing strategy, DApp development, smart contract development, NFT brand marketing, and decentralized application development.",
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
