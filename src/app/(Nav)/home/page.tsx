'use client'
import { useTranslations } from 'next-intl'
import MediaLink from '@/app/(www)/_page/MediaLink'

export default function page() {
  const t = useTranslations('home')
  return (
    <div className='container mx-auto p-2 space-y-8 min-h-screen'>
      <div role="alert" className="alert shadow-lg max-w-3xl mx-auto">
        <span className='text-base sm:text-lg text-center'>
          {t('version_notice')}
        </span>
      </div>

      <div className='flex items-center justify-center gap-4 flex-wrap'>
        <MediaLink />
      </div>
    </div>
  )
}