'use client'

import dynamic from "next/dynamic"
import { motion, type Variants } from "framer-motion"
import { useTranslations } from "next-intl"
import {
  RiLightbulbFlashLine,
  RiRobot2Line,
  RiGlobalLine,
  RiHandCoinLine,
  RiMindMap,
  RiStackLine,
} from "react-icons/ri"

// Apple 式缓出，与首页 / RWA 页保持一致
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const heroGroup: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.13 } },
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: EASE },
  },
}

const riseIn = {
  initial: { y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: EASE },
}

const AgentNeuralSphere = dynamic(() => import("@/components/three/AgentNeuralSphere"), { ssr: false })

const stanceIcons = [RiMindMap, RiStackLine, RiLightbulbFlashLine, RiGlobalLine]

const sectionIcons: Record<string, typeof RiGlobalLine> = {
  change: RiGlobalLine,
  market: RiHandCoinLine,
  hardware: RiRobot2Line,
}

const sectionKeys = [
  { id: "change", paragraphs: ["p1", "p2", "p3", "p4"] },
  { id: "market", paragraphs: ["p1", "p2", "p3"] },
  { id: "hardware", paragraphs: ["p1"] },
] as const

export default function AgentPage() {
  const t = useTranslations("agent")
  const stances = t.raw("stances") as { title: string; desc: string }[]

  // 标题在窄屏容易把中文词拆断（如「经 / 济」），按 & 拆成两段，
  // 移动端让后半句整体换行，桌面端仍保持一行。
  const heroTitle = t("hero_title")
  const ampAt = heroTitle.indexOf("&")
  const titleHead = ampAt >= 0 ? heroTitle.slice(0, ampAt + 1) : heroTitle
  const titleTail = ampAt >= 0 ? heroTitle.slice(ampAt + 1).trim() : ""

  return (
    <main className="site-shell min-h-screen">
      {/* ========== Hero ========== */}
      <section className="relative flex h-[100svh] min-h-[36rem] items-center overflow-hidden">
        {/* 基础径向光晕 */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C8F237]/8 via-transparent to-transparent" />

        {/* 中心呼吸光核 */}
        <motion.div
          animate={{ opacity: [0.32, 0.6, 0.32], scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C8F237]/12 blur-[140px]"
        />

        {/* 3D 神经网络球：斐波那契球面节点 + 拓扑连线，取代原 2D SVG 网络 */}
        <AgentNeuralSphere className="pointer-events-none absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2" />

        {/* 环绕核心的轨道环 */}
        <div className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
          <div className="orbit-ring orbit-ring-1" />
          <div className="orbit-ring orbit-ring-2" />
        </div>

        {/* 内容 */}
        <motion.div
          variants={heroGroup}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-6xl px-6 py-24 text-center md:px-12"
        >
          <motion.div
            variants={heroItem}
            className="glass-panel mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-sm font-medium tracking-wide text-[#C8F237]"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#C8F237] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#C8F237]" />
            </span>
            <span>{t("hero_tag")}</span>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-balance text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="bg-clip-text bg-linear-to-r from-white via-white to-[#C8F237] text-transparent">
              {titleHead}
              {titleTail ? (
                <>
                  <br className="sm:hidden" />
                  {" "}
                  {titleTail}
                </>
              ) : null}
            </span>
          </motion.h1>
        </motion.div>

        {/* 底部滚动暗示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center"
        >
          <div className="h-12 w-px bg-linear-to-b from-[#C8F237]/80 to-transparent" />
        </motion.div>

        {/* 底部光带 */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-[#C8F237]/40 to-transparent" />
      </section>

      {/* ========== Main Content ========== */}
      <article className="relative mx-auto max-w-4xl px-6 pt-10 pb-32 md:px-12 md:pt-16">
        {/* Dawn Section */}
        <motion.div
          {...riseIn}
          className="glass-panel rounded-3xl p-7 text-lg leading-relaxed text-white/78 md:p-10 md:text-xl"
        >
          <p>{t("dawn_p1")}</p>
          <p>{t("dawn_p2")}</p>
        </motion.div>

        {/* Themed Sections */}
        {sectionKeys.map((section) => {
          const Icon = sectionIcons[section.id]
          return (
            <motion.section
              key={section.id}
              {...riseIn}
              className="mt-20"
            >
              {/* Section header */}
              <div className="mb-8 flex items-center gap-4">
                <div className="glass-panel flex size-14 shrink-0 items-center justify-center rounded-2xl text-[#C8F237]">
                  <Icon className="size-7" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {t(`${section.id}_title`)}
                </h2>
              </div>

              <div className="space-y-5 text-lg leading-relaxed text-white/72 md:text-xl">
                {section.paragraphs.map((p) => (
                  <p key={p}>{t(`${section.id}_${p}`)}</p>
                ))}
              </div>
            </motion.section>
          )
        })}

        {/* ========== History Callout ========== */}
        <motion.div
          initial={{ scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="glass-panel mt-20 rounded-3xl bg-[#C8F237]/[0.06] p-8 text-center md:p-12"
        >
          <p className="text-lg leading-relaxed text-white/80 md:text-xl">
            {t("history_p1")}
          </p>
        </motion.div>

        {/* ========== Our Stand ========== */}
        <motion.section {...riseIn} className="mt-28">
          {/* Divider */}
          <div className="mb-14 flex items-center gap-4">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#C8F237]/50 to-transparent" />
            <span className="text-sm font-medium tracking-widest text-[#C8F237] uppercase">
              Our Position
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#C8F237]/50 to-transparent" />
          </div>

          <h2 className="mb-4 text-center text-3xl font-semibold tracking-[-0.035em] text-white md:text-4xl">
            {t("position_title")}
          </h2>
          <p className="mx-auto mb-14 max-w-2xl text-center text-lg text-white/55">
            {t("position_desc")}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {stances.map((item, idx) => {
              const Icon = stanceIcons[idx]
              return (
                <motion.div
                  key={idx}
                  initial={{ y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: EASE, delay: idx * 0.1 }}
                >
                  <div className="glass-panel group relative h-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border bg-[#C8F237]/10 text-[#C8F237] transition-colors group-hover:bg-[#C8F237]/20">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/65">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* ========== Closing Statement ========== */}
        <motion.div
          initial={{ y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="mt-20 border-t pt-12 text-center"
        >
          <div className="mx-auto max-w-3xl">
            <div className="glass-panel mb-4 inline-flex size-12 items-center justify-center rounded-full text-[#C8F237]">
              <RiRobot2Line className="size-6" />
            </div>
            <p className="text-lg font-medium leading-relaxed text-white/80 md:text-xl">
              {t("closing")}
            </p>
          </div>
        </motion.div>
      </article>
    </main>
  )
}
