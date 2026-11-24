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
    // 首页标签页只显示品牌名：en = Coolha，中文 = Coolha 酷哈（absolute 跳过 layout 的 %s 模板）
    title: { absolute: t('brand') },
    description: t('meta_description'),
    alternates: buildAlternates('', locale),
  };
}

export default function Page() {
  return <HomeContent />;
}
