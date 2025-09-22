'use client'

import { redirect } from 'next/navigation'

export default function Page() {
  redirect('/about') // 立即重定向到 /home
  return(
    <>
    </>
  )
}
