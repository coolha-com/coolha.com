'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type ReactNode, useEffect, useState } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { useTheme } from 'next-themes'
import { createAppKit } from '@reown/appkit/react'
import { projectId, wagmiAdapter } from './wagmi'
import { mainnet, polygon, base, arbitrum, optimism, lens,  } from '@reown/appkit/networks'

// Set up queryClient
export const queryClient = new QueryClient()

if (!projectId) {
    throw new Error('Project ID is not defined')
}
export const metadata = {
    name: 'Coolha',
    description: 'Coolha Web Dapp',
    url: 'https://coolha.com',
    icons: ['https://coolha.com/favicon.ico'],
    termsConditionsUrl: "https://docs.coolha.com/docs/apps/terms",
    privacyPolicyUrl: "https://docs.coolha.com/docs/apps/privacy",
}
//const { theme } = useTheme();
const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [mainnet, polygon, base, arbitrum, optimism, lens, ],
    defaultNetwork: mainnet,
    allowUnsupportedChain: false,
    chainImages: {
        232: '/web3/lens.png',
        8453: '/web3/base.png',
    },
    metadata: metadata,
    themeMode: 'dark',
    themeVariables: {
        '--w3m-accent': '#accf00',
    },
    features: {
        analytics: true,
        emailShowWallets: false,
        legalCheckbox: true,
    },
    enableWalletGuide: false,
    enableCoinbase: false, // true by default
    allWallets: 'SHOW',
    featuredWalletIds: [
        '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
        '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
        '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',
    ]
})

export default function Wagmi_Provider({ children, cookies }: { children: ReactNode; cookies: string | null }) {



    return (
        <>
            <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        </>
    )
}
