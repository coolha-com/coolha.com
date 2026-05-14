'use client'

import { useMemo, useState } from 'react'
import { bigDecimal, evmAddress, useBorrow, useChains, useReserves, useSupply } from '@aave/react'
import { useSendTransaction, useSignTypedData } from '@aave/react/viem'
import type { ReserveId } from '@aave/graphql'
import { chainId } from '@aave/types'
import { useAppKitAccount } from '@reown/appkit/react'
import { useWalletClient } from 'wagmi'

type Mode = 'supply' | 'borrow'

type MarketItem = {
  id: ReserveId
  symbol: 'USDC' | 'USDT'
  chainName: string
  chainId: number
  supplyApy: number
  borrowApy: number
  canSupply: boolean
  canBorrow: boolean
  suppliable: number
  borrowable: number
  totalSupplied: number
  totalBorrowed: number
  utilization: number
}

type StableSymbol = 'USDC' | 'USDT'

type NumericLike = {
  toNumber?: () => number
  toDisplayString?: (precision: number) => string
  toString?: () => string
}

function toSafeNumber(input: unknown): number {
  if (typeof input === 'number') {
    return Number.isFinite(input) ? input : 0
  }

  if (typeof input === 'bigint') {
    const parsed = Number(input)
    return Number.isFinite(parsed) ? parsed : 0
  }

  if (typeof input === 'string') {
    const parsed = Number(input)
    return Number.isFinite(parsed) ? parsed : 0
  }

  if (input && typeof input === 'object') {
    const value = input as NumericLike
    if (typeof value.toNumber === 'function') {
      try {
        const parsed = value.toNumber()
        if (Number.isFinite(parsed)) return parsed
      } catch {
        // ignore and fallback to string parsing
      }
    }

    if (typeof value.toDisplayString === 'function') {
      const parsed = Number(value.toDisplayString(8))
      if (Number.isFinite(parsed)) return parsed
    }

    if (typeof value.toString === 'function') {
      const parsed = Number(value.toString())
      if (Number.isFinite(parsed)) return parsed
    }
  }

  return 0
}

function normalizeStableSymbol(symbol: string | undefined): StableSymbol | null {
  if (!symbol) return null
  const upper = symbol.toUpperCase()
  if (upper.startsWith('USDC')) return 'USDC'
  if (upper.startsWith('USDT')) return 'USDT'
  return null
}

function compactValue(value: number): string {
  if (!Number.isFinite(value)) return '--'
  return new Intl.NumberFormat('zh-CN', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value)
}

