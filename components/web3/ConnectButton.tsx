'use client'

import { useAppKit, useAppKitAccount, useAppKitBalance, useAppKitNetwork, useDisconnect } from '@reown/appkit/react'
import { useTranslations } from 'next-intl'

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
      <button
        onClick={() => open({view: "Connect",namespace: "eip155"})}
        className="btn btn-primary "
      >
        {t('connect_wallet')}
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => open({ view: "Account" })}
        className="btn btn-primary"
      >
        {address ? formatAddress(address) : t('account')}
      </button>
    </div>
  )
}