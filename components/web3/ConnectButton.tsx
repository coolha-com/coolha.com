'use client'

import { useAppKit, useAppKitAccount, useAppKitBalance, useAppKitNetwork, useDisconnect } from '@reown/appkit/react'

export default function Connect() {
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
        onClick={() => open()}
        className="btn btn-primary md:min-w-full"
      >
        连接钱包
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => open({ view: "Account" })}
        className="btn btn-primary"
      >
        {address ? formatAddress(address) : '账户'}
      </button>
    </div>
  )
}