'use client'

import { useTranslations } from "next-intl"

export default function Page() {
    const t = useTranslations("ai")

    return (
        <section className="min-h-screen bg-base-100 px-6 py-24 text-base-content">
            <div className="mx-auto flex max-w-5xl flex-col gap-6">
                <h1 className="text-4xl font-bold tracking-tight text-[#C0E218] md:text-6xl">
                    {t("title")}
                </h1>
                <p className="max-w-3xl text-lg leading-relaxed text-base-content/80 md:text-2xl">
                    {t("description")}
                </p>
            </div>
        </section>
    )
}
