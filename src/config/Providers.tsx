'use client'

import Theme from "./Theme"
import Wagmi_Provider from "./Wagmi_Provider"

export default function Providers({ children, cookies }: { children: any, cookies: string | null }) {
  return (
    <>
      <Theme>
          <Wagmi_Provider cookies={cookies}>
            {children}
          </Wagmi_Provider>
      </Theme>
    </>
  )
}
