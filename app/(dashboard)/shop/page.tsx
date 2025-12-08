'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useAccount, useWalletClient, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { AddressTruncate } from '@/utils/AddressTruncate'
import dynamic from 'next/dynamic'
const ConnectButton = dynamic(() => import('@/components/web3/ConnectButton'), { ssr: false })

import { uploadProductMetadata, type ProductMetadata, getOrdersBySeller } from '@/lib/lens/storage'
import { MARKETPLACE_ADDRESS, MARKETPLACE_ABI } from '@/lib/contracts/marketplace'

export default function ShopDashboardPage() {
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()

  // Product listing form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [price, setPrice] = useState('0.01')
  const [quantity, setQuantity] = useState(1)
  const [statusMsg, setStatusMsg] = useState<string>('')
  const [isRefreshingOrders, setIsRefreshingOrders] = useState(false)

  const canList = useMemo(() => {
    const hasTitle = Boolean(title && title.trim().length > 0)
    const priceNumber = Number(price)
    const priceValid = !Number.isNaN(priceNumber) && priceNumber >= 0
    const quantityValid = quantity > 0
    return Boolean(address && isConnected && hasTitle && priceValid && quantityValid)
  }, [address, isConnected, title, price, quantity])

  const { data: txHash, isPending, error, writeContractAsync } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  async function onListProduct() {
    try {
      if (!address || !isConnected) {
        setStatusMsg('请先连接钱包')
        return
      }
      if (!MARKETPLACE_ADDRESS) {
        setStatusMsg('未配置 NEXT_PUBLIC_MARKETPLACE_ADDRESS，请在 .env 中设置合约地址')
        return
      }
      if (!title || title.trim().length === 0) {
        setStatusMsg('请输入标题')
        return
      }
      const priceNumber = Number(price)
      if (Number.isNaN(priceNumber) || priceNumber < 0) {
        setStatusMsg('价格格式不正确')
        return
      }
      if (quantity <= 0) {
        setStatusMsg('库存数量必须大于 0')
        return
      }

      setStatusMsg('正在上传元数据到 Grove...')
      const meta: ProductMetadata = {
        title,
        description,
        imageUrl: imageUrl || undefined,
        price,
        quantity,
        sellerAddress: address as `0x${string}`,
        createdAt: new Date().toISOString(),
      }
      const metadataUri = await uploadProductMetadata(meta, { aclOwner: address as `0x${string}` })
      setStatusMsg(`上传成功，URI: ${metadataUri}，正在上链...`)

      const priceWei = parseEther(price)
      const submittedTxHash = await writeContractAsync({
        address: MARKETPLACE_ADDRESS as `0x${string}`,
        abi: MARKETPLACE_ABI,
        functionName: 'listProduct',
        args: [metadataUri, priceWei, BigInt(quantity)],
      })

      setStatusMsg(`已提交交易，hash: ${String(submittedTxHash)}`)
    } catch (e: any) {
      console.error(e)
      setStatusMsg(`上架失败: ${e?.message || e}`)
    }
  }

  // Orders & Sales: simple preview (seller side)
  const [orders, setOrders] = useState<any[]>([])
  async function refreshOrders() {
    if (!address) return
    try {
      setIsRefreshingOrders(true)
      const list = await getOrdersBySeller(address as `0x${string}`)
      setOrders(list)
    } catch (e) {
      console.error(e)
    } finally {
      setIsRefreshingOrders(false)
    }
  }

  useEffect(() => {
    if (address) refreshOrders()
  }, [address])

  useEffect(() => {
    if (isConfirmed) {
      setStatusMsg('交易已确认 ✅')
      refreshOrders()
      resetForm()
    }
  }, [isConfirmed])

  function resetForm() {
    setTitle('')
    setDescription('')
    setImageUrl('')
    setPrice('0.01')
    setQuantity(1)
  }

  function formatAmount(a: any): string {
    try {
      const v = typeof a === 'bigint' ? a : BigInt(a)
      return `${formatEther(v)} ETH`
    } catch {
      return String(a)
    }
  }

  function statusBadge(s: string) {
    const base = 'badge'
    const cls = s === 'PAID' ? 'badge-warning' : s === 'FULFILLED' ? 'badge-success' : 'badge-ghost'
    return <span className={`${base} ${cls}`}>{s}</span>
  }

  return (
    <div className="p-6 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">创作者商品管理</h1>
        <ConnectButton />
      </header>

      {/* 1️⃣ 链上身份系统 */}
      <section className="p-4 rounded-xl bg-base-200">
        <h2 className="text-xl font-semibold mb-2">链上身份</h2>
        <div className="space-y-1 text-sm opacity-80">
          <div>钱包地址：{AddressTruncate(address)}</div>
          <div>
            Lens 用户名：{/* TODO: 使用正确的 Lens hook 读取用户名（已移除 useProfiles 以修复 TS 导出错误） */}
            未绑定
          </div>
        </div>
      </section>

      {/* 2️⃣ 商品上架模块 */}
      <section className="p-4 rounded-xl bg-base-200">
        <h2 className="text-xl font-semibold mb-4">商品上架</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="form-control">
            <span className="label">标题</span>
            <input className="input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例如：限量周边 T 恤" disabled={!isConnected || isPending} />
          </label>
          <label className="form-control">
            <span className="label">封面图 URL</span>
            <input className="input input-bordered" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." disabled={!isConnected || isPending} />
          </label>
          <label className="form-control md:col-span-2">
            <span className="label">描述</span>
            <textarea className="textarea textarea-bordered" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="介绍、规格、发货说明等" disabled={!isConnected || isPending} />
          </label>
          <label className="form-control">
            <span className="label">价格（原生代币）</span>
            <input className="input input-bordered" type="number" step="0.0001" min={0} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.01" disabled={!isConnected || isPending} />
          </label>
          <label className="form-control">
            <span className="label">库存数量</span>
            <input className="input input-bordered" type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} disabled={!isConnected || isPending} />
          </label>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="flex items-center gap-3">
            <button className="btn btn-primary" disabled={!canList || isPending} onClick={onListProduct}>上架</button>
            <button className="btn" onClick={resetForm} disabled={isPending}>重置</button>
            <span className="text-sm opacity-80">
              {isPending && '提交交易中...'}
              {isConfirming && '确认中...'}
              {isConfirmed && '交易已确认 ✅'}
            </span>
          </div>
          <div className="card bg-base-300 shadow-sm">
            <div className="card-body p-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded bg-base-100 overflow-hidden">
                  {imageUrl ? (
                    <img src={imageUrl} alt="预览" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-xs opacity-60">无预览</div>
                  )}
                </div>
                <div className="space-y-1 text-sm">
                  <div className="font-semibold">{title || '未填写标题'}</div>
                  <div className="opacity-70">价格：{price || '—'} ETH</div>
                  <div className="opacity-70">库存：{quantity}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {statusMsg && <div className="mt-2 alert alert-info text-sm">{statusMsg}</div>}
        {error && <div className="mt-2 alert alert-error text-sm">{error.message}</div>}
      </section>

      {/* 3️⃣ 支付结算 & 4️⃣ 订单与履约（买家侧流程通常在商品详情页进行，这里只做卖家总览） */}
      <section className="p-4 rounded-xl bg-base-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">订单与履约（卖家）</h2>
          <button className="btn btn-outline" onClick={refreshOrders} disabled={isRefreshingOrders}>{isRefreshingOrders ? '刷新中...' : '刷新订单'}</button>
        </div>
        {isRefreshingOrders ? (
          <div className="text-sm opacity-60">加载中...</div>
        ) : orders.length === 0 ? (
          <div className="text-sm opacity-80">暂无订单</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>订单号</th>
                  <th>商品</th>
                  <th>买家</th>
                  <th>状态</th>
                  <th>金额</th>
                  <th>创建时间</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.productId}</td>
                    <td>{AddressTruncate(o.buyer)}</td>
                    <td>{statusBadge(o.status)}</td>
                    <td className="text-right">{formatAmount(o.amount)}</td>
                    <td>{new Date(o.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 6️⃣ 销售功能（概览） */}
      <section className="p-4 rounded-xl bg-base-200">
        <h2 className="text-xl font-semibold mb-2">销售概览</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="p-4 rounded bg-base-300">
            <div className="opacity-70">累计订单</div>
            <div className="text-2xl font-bold">{orders.length}</div>
          </div>
          <div className="p-4 rounded bg-base-300">
            <div className="opacity-70">成交金额</div>
            <div className="text-2xl font-bold">
              {(() => {
                try {
                  const total = orders
                    .filter((o) => o.status === 'FULFILLED')
                    .reduce((acc, o) => {
                      try {
                        const v = typeof o.amount === 'bigint' ? o.amount : BigInt(o.amount)
                        return acc + v
                      } catch {
                        return acc
                      }
                    }, 0n)
                  return `${formatEther(total)} ETH`
                } catch {
                  return '—'
                }
              })()}
            </div>
          </div>
          <div className="p-4 rounded bg-base-300">
            <div className="opacity-70">待履约</div>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === 'PAID').length}</div>
          </div>
          <div className="p-4 rounded bg-base-300">
            <div className="opacity-70">已完成</div>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === 'FULFILLED').length}</div>
          </div>
        </div>
      </section>
    </div>
  )
}
