'use client'
import MediaLink from '@/app/(www)/_page/MediaLink'

export default function page() {
  return (
    <div className='container mx-auto p-2 space-y-8 min-h-screen'>
      <div role="alert" className="alert shadow-lg max-w-3xl mx-auto">
        <span className='text-base sm:text-lg text-center'> 
          Coolha正在开发中，目前处于v0.1-alpha版本，
          我们正在努力开发中，敬请期待。
        </span>
      </div>

      <div className='flex items-center justify-center gap-4 flex-wrap'>
        <MediaLink />
      </div>
    </div>
  )
}