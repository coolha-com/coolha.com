'use client'

import { useAppKit, useAppKitAccount, useAppKitBalance, useAppKitNetwork, useDisconnect } from '@reown/appkit/react'
import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button";

export default function Connect() {
  const t = useTranslations('web3')
  const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount()

  const { disconnect } = useDisconnect()
  const { open, close } = useAppKit()

  // 格式化地址显示
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <Button
        onClick={() => open({view: "Connect",namespace: "eip155"})}
        className="rounded-full font-bold"
      >
        {t('connect_wallet')}
      </Button>
    )
  }

  return (
    <div className="relative">
      <Button
        onClick={() => open({ view: "Account" })}
        className="rounded-full font-bold"
      >
        {address ? formatAddress(address) : t('account')}
      </Button>
    </div>
  )
}
