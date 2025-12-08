'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type ReactNode, useEffect, useState } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { useTheme } from 'next-themes'
// Set up queryClient
export const queryClient = new QueryClient()

export const metadata = {
    name: 'Coolha',
    description: 'Coolha Web Dapp',
    url: 'https://coolha.com',
    icons: ['https://coolha.com/favicon.ico'],
    termsConditionsUrl: "https://docs.coolha.com/docs/apps/terms",
    privacyPolicyUrl: "https://docs.coolha.com/docs/apps/privacy",
}
export default function Wagmi_Provider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const [wagmiConfig, setWagmiConfig] = useState<Config | null>(null)
    const [appkitReady, setAppkitReady] = useState(false)
    const { theme } = useTheme();
    useEffect(() => {
        let mounted = true
            ; (async () => {
                const { projectId, wagmiAdapter } = await import('./wagmi')
                if (!projectId) return
                const networksModule = await import('@reown/appkit/networks')
                const { mainnet, base, lens, polygon, arbitrum, optimism, worldchain, zksync, linea, scroll } = networksModule
                const { createAppKit } = await import('@reown/appkit/react')
                if (typeof window !== 'undefined') {
                    // 防止重复初始化
                    ; (window as any).__APPKIT_INIT__ = (window as any).__APPKIT_INIT__ || false
                    if (!(window as any).__APPKIT_INIT__) {
                        (window as any).__APPKIT_INIT__ = true
                        createAppKit({
                            adapters: [wagmiAdapter],
                            projectId,
                            networks: [mainnet, base, lens, polygon, arbitrum, optimism, worldchain, zksync, linea, scroll],
                            defaultNetwork: mainnet,
                            chainImages: {
                                232: '/web3/lens.png',
                                324: '/web3/zksync.png',
                                480: '/web3/world.jpg',
                                81457: '/web3/blast.png',
                                59_144: '/web3/linea.png',
                                534_352: '/web3/scroll.png',
                                196: '/web3/xLayer.png',
                            },
                            metadata: metadata,
                            themeMode: theme === 'dark' ? 'dark' : 'light',
                            themeVariables: {
                                '--w3m-accent': '#accf00',
                            },
                            features: {
                                analytics: true,
                                emailShowWallets: false,
                                legalCheckbox: true,
                            },
                            enableWalletGuide: false,
                            allWallets: 'SHOW',
                            featuredWalletIds: [
                                '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
                                'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
                                'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
                                '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
                                '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',
                            ]
                        })
                        if (mounted) setAppkitReady(true)
                    } else {
                        if (mounted) setAppkitReady(true)
                    }
                }
                const cfg = wagmiAdapter.wagmiConfig as Config
                if (mounted) setWagmiConfig(cfg)
            })()
        return () => { mounted = false }
    }, [theme])
    return (
        wagmiConfig && appkitReady ? (
            <WagmiProvider config={wagmiConfig} initialState={cookieToInitialState(wagmiConfig as Config, cookies)}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        ) : null
    )
}
