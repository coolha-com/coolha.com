import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import Providers from "@/config/Providers";
import { headers } from 'next/headers'
import Wagmi_Provider from "@/config/Wagmi_Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    template: '%s | Coolha',
    default: 'Coolha',
  },
  description: "coolha.com, Coolha is a decentralized social application built on Lens Protocol / Lens Chain",
  icons: {
    icon: '/logo/logo.png',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie')
  const locale = await getLocale();
  const messages = (await import(`../i18n/${locale}.json`)).default;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Wagmi_Provider cookies={cookies}>
              {children}
            </Wagmi_Provider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
