'use client'

import LoadingDotsLogo from '@/gui/LoadingDotsLogo'
import { redirect } from 'next/navigation'

export default function Page() {
  redirect('/home') // 立即重定向到 /home
  return(
    <>
    <LoadingDotsLogo />
    </>
  )
}
