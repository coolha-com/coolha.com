'use client'

import { LensProvider } from "@lens-protocol/react"
import { client as lensClient } from "@/lib/lens/client"
export default function Lens({ children }: any) {
    return (
        <>
            {/* Pass the PublicClient via the `client` prop for @lens-protocol/react */}
            <LensProvider client={lensClient}>
                {children}
            </LensProvider>
        </>
    )
}