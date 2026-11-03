import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HomeContent from './_layout/Home';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'www' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: buildAlternates('', locale),
  };
}

export default function Page() {
  return <HomeContent />;
}
