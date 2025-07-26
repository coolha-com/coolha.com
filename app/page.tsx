'use client'
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const t =  useTranslations();

  return (
    <>
      <Link href={`/about`} className=" btn btn-primary">{t('关于')}</Link>
    </>
  );
}
