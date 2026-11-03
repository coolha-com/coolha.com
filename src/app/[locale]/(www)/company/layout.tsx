import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { buildAlternates, toOgLocale } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'company' })
    const alternates = buildAlternates('company', locale)
    const title = t('title')
    const description = t('meta_description')

    return {
        title: {
            absolute: title,
        },
        description,
        alternates,
        openGraph: {
            title,
            description,
            url: alternates.canonical,
            siteName: 'Coolha',
            type: 'website',
            locale: toOgLocale(locale),
            images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Coolha Limited' }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/og.png'],
        },
    }
}

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" bg-base-100 pt-20">
            {children}
        </div>
    )
}
