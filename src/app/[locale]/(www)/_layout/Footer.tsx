'use client'
import { Link } from "@/i18n/navigation";
import MediaLink from "./MediaLink";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations('footer');
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-[#0a0a0b]/70">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#C8F237]/60 to-transparent" />
            <div className="mx-auto max-w-6xl px-6 py-16 lg:px-12">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {/* Media Column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="quiet-label text-xs font-semibold">{t("media")}</h3>
                        <div className="flex flex-wrap gap-2">
                            <MediaLink />
                        </div>
                    </div>

                    {/* Info Column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="quiet-label text-xs font-semibold">{t("info")}</h3>
                        <div className="flex flex-col gap-3">

                            <Link href={`/agent`} prefetch={false} className="text-sm leading-6 text-white/55 transition-colors hover:text-white">
                                {t("agent")}
                            </Link>
                            <Link href={`/rwa`} prefetch={false} className="text-sm leading-6 text-white/55 transition-colors hover:text-white">
                                {t("rwa")}
                            </Link>
                            <Link href={`/company`} prefetch={false} className="text-sm leading-6 text-white/55 transition-colors hover:text-white">
                                {t("company")}
                            </Link>
                        </div>
                    </div>

                    {/* Resources Column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="quiet-label text-xs font-semibold">{t("resources")}</h3>
                        <div className="flex flex-col gap-3">
                            <Link href={`/privacy`} prefetch={false} className="text-sm leading-6 text-white/55 transition-colors hover:text-white">
                                {t("privacy")}
                            </Link>
                            <Link href={`/terms`} prefetch={false} className="text-sm leading-6 text-white/55 transition-colors hover:text-white">
                                {t("terms")}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-14 border-t border-white/10 pt-8 text-center">
                    <p className="text-xs leading-5 text-white/40">
                        © 2026 Coolha Limited All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