export default function DefiPage() {
  const [mode, setMode] = useState<Mode>('supply')
  const [selectedChainId, setSelectedChainId] = useState<number>(8453)
  const [selectedReserveId, setSelectedReserveId] = useState<ReserveId | ''>('')
  const [keyword, setKeyword] = useState<string>('')
  const [amountInput, setAmountInput] = useState<string>('10')
  const [actionMessage, setActionMessage] = useState<string>('')

  const { address, isConnected } = useAppKitAccount()
  const { data: walletClient } = useWalletClient()
  const [sendTransaction] = useSendTransaction(walletClient)
  const [signTypedData] = useSignTypedData(walletClient)

  const [supply, supplyState] = useSupply((plan) => {
    switch (plan.__typename) {
      case 'TransactionRequest':
        return sendTransaction(plan)
      case 'Erc20Approval':
        if (plan.bySignature) return signTypedData(plan.bySignature)
        return sendTransaction(plan.byTransaction)
      case 'PreContractActionRequired':
        return sendTransaction(plan.transaction)
    }
  })
  const [borrow, borrowState] = useBorrow((plan) => {
    switch (plan.__typename) {
      case 'TransactionRequest':
        return sendTransaction(plan)
      case 'PreContractActionRequired':
        return sendTransaction(plan.transaction)
    }
  })

  const { data: aaveChains, loading: chainsLoading, error: chainsError } = useChains()
  const chainOptions = useMemo(
    () => (aaveChains ?? []).map((item) => ({ id: toSafeNumber(item.chainId), name: item.name })),
    [aaveChains],
  )

  const effectiveChainId = useMemo(() => {
    if (chainOptions.some((item) => item.id === selectedChainId)) return selectedChainId
    const hasBase = chainOptions.some((item) => item.id === 8453)
    if (hasBase) return 8453
    if (chainOptions.length > 0) return chainOptions[0].id
    return 1
  }, [chainOptions, selectedChainId])

  const {
    data: chainReserves,
    loading: reservesLoading,
    reloading: reservesReloading,
    paused: reservesPaused,
    error: reservesError,
  } = useReserves({
    query: { chainIds: [chainId(effectiveChainId)] },
    pause: chainsLoading || chainOptions.length === 0,
  })

  const marketItems = useMemo<MarketItem[]>(() => {
    const next: MarketItem[] = []
    for (const reserve of chainReserves ?? []) {
      const stableSymbol = normalizeStableSymbol(reserve.summary.suppliable.token.info.symbol)
      if (!stableSymbol) continue
      const totalSupplied = toSafeNumber(reserve.summary.supplied.amount.value)
      const totalBorrowed = toSafeNumber(reserve.summary.borrowed.amount.value)
      next.push({
        id: reserve.id,
        symbol: stableSymbol,
        chainName: reserve.chain.name,
        chainId: toSafeNumber(reserve.chain.chainId),
        supplyApy: toSafeNumber(reserve.summary.supplyApy.value),
        borrowApy: toSafeNumber(reserve.summary.borrowApy.value),
        canSupply: Boolean(reserve.canSupply),
        canBorrow: Boolean(reserve.canBorrow),
        suppliable: toSafeNumber(reserve.summary.suppliable.amount.value),
        borrowable: toSafeNumber(reserve.summary.borrowable.amount.value),
        totalSupplied,
        totalBorrowed,
        utilization: totalSupplied > 0 ? (totalBorrowed / totalSupplied) * 100 : 0,
      })
    }
    return next
  }, [chainReserves])

  const filteredMarkets = useMemo(() => {
    const lower = keyword.trim().toLowerCase()
    const byMode = marketItems.filter((item) => (mode === 'supply' ? item.canSupply : item.canBorrow))
    const byKeyword = lower
      ? byMode.filter((item) => item.symbol.toLowerCase().includes(lower) || item.chainName.toLowerCase().includes(lower))
      : byMode
    const sorted = [...byKeyword].sort((a, b) => (mode === 'supply' ? b.supplyApy - a.supplyApy : a.borrowApy - b.borrowApy))
    return sorted
  }, [keyword, marketItems, mode])

  const selectedMarket = useMemo(
    () => filteredMarkets.find((item) => item.id === selectedReserveId) ?? filteredMarkets[0],
    [selectedReserveId, filteredMarkets],
  )

  const walletChainId = walletClient?.chain?.id ?? null
  const chainMatched = walletChainId === effectiveChainId
  const activeState = mode === 'supply' ? supplyState : borrowState

  const handleExecute = async () => {
    setActionMessage('')
    if (!isConnected || !address) {
      setActionMessage('请先使用全局钱包入口连接钱包。')
      return
    }
    if (!chainMatched) {
      setActionMessage(`当前钱包网络(${walletChainId ?? '未知'})与页面网络(${effectiveChainId})不一致，请先切换网络。`)
      return
    }
    if (!selectedMarket) {
      setActionMessage('当前没有可执行的市场。')
      return
    }
    const amount = toSafeNumber(amountInput)
    if (amount <= 0) {
      setActionMessage('请输入大于 0 的存入数量。')
      return
    }

    const request = {
      sender: evmAddress(address),
      reserve: selectedMarket.id,
      amount: {
        erc20: {
          value: bigDecimal(amount),
        },
      },
    }
    const result = mode === 'supply' ? await supply(request) : await borrow(request)

    if (result.isErr()) {
      switch (result.error.name) {
        case 'CancelError':
          setActionMessage('用户取消了交易。')
          return
        case 'ValidationError':
          setActionMessage(`余额不足：需要 ${result.error.cause.required.value.toDisplayString(2)}。`)
          return
        default:
          setActionMessage(`${mode === 'supply' ? '借出' : '借入'}失败：${result.error.message}`)
          return
      }
    }
    setActionMessage(`${mode === 'supply' ? '借出' : '借入'}成功，交易哈希：${result.value.txHash}`)
  }

  return (
    <main className="min-h-[calc(100dvh-120px)] bg-background px-3 py-3 text-foreground md:px-5 md:py-5">

        <section className="rounded-[24px] border border-amber-500/30 bg-amber-500/10 p-4 shadow-sm backdrop-blur">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">
                Test Environment
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">当前页面处于模拟测试环境</p>
              <p className="mt-1 text-sm text-muted-foreground">
                当前展示的数据、收益率、风险分与路由结果均为 mock / demo 内容，仅用于产品交互演示，不代表真实市场情况。
              </p>
            </div>
            <div className="rounded-full border border-amber-500/30 bg-background/80 px-3 py-1.5 text-xs text-amber-700 dark:text-amber-300">
              数据可能不准确
            </div>
          </div>
        </section>

      <section className="mx-auto grid max-w-7xl gap-4 xl:grid-cols-[1.85fr_1fr]">
        <article className="overflow-hidden rounded-[26px] border border-border bg-card/95 shadow-sm backdrop-blur">
          <div className="border-b border-border p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Aave Style Markets</p>
                <h1 className="mt-1 text-xl font-semibold text-foreground md:text-2xl">
                  {mode === 'supply' ? '借出市场' : '借入市场'}
                </h1>
              </div>
              <div className="inline-flex rounded-2xl border border-border bg-muted p-1 shadow-inner">
                <button
                  type="button"
                  onClick={() => setMode('supply')}
                  className={`rounded-xl px-4 py-1.5 text-sm transition ${mode === 'supply' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  借出
                </button>
                <button
                  type="button"
                  onClick={() => setMode('borrow')}
                  className={`rounded-xl px-4 py-1.5 text-sm transition ${mode === 'borrow' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  借入
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-2 md:grid-cols-[1.3fr_0.9fr_0.8fr]">
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="搜索资产、网络..."
                className="h-10 rounded-xl border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <select
                value={effectiveChainId}
                onChange={(event) => setSelectedChainId(toSafeNumber(event.target.value))}
                className="h-10 rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none"
              >
                {chainOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.id})
                  </option>
                ))}
              </select>
              <div className="flex h-10 items-center rounded-xl border border-border bg-muted px-3 text-xs text-muted-foreground">
                支持链：{chainsLoading ? '读取中...' : aaveChains?.length ?? 0}
              </div>
            </div>
          </div>

          <div className="px-4 pb-4 pt-3">
            <div className="grid grid-cols-[1.5fr_0.7fr_0.9fr_0.9fr_0.7fr] gap-2 px-2 py-2 text-xs text-muted-foreground">
              <p>资产</p>
              <p>{mode === 'supply' ? '借出 APY' : '借入 APY'}</p>
              <p>总借出</p>
              <p>{mode === 'supply' ? '可借出' : '可借入'}</p>
              <p>利用率</p>
            </div>

            <div className="max-h-[64vh] space-y-1 overflow-y-auto pr-1">
              {filteredMarkets.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedReserveId(item.id)}
                  className={`grid w-full grid-cols-[1.5fr_0.7fr_0.9fr_0.9fr_0.7fr] items-center gap-2 rounded-xl border px-2 py-3 text-left text-sm transition ${selectedMarket?.id === item.id
                    ? 'border-primary/25 bg-primary/10'
                    : 'border-border bg-card/70 hover:border-primary/20 hover:bg-muted/40'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-foreground">
                      {item.symbol.slice(0, 2)}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{item.symbol}</p>
                      <p className="text-xs text-muted-foreground">{item.chainName}</p>
                    </div>
                  </div>
                  <p className={`${mode === 'supply' ? 'text-primary' : 'text-chart-5'}`}>
                    {mode === 'supply' ? `${item.supplyApy.toFixed(2)}%` : `${item.borrowApy.toFixed(2)}%`}
                  </p>
                  <p className="text-foreground">{compactValue(item.totalSupplied)}</p>
                  <p className="text-foreground">{compactValue(mode === 'supply' ? item.suppliable : item.borrowable)}</p>
                  <p className="text-muted-foreground">{item.utilization.toFixed(1)}%</p>
                </button>
              ))}
              {!reservesLoading && filteredMarkets.length === 0 && (
                <p className="rounded-xl border border-border bg-card/70 p-4 text-sm text-muted-foreground">
                  当前筛选下没有可用市场。
                </p>
              )}
            </div>
          </div>
        </article>

        <article className="h-fit rounded-[26px] border border-border bg-card/95 p-5 shadow-sm backdrop-blur xl:sticky xl:top-5">
          <h2 className="text-lg font-semibold text-foreground">{mode === 'supply' ? '借出' : '借入'}操作</h2>
          <p className="mt-1 text-xs text-muted-foreground">仿 Aave 右侧执行面板</p>

          <div className="mt-4 rounded-xl border border-border bg-background p-3 text-sm text-foreground">
            <p>网络：{chainOptions.find((item) => item.id === effectiveChainId)?.name ?? '未知'} ({effectiveChainId})</p>
            <p className="mt-1">资产：{selectedMarket?.symbol ?? '未选择'}</p>
            <p className="mt-1">借出 APY：{selectedMarket ? `${selectedMarket.supplyApy.toFixed(2)}%` : '--'}</p>
            <p className="mt-1">借入 APY：{selectedMarket ? `${selectedMarket.borrowApy.toFixed(2)}%` : '--'}</p>
            <p className="mt-1">钱包网络：{walletChainId ?? '未连接'}</p>
          </div>

          <div className="mt-3 rounded-xl border border-border bg-background p-3">
            <label className="text-xs text-muted-foreground">数量</label>
            <input
              value={amountInput}
              onChange={(event) => setAmountInput(event.target.value)}
              className="mt-2 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              placeholder="例如 10"
              inputMode="decimal"
            />
          </div>

          <button
            type="button"
            onClick={handleExecute}
            disabled={!selectedMarket || (mode === 'supply' ? !selectedMarket.canSupply : !selectedMarket.canBorrow) || activeState.loading}
            className="mt-4 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {activeState.loading ? '交易发送中...' : `${mode === 'supply' ? '借出' : '借入'} ${selectedMarket?.symbol ?? '资产'}`}
          </button>

          <div className="mt-4 rounded-xl border border-border bg-background p-3 text-xs text-muted-foreground">
            {chainsLoading && <p>读取链列表中...</p>}
            {!chainsLoading && chainsError && <p className="text-destructive">读取失败：{chainsError.message}</p>}
            {reservesPaused && <p>等待链信息完成加载...</p>}
            {reservesLoading && <p>读取储备数据中...</p>}
            {reservesReloading && !reservesLoading && <p>刷新最新 APY 中...</p>}
            {!reservesLoading && reservesError && <p className="text-destructive">储备读取失败：{reservesError.message}</p>}
            {!chainsLoading && !chainsError && !reservesLoading && !reservesError && (
              <div className="space-y-1">
                <p>当前市场：{filteredMarkets.length}</p>
                <p>模式：{mode === 'supply' ? '借出（Supply）' : '借入（Borrow）'}</p>
              </div>
            )}
          </div>

          {actionMessage && <p className="mt-3 break-all text-xs text-muted-foreground">{actionMessage}</p>}
        </article>
      </section>
    </main>
  )
}
