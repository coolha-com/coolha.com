'use client'

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import {
  RiLightbulbFlashLine,
  RiRobot2Line,
  RiGlobalLine,
  RiHandCoinLine,
  RiMindMap,
  RiStackLine,
} from "react-icons/ri"

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

export default function AIPage() {
  const t = useTranslations("ai")
  const stances = t.raw("stances") as { title: string; desc: string }[]

  return (
    <div className="min-h-screen bg-base-100">
      {/* ========== Hero ========== */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C0E218]/8 via-transparent to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-[#C0E218]/40 to-transparent" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Tag */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#C0E218]/20 bg-[#C0E218]/10 px-5 py-2 text-sm font-medium tracking-wide text-[#C0E218]">
              <RiRobot2Line className="size-4" />
              <span>{t("hero_tag")}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
              <span className="bg-clip-text bg-linear-to-r from-white to-white/60 text-transparent">
                Web4
              </span>
              <span className="mx-3 text-[#C0E218]">&</span>
              <br className="md:hidden" />
              <span className="bg-clip-text bg-linear-to-r from-[#C0E218] to-[#C0E218]/70 text-transparent">
                {t("hero_title")}
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ========== Main Content ========== */}
      <article className="relative mx-auto max-w-4xl px-6 pb-32">
        {/* Dawn Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-lg leading-relaxed text-base-content/80 md:text-xl"
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-20"
            >
              {/* Section header */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#C0E218]/10 text-[#C0E218]">
                  <Icon className="size-7" />
                </div>
                <h2 className="text-2xl font-bold text-base-content md:text-3xl">
                  {t(`${section.id}_title`)}
                </h2>
              </div>

              <div className="space-y-5 text-lg leading-relaxed text-base-content/80 md:text-xl">
                {section.paragraphs.map((p) => (
                  <p key={p}>{t(`${section.id}_${p}`)}</p>
                ))}
              </div>
            </motion.section>
          )
        })}

        {/* ========== History Callout ========== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-2xl border border-[#C0E218]/20 bg-[#C0E218]/5 p-8 text-center md:p-12"
        >
          <p className="text-lg leading-relaxed text-base-content/80 md:text-xl">
            {t("history_p1")}
          </p>
        </motion.div>

        {/* ========== Our Stand ========== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-28"
        >
          {/* Divider */}
          <div className="mb-14 flex items-center gap-4">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#C0E218]/40 to-transparent" />
            <span className="text-sm font-medium tracking-widest text-[#C0E218] uppercase">
              Our Position
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#C0E218]/40 to-transparent" />
          </div>

          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            {t("position_title")}
          </h2>
          <p className="mx-auto mb-14 max-w-2xl text-center text-lg text-base-content/60">
            {t("position_desc")}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {stances.map((item, idx) => {
              const Icon = stanceIcons[idx]
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="group relative h-full rounded-2xl border border-base-content/10 bg-base-200/50 p-6 transition-all duration-300 hover:border-[#C0E218]/30 hover:bg-[#C0E218]/5">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#C0E218]/10 text-[#C0E218] transition-colors group-hover:bg-[#C0E218]/20">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-base-content">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-base-content/70">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 border-t border-base-content/10 pt-12 text-center"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-[#C0E218]/10 text-[#C0E218]">
              <RiRobot2Line className="size-6" />
            </div>
            <p className="text-lg font-medium leading-relaxed text-base-content/80 md:text-xl">
              {t("closing")}
            </p>
          </div>
        </motion.div>
      </article>
    </div>
  )
}
