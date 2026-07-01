'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import {
  RiRobot2Line,
  RiChatAiLine,
  RiExchangeLine,
  RiFunctionLine,
  RiStore3Line,
  RiPuzzle2Line,
  RiCloudLine,
} from "react-icons/ri"
import {
  Card,
  CardIcon,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

const iconMap = {
  chat: RiChatAiLine,
  execution: RiExchangeLine,
  factory: RiFunctionLine,
  marketplace: RiStore3Line,
  token_api: RiCloudLine,
  ecosystem: RiPuzzle2Line,
} as const

const featureKeys = [
  "chat",
  "execution",
  "factory",
  "marketplace",
  "token_api",
  "ecosystem",
] as const

export default function Product() {
  const t = useTranslations("product")

  return (
    <section className="relative overflow-hidden bg-base-100 py-24 md:py-32">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C0E218]/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:mb-24"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C0E218]/20 bg-[#C0E218]/10 px-4 py-1.5 text-sm font-medium text-[#C0E218]">
            <RiRobot2Line className="size-4" />
            <span>{t("tag")}</span>
          </div>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-base-content md:text-4xl">
            {t("subtitle")}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((key, index) => {
            const Icon = iconMap[key]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex"
              >
                <Card className="flex w-full flex-col">
                  <CardIcon>
                    <Icon className="size-6" />
                  </CardIcon>
                  <CardHeader>
                    <CardTitle>{t(`feature_${key}_title`)}</CardTitle>
                  </CardHeader>
                  <CardDescription className="flex-1">
                    {t(`feature_${key}_desc`)}
                  </CardDescription>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Showcase Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-24 flex justify-center"
        >
          <div className="relative w-full max-w-5xl rounded-2xl border border-base-content/10 bg-base-200/30 p-2 shadow-2xl">
            <Image
              src="/DAPPimg.png"
              alt={t("showcase_alt")}
              width={1920}
              height={1080}
              className="w-full rounded-xl"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
