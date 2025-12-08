'use client'

import Theme from "./Theme"
import Lens from "./Lens"
import Wagmi_Provider from "./Wagmi_Provider"

export default function Providers({ children, cookies }: { children: any, cookies: string | null }) {
  return (
    <>
      <Theme>
        <Lens>
          <Wagmi_Provider cookies={cookies}>
            {children}
          </Wagmi_Provider>
        </Lens>
      </Theme>
    </>
  )
}
