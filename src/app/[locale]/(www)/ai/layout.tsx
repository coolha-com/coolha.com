import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "ai" })

  return {
    title: `${t("hero_title")} | Coolha`,
    description: t("dawn_p1"),
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
