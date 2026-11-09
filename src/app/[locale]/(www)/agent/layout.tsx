import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { buildAlternates, toOgLocale } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "ai" })
  const alternates = buildAlternates("agent", locale)
  const description = t("meta_description")

  return {
    title: t("hero_title"),
    description,
    alternates,
    openGraph: {
      title: t("hero_title"),
      description,
      url: alternates.canonical,
      siteName: "Coolha",
      type: "website",
      locale: toOgLocale(locale),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Coolha - Web4 Agent Economy" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("hero_title"),
      description,
      images: ["/og.png"],
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
