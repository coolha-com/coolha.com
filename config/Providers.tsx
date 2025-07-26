'use client'

import Theme from "./Theme"

export default function Providers({ children }: any) {
  return (
    <>
      <Theme>
        {children}
      </Theme>
    </>
  )
}