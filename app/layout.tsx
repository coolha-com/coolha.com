import "./globals.css";

import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


import { headers } from "next/headers";
import ContextProvider from "@/config";
import Link from "next/link";
import { ThemeProvider } from "next-themes";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: '%s | Coolha',
    default: 'Coolha',
  },
  description: "coolha.com, Coolha is a decentralized social application built on Lens Protocol",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ auth, children, }:any) {
  const cookies = headers().get('cookie')
  return (
    <html lang="zh_CN">
      <head>
        <meta charSet="utf-8" />
        <meta property="twitter:image" content="/twitter-image" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Coolha:Lens Protocol Web3 Content social" />
        <meta property="twitter:description" content="Lens Protocol Web3 Content social" />
        <meta property="description" content="基于Lens协议构建,为中文用户构建,内容社交,社群聊天,放大创作者经济,灵感保证原创,Web3优质内容的去中心化平台" />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:site_name" content="Coolha Dapp:基于Lens协议构建,为中文用户设计的去中心化平台" />
        <meta property="og:title" content="Coolha"></meta>
        <meta property="og:description" content="基于Lens协议构建,为中文用户构建,内容社交,社群聊天,放大创作者经济,灵感保证原创,Web3优质内容的去中心化平台" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-D5SLP9N49Y"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-D5SLP9N49Y');
            `,
          }}
        />
        {/*  <meta property="og:url" content="Canonical link preview URL"></meta> */}
      </head>

      <body className={`${inter.className} bg-base-200 `}>


        <ThemeProvider  attribute="data-theme">
          <ContextProvider cookies={cookies}  >

            {children}
            <div>{auth}</div>

          </ContextProvider>
        </ThemeProvider>





        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
