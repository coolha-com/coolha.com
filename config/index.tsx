'use client'
import { LensProvider } from "@lens-protocol/react-web"
import { lensConfig } from "./Lens"

import { projectId, wagmiAdapter } from './Wagmi';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createAppKit } from "@reown/appkit/react";
import { mainnet, polygon, zksync, arbitrum, optimism, base, worldchain, blast, linea, scroll, xLayer } from '@reown/appkit/networks'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { ThemeProvider, useTheme } from "next-themes";


export const queryClient = new QueryClient()

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const metadata = {
    name: 'Coolha',
    description: 'Coolha Web Dapp',
    url: 'https://coolha.com',
    icons: ['https://coolha.com/favicon.ico']
}



export default function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

    const { theme } = useTheme();
    createAppKit({

        adapters: [wagmiAdapter],
        metadata: metadata,
        projectId,
        networks: [mainnet, polygon, zksync, arbitrum, optimism, base, worldchain, blast, linea, scroll, xLayer],
        defaultNetwork: polygon,
        chainImages: {
            324: '/web3/zksync.png',
            480: '/web3/world.jpg',
            81457: '/web3/blast.png',
            59_144: '/web3/linea.png',
            534_352: '/web3/scroll.png',
            196: '/web3/xLayer.png',
        },
        features: {
            onramp: false,
            swaps: false,
            analytics: true,
            email: true,
            socials: ['google', 'apple', /* 'github','farcaster','facebook','x' */],
            emailShowWallets: true,
        },
        allWallets: 'SHOW',
        themeMode: theme === 'dark' ? 'dark' : 'light',
        themeVariables: {
            '--w3m-accent': '#accf00',
        },
        featuredWalletIds: [
            'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',//metamask
            '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',//okx
            'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',//Coinbase
            '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',//Safe
            '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',//Rainbow
            '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',//Trust
        ]
    });

    return (
        < >
            <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
                <QueryClientProvider client={queryClient}>
                    <LensProvider config={lensConfig}>
                        {children}
                    </LensProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </>
    )
}


