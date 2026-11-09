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
    <main className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-16">
      <h1 className="text-2xl font-medium tracking-tight text-primary sm:text-3xl">
        {t("title")}
      </h1>
      <p className="mt-6 text-base leading-7 text-muted-foreground">
        {t("intro")}
      </p>

      <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-4 border-t border-border pt-8 sm:grid-cols-2">
        {businesses.map((name) => (
          <li key={name} className="min-w-0 text-base leading-6 text-foreground">
            {name}
          </li>
        ))}
      </ul>

      <div className="mt-10 grid w-full max-w-md grid-cols-2 gap-3">
        <Button asChild variant="outline" size="lg" className="w-full min-w-0 px-2 text-sm font-medium sm:px-4">
          <Link href={'mailto:connect@coolha.com'} target='_blank'>
            {t("contact_us")}
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full min-w-0 px-2 text-sm font-medium sm:px-4">
          <Link href={'mailto:ceo@coolha.com'} target='_blank'>
            {t("join_us")}
          </Link>
        </Button>
      </div>
    </main>
  );
}
