"use client";

import { useEffect, useRef, useState } from "react";
import {
    createOkxSwapWidget,
    ProviderType,
    OkxEvents,
    OkxEventHandler,
    IFeeConfig,
    TradeType,
    EthereumProvider
} from "@okxweb3/dex-widget";
import { useTheme } from "next-themes";
enum THEME {
    LIGHT = 'light',
    DARK = 'dark',
}
export default function OkxWidget() {
    const widgetRef = useRef<HTMLDivElement>(null); // 明确指定类型为 HTMLDivElement
    const { theme } = useTheme();

    useEffect(() => {
        const okxTheme = theme === "light" ? THEME.LIGHT : THEME.DARK;
        const params = {
            width: 374,//>767px 显示为 450 px， <768 px 显示为 100%， < 375 px 则显示为 375 px。
            theme: okxTheme,
            lang: 'zh_cn',
            tradeType: TradeType.AUTO,//交易的类型，可以是“swap”、“bridge”，或“auto”。注意：“自动”包含“swap”和“bridge”
            chainIds: ["137"],
            feeConfig: feeConfig,
            tokenPair: {
                fromChain: 137, //ETH
                toChain: 137, // ETH
                fromToken: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
                toToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // POL
            },
            bridgeTokenPair: {
                fromChain: 1, //ETH
                toChain: 137, // Polygon
                fromToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // ETH
                toToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // POL
            },
            providerType: ProviderType.EVM, // 使用 ProviderType 而不是字符串
            baseUrl: 'https://www.okx.com'
        };

        const provider = window.ethereum as unknown as EthereumProvider;
        if (!provider) {
            console.error("未检测到钱包提供方 (window.ethereum)");
            return;
        }

        // 确保 widgetRef.current 不为 null
        if (widgetRef.current) {
            // 初始化 Widget
            const instance = createOkxSwapWidget(widgetRef.current, {
                params,
                provider,
                listeners: [
                    {
                        event: OkxEvents.ON_CONNECT_WALLET, // 假设这是一个有效的事件  event: 'ON_CONNECT_WALLET'
                        handler: () => {
                            provider.enable();
                        },
                    },
                ],
            });


            return () => {
                instance.destroy();
            };
        }
    }, [theme]);// 添加 theme 作为依赖项，确保主题变化时重新初始化

    return <div ref={widgetRef} />;
}

const feeConfig: IFeeConfig = {
    1: {// Ethereum chainId
        feePercent: 3,
        referrerAddress: {
            '0xf3d7de68985ab5e92841ce7bc335cfe0c04cab4a': { feePercent: 3 } // 这里的地址改成对应链的地址
        },
    },
    137: { // Polygon 
        feePercent: 3,
        referrerAddress: {
            '0xf3d7de68985ab5e92841ce7bc335cfe0c04cab4a': { feePercent: 3 } // 这里的地址改成对应链的地址
        },
    },
    324: { // zkSync Era 
        feePercent: 3,
        referrerAddress: {
            '0xf3d7de68985ab5e92841ce7bc335cfe0c04cab4a': { feePercent: 3 } // 这里的地址改成对应链的地址
        },
    },
    56: { // BNB 
        feePercent: 3,
        referrerAddress: {
            '0xf3d7de68985ab5e92841ce7bc335cfe0c04cab4a': { feePercent: 3 } // 这里的地址改成对应链的地址
        },
    },
    8453: { // Base 
        feePercent: 3,
        referrerAddress: {
            '0xf3d7de68985ab5e92841ce7bc335cfe0c04cab4a': { feePercent: 3 } // 这里的地址改成对应链的地址
        },
    },
    10: { // Optimism 
        feePercent: 3,
        referrerAddress: {
            '0xf3d7de68985ab5e92841ce7bc335cfe0c04cab4a': { feePercent: 3 } // 这里的地址改成对应链的地址
        },
    },
    42161: { // Arbitrum 
        feePercent: 3,
        referrerAddress: {
            '0xf3d7de68985ab5e92841ce7bc335cfe0c04cab4a': { feePercent: 3 } // 这里的地址改成对应链的地址
        },
    },
    43114: { // Avalanche C 
        feePercent: 3,
        referrerAddress: {
            '0xf3d7de68985ab5e92841ce7bc335cfe0c04cab4a': { feePercent: 3 } // 这里的地址改成对应链的地址
        },
    },
    81457: { // Blast 
        feePercent: 3,
        referrerAddress: {
            '0xf3d7de68985ab5e92841ce7bc335cfe0c04cab4a': { feePercent: 3 } // 这里的地址改成对应链的地址
        },
    },
    196: { // X layer 
        feePercent: 3,
        referrerAddress: {
            '0xf3d7de68985ab5e92841ce7bc335cfe0c04cab4a': { feePercent: 3 } // 这里的地址改成对应链的地址
        },
    },
    534352: { // Scroll 
        feePercent: 3,
        referrerAddress: {
            '0xf3d7de68985ab5e92841ce7bc335cfe0c04cab4a': { feePercent: 3 } // 这里的地址改成对应链的地址
        },
    },
    59144: { // Linea 
        feePercent: 3,
        referrerAddress: {
            '0xf3d7de68985ab5e92841ce7bc335cfe0c04cab4a': { feePercent: 3 } // 这里的地址改成对应链的地址
        },
    },
    5000: { // Mantle 
        feePercent: 3,
        referrerAddress: {
            '0xf3d7de68985ab5e92841ce7bc335cfe0c04cab4a': { feePercent: 3 } // 这里的地址改成对应链的地址
        },
    },
    /* 501: { // solana chainId
        referrerAddress: {
            '11111111111111111111111111111111': { //solana SOL 
                account: '6AqE1j5mggaazdpL2pr8fzVTSd7B9LzUdcqCLnhUTpwD',
                feePercent: 3,
            },
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: { //solana USDC 
                account: '6AqE1j5mggaazdpL2pr8fzVTSd7B9LzUdcqCLnhUTpwD', //solana USDC token account that receives the fee
                feePercent: 3,
            },
            JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN: { //solana JUP 
                account: '6AqE1j5mggaazdpL2pr8fzVTSd7B9LzUdcqCLnhUTpwD', //solana JUP token account that receives the fee
                feePercent: 3,
            },
        },
    }, */
}