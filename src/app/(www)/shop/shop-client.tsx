'use client'

import { useEffect, useMemo, useState } from 'react'
import { erc20Abi, formatUnits } from 'viem'
import { useAccount, usePublicClient, useWriteContract } from 'wagmi'
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
  code: 'X402_PAYMENT_REQUIRED'
  message: string
  payment: {
    network: string
    chainId: number
    recipient: `0x${string}`
    asset: 'usdc'
    tokenAddress: `0x${string}`
    tokenDecimals: number
    amountUsdc: string
    totalUsd: number
    quoteId: string
    expiresAt: number
  }
  x402: {
    version: string
    proofHeader: string
    settleEndpoint: string
  }
}

type OrderResponse = {
  message: string
  order: {
    orderId: string
    quoteId: string
    txHash: string
    paidBy: string
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
  const [orderUsdcDecimals, setOrderUsdcDecimals] = useState(6)

  const { address, isConnected, chainId } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const publicClient = usePublicClient({ chainId: BASE_CHAIN_ID })

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

  const getErrorMessage = async (response: Response, fallbackMessage: string) => {
    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const data = (await response.json().catch(() => null)) as { message?: string; error?: string } | null
      return data?.message || data?.error || fallbackMessage
    }
    const text = await response.text().catch(() => '')
    return text.trim() || fallbackMessage
  }

  const handleCheckout = async () => {
    setError('')
    setOrder(null)

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
    if (!publicClient) {
      setError('链上客户端未初始化')
      return
    }

    try {
      setLoading(true)
      setFlowLog([])
      pushLog('步骤 1/4：请求 /api/shop/checkout，等待 402 支付挑战')

      const challengeRes = await fetch('/api/shop/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      })

      if (challengeRes.status !== 402) {
        throw new Error(await getErrorMessage(challengeRes, '服务端没有返回 402'))
      }

      const challenge = (await challengeRes.json()) as PaymentRequiredResponse
      pushLog(`步骤 2/4：收到报价单 ${challenge.payment.quoteId}，发起 USDC transfer 交易`)

      const txHash = await writeContractAsync({
        abi: erc20Abi,
        address: challenge.payment.tokenAddress,
        functionName: 'transfer',
        args: [challenge.payment.recipient, BigInt(challenge.payment.amountUsdc)],
        chainId: challenge.payment.chainId,
      })

      pushLog(`步骤 3/4：交易已广播 ${txHash}，等待链上确认`)
      await publicClient.waitForTransactionReceipt({ hash: txHash })
      pushLog('链上确认成功，提交 x-payment 证明到结算接口')

      const settleRes = await fetch(challenge.x402.settleEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-payment': JSON.stringify({
            quoteId: challenge.payment.quoteId,
            txHash,
            payer: address,
            chainId: challenge.payment.chainId,
          }),
        },
        body: JSON.stringify({ items: cartItems }),
      })

      if (!settleRes.ok) {
        throw new Error(await getErrorMessage(settleRes, '结算失败'))
      }

      const settleData = (await settleRes.json()) as OrderResponse
      setOrder(settleData.order)
      setOrderUsdcDecimals(challenge.payment.tokenDecimals)
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
            <p className="text-base-content/70">EVM 支付采用 x402 风格：402 报价挑战 → Base USDC 转账 → x-payment 结算确认。</p>
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
            {loading ? '支付处理中...' : '使用 Base USDC 发起 x402 支付'}
          </Button>
          {error ? <p className="text-red-500 text-sm">{error}</p> : null}
          {order ? (
            <div className="text-sm rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 space-y-1">
              <p>订单号：{order.orderId}</p>
              <p>报价单：{order.quoteId}</p>
              <p>支付地址：{order.paidBy}</p>
              <p>交易哈希：{order.txHash}</p>
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
