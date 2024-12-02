'use client'
import { LensProvider } from "@lens-protocol/react-web"
import { lensConfig } from "./Lens"

import { projectId, wagmiAdapter } from './Wagmi';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createAppKit } from "@reown/appkit/react";
import { mainnet, polygon } from '@reown/appkit/networks'
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
        networks: [polygon, mainnet],
        defaultNetwork: polygon,
        features: {
            onramp: false,
            swaps: false,
            analytics: true,
            email: false,
            socials: [/* 'google','x','facebook','farcaster','apple' */],
            emailShowWallets: true,
        },
        allWallets: 'SHOW',
        themeMode: theme === 'light' ? 'light' : 'dark',
        themeVariables: {
            '--w3m-accent': '#accf00',
        },
        /*         featuredWalletIds: [
                    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',//metamask
                    '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',//okx
                    '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',//Safe
                ] */
    });

    return (
        <ThemeProvider >
            <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
                <QueryClientProvider client={queryClient}>
                    <LensProvider config={lensConfig}>
                        {children}
                    </LensProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </ThemeProvider>
    )
}


