'use client'

import { FormEvent, useMemo, useState } from 'react'

type BridgeResponse = {
  ok: boolean
  mode: 'live' | 'mock'
  message: string
  request: {
    projectUrl: string
    note: string
    action: string
  }
  result: unknown
  upstream?: {
    status: number
    endpoint: string
  }
}

const quickActions = [
  { label: '完整投研', value: 'full_research' },
  { label: '风险扫描', value: 'risk_scan' },
  { label: '交易计划', value: 'trade_plan' },
]

const sidebarAgents = ['DeFAI']

export default function AiPage() {
  const [projectUrl, setProjectUrl] = useState('')
  const [action, setAction] = useState('full_research')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<BridgeResponse | null>(null)

  const canSubmit = useMemo(() => projectUrl.trim().length > 0 && !loading, [projectUrl, loading])
  const currentTime = new Date().toLocaleString('zh-CN', { hour12: false })

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!projectUrl.trim()) {
      setError('请输入项目官网、推文或文档链接')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/ai/defai/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectUrl: projectUrl.trim(),
          note: note.trim(),
          action,
        }),
      })

      const data = (await response.json()) as BridgeResponse | { message?: string }
      if (!response.ok) {
        setError((data as { message?: string }).message || '请求失败')
        return
      }
      setResult(data as BridgeResponse)
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : '未知错误'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[calc(100dvh-120px)] bg-base-200 text-base-content">
      <section className="grid min-h-[calc(100dvh-120px)] grid-cols-1 lg:grid-cols-[250px_1fr]">
        <aside className="border-r border-base-content/10 bg-base-100/60 backdrop-blur">
          <div className="border-b border-base-content/10 px-5 py-6">
            <p className="text-2xl font-semibold tracking-wide">DeFAI</p>
            <p className="mt-1 text-xs text-base-content/60">v1.0.0</p>
          </div>

          <div className="p-4">
            <button
              type="button"
              className="w-full rounded-lg border border-base-content/10 bg-base-200/40 px-3 py-2 text-left text-sm transition hover:bg-base-content/10"
            >
              + 创建新智能体
            </button>

            <div className="mt-6">
              <p className="text-xs tracking-[0.18em] text-base-content/60">Agents</p>
              <ul className="mt-3 space-y-2">
                {sidebarAgents.map((agent, index) => (
                  <li
                    key={agent}
                    className={`rounded-lg border px-3 py-2 text-sm ${index === 0
                      ? 'border-primary/40 bg-primary/10 text-base-content'
                      : 'border-base-content/10 bg-base-200/40 text-base-content/80'
                      }`}
                  >
                    {agent}
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-xs tracking-[0.18em] text-base-content/60">Groups</p>
              <ul className="mt-3 space-y-2">

              </ul>

            </div>


          </div>

          <div className="mt-auto border-t border-base-content/10 px-4 py-4 text-xs text-base-content/60">
            <p className="mt-2">Logs</p>
            <p className="mt-2">Settings</p>
            <p className="mt-3 text-primary">● Connected</p>
          </div>
        </aside>

        <section className="flex min-h-[calc(100dvh-120px)] flex-col">
          <header className="flex items-center justify-between border-b border-base-content/10 px-6 py-4">
            <div className="rounded-full border border-base-content/10 bg-base-100/70 px-4 py-2 text-sm text-base-content/80">
              Chat · {currentTime}
            </div>
            <button
              type="button"
              className="rounded-full border border-base-content/10 bg-base-100/70 px-4 py-2 text-sm transition hover:bg-base-content/10"
            >
              + New Chat
            </button>
          </header>

          <div className="flex-1 overflow-auto px-6 py-5">
            <div className="mx-auto flex h-full w-full max-w-4xl flex-col">
              <div className="mb-6 ml-auto max-w-sm rounded-2xl border border-base-content/10 bg-base-100/70 px-4 py-3 text-sm">
                你好
              </div>

              <div className="mb-6 rounded-2xl border border-base-content/10 bg-base-100/70 px-4 py-3 text-sm text-base-content/80">
                {loading ? 'DeFAI 分析中...' : 'DeFAI 已就绪，输入项目链接开始分析。'}
              </div>

              {error ? (
                <div className="mb-6 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                  {error}
                </div>
              ) : null}

              {result ? (
                <pre className="mb-6 overflow-auto rounded-2xl border border-base-content/10 bg-base-100/80 p-4 text-xs text-base-content/90">
                  {JSON.stringify(result, null, 2)}
                </pre>
              ) : (
                <div className="rounded-2xl border border-dashed border-base-content/15 bg-base-100/50 p-4 text-xs text-base-content/60">
                  执行结果会显示在这里
                </div>
              )}
            </div>
          </div>

          <footer className="border-t border-base-content/10 p-5">
            <form onSubmit={onSubmit} className="mx-auto w-full max-w-4xl rounded-2xl border border-base-content/10 bg-base-100/70 p-4">
              <input
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="粘贴项目链接，例如 https://x.com/... 或 https://project.xyz"
                className="w-full rounded-xl border border-base-content/10 bg-base-200/60 px-4 py-3 text-sm outline-none placeholder:text-base-content/40 focus:border-primary"
              />

              <div className="mt-3 flex flex-col gap-3 lg:flex-row">
                <select
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  className="rounded-xl border border-base-content/10 bg-base-200/60 px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  {quickActions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="补充说明（可选）"
                  className="min-w-0 flex-1 rounded-xl border border-base-content/10 bg-base-200/60 px-3 py-2 text-sm outline-none placeholder:text-base-content/40 focus:border-primary"
                />

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? '执行中...' : '发送'}
                </button>
              </div>
            </form>
          </footer>
        </section>
      </section>
    </main>
  )
}
