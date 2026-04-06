import type { Metadata } from 'next'
import ShopClient from './shop-client'

export const metadata: Metadata = {
  title: 'Coolha Shop | 品牌周边购买',
  description: '使用 EVM 钱包完成 x402 风格支付的品牌周边购买页。',
}

export default function ShopPage() {
  return <ShopClient />
}
