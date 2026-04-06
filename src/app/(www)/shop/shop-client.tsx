'use client'

import { useEffect, useMemo, useState } from 'react'
import { formatUnits } from 'viem'
import { x402Client } from '@x402/core/client'
import { x402HTTPClient } from '@x402/core/http'
import { ExactEvmScheme } from '@x402/evm/exact/client'
import { toClientEvmSigner } from '@x402/evm'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'
import Image from 'next/image'
import Connect from '@/components/web3/ConnectButton'
import { Button } from '@/components/ui/button'

type Product = {
  id: string
  name: string
  description: string
  image: string
  priceUsd: number
  tags: string[]
}

type CatalogResponse = {
  products: Product[]
  currency: string
}

type PaymentRequiredResponse = {
  code?: 'X402_PAYMENT_REQUIRED'
  message?: string
  payment?: {
    network: string
    chainId: number
    recipient: `0x${string}`
    asset: 'usdc'
    amountUsdc: string
    totalUsd: number
  }
  x402?: {
    version: string
    proofHeader: string
    settleHeader?: string
  }
}

type OrderResponse = {
  message: string
  order: {
    orderId: string
    amountUsdc: string
    totalUsd: number
    network: string
    items: { productId: string; quantity: number; name: string }[]
  }
}

const BASE_CHAIN_ID = 8453

