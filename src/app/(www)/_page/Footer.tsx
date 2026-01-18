'use client'
import Link from "next/link";
import MediaLink from "./MediaLink";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations('footer');
    return (
        <footer className="bg-background border-t">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Media Column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold leading-6 text-foreground">{t("media")}</h3>
                        <div className="flex flex-wrap gap-2">
                            <MediaLink />
                        </div>
                    </div>

                    {/* Info Column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold leading-6 text-foreground">{t("info")}</h3>
                        <div className="flex flex-col gap-3">
                            <Link href={`/company`} prefetch={false} className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                                {t("company")}
                            </Link>
                            <Link href={`https://link3.to/coolha`} target='_blank' className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                                {t("contact")}
                            </Link>
                            <Link href={`https://coolha-com.larksuite.com/base/Uq2HbmW8hasT3ksO7cquMgFWs2w?table=tblTSPWUJqLQjdTI&view=vewOlmHa88`} target='_blank' className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                                {t("feedback")}
                            </Link>
                        </div>
                    </div>

                    {/* Resources Column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold leading-6 text-foreground">{t("resources")}</h3>
                        <div className="flex flex-col gap-3">
                            <Link href={`https://docs.coolha.com`} target='_blank' className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                                {t("docs")}
                            </Link>
                            <Link href="https://docs.coolha.com/docs/apps/privacy" target='_blank' className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                                {t("privacy")}
                            </Link>
                            <Link href="https://docs.coolha.com/docs/apps/terms" target='_blank' className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                                {t("terms")}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-border pt-8 text-center">
                    <p className="text-xs leading-5 text-muted-foreground">
                        © 2025 Coolha Limited All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
