'use client'

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function page() {
  const t = useTranslations("company");
  const businesses = [
    t("web3_dev"),
    t("rwa_solution"),
    t("ai_growth"),
    t("brand_strategy"),
  ];

  return (
    <main className="site-shell flex min-h-screen items-center px-6 py-32 md:px-12">
      <section className="glass-panel-strong mx-auto w-full max-w-4xl rounded-[2rem] p-8 sm:p-12 md:p-16">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-px w-10 bg-[#C8F237]/70" />
          <span className="quiet-label text-[11px] font-semibold">Coolha</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
          {t("intro")}
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-x-12 gap-y-3 border-t border-white/10 pt-8 sm:grid-cols-2">
          {businesses.map((name) => (
            <li key={name} className="flex min-w-0 items-start gap-3 text-base leading-7 text-white/80">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#C8F237]" aria-hidden="true" />
              <span>{name}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
          <Button asChild variant="default" size="lg" className="w-full min-w-0 px-4 text-sm font-semibold">
            <Link href={'mailto:connect@coolha.com'} target='_blank'>
              {t("contact_us")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full min-w-0 px-4 text-sm font-medium">
            <Link href={'mailto:ceo@coolha.com'} target='_blank'>
              {t("join_us")}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