export default function ShopClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [flowLog, setFlowLog] = useState<string[]>([])
  const [order, setOrder] = useState<OrderResponse['order'] | null>(null)
  const [settleInfo, setSettleInfo] = useState<{ transaction?: string; payer?: string } | null>(null)
  const [orderUsdcDecimals, setOrderUsdcDecimals] = useState(6)

  const { address, isConnected, chainId } = useAccount()
  const { data: walletClient } = useWalletClient({ chainId: BASE_CHAIN_ID })
  const publicClient = usePublicClient({ chainId: BASE_CHAIN_ID })
  const xClient = useMemo(() => {
    if (!walletClient?.account || !publicClient) return null
    const signer = toClientEvmSigner(
      {
        address: walletClient.account.address,
        signTypedData: async (message) => walletClient.signTypedData(message as never),
      },
      {
        readContract: publicClient.readContract,
      },
    )

    const core = new x402Client().register(`eip155:${BASE_CHAIN_ID}`, new ExactEvmScheme(signer))
    return new x402HTTPClient(core)
  }, [publicClient, walletClient])

  useEffect(() => {
    void fetch('/api/shop/catalog')
      .then((res) => res.json() as Promise<CatalogResponse>)
      .then((data) => {
        setProducts(data.products)
        const initial: Record<string, number> = {}
        data.products.forEach((p) => {
          initial[p.id] = 0
        })
        setCart(initial)
      })
      .catch(() => setError('加载商品失败，请刷新页面重试'))
  }, [])

  const cartItems = useMemo(
    () => Object.entries(cart).filter(([, quantity]) => quantity > 0).map(([productId, quantity]) => ({ productId, quantity })),
    [cart],
  )

  const totalUsd = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const p = products.find((product) => product.id === item.productId)
      return sum + (p ? p.priceUsd * item.quantity : 0)
    }, 0)
  }, [cartItems, products])

  const pushLog = (message: string) => {
    setFlowLog((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${message}`])
  }

  const setQty = (id: string, next: number) => {
    setCart((prev) => ({ ...prev, [id]: Math.max(0, next) }))
  }

  const handleCheckout = async () => {
    setError('')
    setOrder(null)
    setSettleInfo(null)

    if (!isConnected || !address) {
      setError('请先连接钱包')
      return
    }
    if (chainId !== BASE_CHAIN_ID) {
      setError('请先切换到 Base 主网（8453）')
      return
    }
    if (cartItems.length === 0) {
      setError('请先选择至少一个商品')
      return
    }
    if (!xClient) {
      setError('钱包签名器未就绪，请稍后重试')
      return
    }

    try {
      setLoading(true)
      setFlowLog([])
      pushLog('步骤 1/4：请求 /api/shop/checkout，等待 x402 付款要求')

      const challengeRes = await fetch('/api/shop/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      })

      if (challengeRes.status !== 402) {
        const fallback = await challengeRes.json().catch(() => ({ message: '未知错误' }))
        throw new Error(fallback.message || '服务端没有返回 402')
      }

      const challengeBody = (await challengeRes.json().catch(() => ({}))) as PaymentRequiredResponse
      const paymentRequired = xClient.getPaymentRequiredResponse((name) => challengeRes.headers.get(name), challengeBody)
      const selected = paymentRequired.accepts?.[0]
      pushLog(`步骤 2/4：收到付款要求，网络 ${selected?.network ?? 'unknown'}，创建签名载荷`)
      const paymentPayload = await xClient.createPaymentPayload(paymentRequired)
      pushLog('步骤 3/4：签名完成，携带 PAYMENT-SIGNATURE 重试结算请求')

      const settleRes = await fetch('/api/shop/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...xClient.encodePaymentSignatureHeader(paymentPayload),
        },
        body: JSON.stringify({ items: cartItems }),
      })

      if (!settleRes.ok) {
        const failure = await settleRes.json().catch(() => ({ message: '结算失败' }))
        throw new Error(failure.message || '结算失败')
      }

      const settleData = (await settleRes.json()) as OrderResponse
      const settleHeader = xClient.getPaymentSettleResponse((name) => settleRes.headers.get(name))
      setOrder(settleData.order)
      setSettleInfo({
        transaction: settleHeader.transaction,
        payer: settleHeader.payer,
      })
      setOrderUsdcDecimals(6)
      pushLog('步骤 4/4：订单确认完成')
    } catch (e) {
      const msg = e instanceof Error ? e.message : '支付失败'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-base-100">
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">Coolha 品牌周边商店</h1>
            <p className="text-base-content/70">EVM 支付采用 x402 资源服务器模式：402 挑战 → PAYMENT-SIGNATURE 重试 → PAYMENT-RESPONSE 回执。</p>
          </div>
          <Connect />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <article key={product.id} className="rounded-2xl border border-base-content/10 bg-base-200/40 p-5 space-y-4">
              <Image
                src={product.image}
                alt={product.name}
                width={640}
                height={352}
                className="w-full h-44 object-cover rounded-xl bg-black/5"
              />
              <div className="space-y-2">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-sm text-base-content/70">{product.description}</p>
                <p className="font-medium">${product.priceUsd} USD</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setQty(product.id, (cart[product.id] || 0) - 1)}>
                  -
                </Button>
                <span className="min-w-8 text-center">{cart[product.id] || 0}</span>
                <Button variant="outline" onClick={() => setQty(product.id, (cart[product.id] || 0) + 1)}>
                  +
                </Button>
              </div>
            </article>
          ))}
        </div>

        <section className="rounded-2xl border border-base-content/10 p-6 space-y-4 bg-base-200/30">
          <h3 className="text-xl font-semibold">结算面板</h3>
          <p className="text-base-content/70">当前购物车 {cartItems.length} 项，预估总价 ${totalUsd.toFixed(2)} USD</p>
          <Button onClick={handleCheckout} disabled={loading || cartItems.length === 0}>
            {loading ? '支付处理中...' : '使用 Base USDC 发起 x402 支付（资源服务器模式）'}
          </Button>
          {error ? <p className="text-red-500 text-sm">{error}</p> : null}
          {order ? (
            <div className="text-sm rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 space-y-1">
              <p>订单号：{order.orderId}</p>
              <p>支付地址：{settleInfo?.payer ?? '以 PAYMENT-RESPONSE 为准'}</p>
              <p>交易哈希：{settleInfo?.transaction ?? '以 PAYMENT-RESPONSE 为准'}</p>
              <p>
                实付金额：{Number(formatUnits(BigInt(order.amountUsdc), orderUsdcDecimals)).toFixed(2)} USDC（$
                {order.totalUsd.toFixed(2)} USD）
              </p>
            </div>
          ) : null}
        </section>

        <section className="rounded-2xl border border-base-content/10 p-6 bg-base-200/20">
          <h3 className="text-xl font-semibold mb-3">x402 流程日志</h3>
          <div className="space-y-2 text-sm text-base-content/80">
            {flowLog.length === 0 ? <p>等待发起支付...</p> : flowLog.map((item) => <p key={item}>{item}</p>)}
          </div>
        </section>
      </section>
    </main>
  )
}
