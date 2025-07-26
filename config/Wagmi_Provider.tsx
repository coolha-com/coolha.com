'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit, useAppKitTheme } from '@reown/appkit/react'
import { mainnet, base, lens, polygon, arbitrum, optimism, worldchain, zksync, linea, scroll } from '@reown/appkit/networks'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { projectId, wagmiAdapter } from './wagmi'
import { useTheme } from 'next-themes'

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
// Create the modal


export default function Wagmi_Provider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
    const { theme } = useTheme();
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
            legalCheckbox: true,//启用或禁用服务条款和/或隐私政策复选框
        },
        enableWalletGuide: false,//启用或禁用钱包指南文本
        allWallets: 'SHOW',//在 AppKit 上显示“所有钱包”按钮。
        featuredWalletIds: [
            '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',//okx
            'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',//metamask
            'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',//Coinbase
            '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',//Rainbow
            '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',//Safe
            //'4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',//Trust
        ]
    })
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}
