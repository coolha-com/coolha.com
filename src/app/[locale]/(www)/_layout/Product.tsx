'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import {
  RiRobot2Line,
  RiChatAiLine,
  RiExchangeLine,
  RiFunctionLine,
  RiStore3Line,
  RiPuzzle2Line,
  RiCloudLine,
  RiImageLine,
} from 'react-icons/ri'
import {
  Card,
  CardIcon,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

/** Matches the motion used across coolha.com */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const iconMap = {
  chat: RiChatAiLine,
  execution: RiExchangeLine,
  factory: RiFunctionLine,
  marketplace: RiStore3Line,
  token_api: RiCloudLine,
  ecosystem: RiPuzzle2Line,
} as const

const featureKeys = [
  'chat',
  'execution',
  'factory',
  'marketplace',
  'token_api',
  'ecosystem',
] as const

/** The three real product screens shown in the product introduction below. */
const showcaseShots = [
  {
    src: '/showcase/01-ai-chat.png',
    width: 1436,
    height: 738,
    titleKey: 'showcase_1_title',
    descKey: 'showcase_1_desc',
  },
  {
    src: '/showcase/02-due-diligence.png',
    width: 1414,
    height: 734,
    titleKey: 'showcase_2_title',
    descKey: 'showcase_2_desc',
  },
  {
    src: '/showcase/03-rwa-market.png',
    width: 1394,
    height: 738,
    titleKey: 'showcase_3_title',
    descKey: 'showcase_3_desc',
  },
] as const

export default function Product() {
  const t = useTranslations('product')

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
            <span>{t('tag')}</span>
          </div>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-base-content md:text-4xl">
            {t('subtitle')}
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
      </div>

      {/* Product screens — same visual language as the rest of the site */}
      <Showcase />
    </section>
  )
}

function Showcase() {
  const t = useTranslations('product')
  const tw = useTranslations('www')

  return (
    <div id="product-showcase" className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C0E218]/4 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 md:px-12 md:pt-32">
        {/* Section header — matches the feature section above */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C0E218]/20 bg-[#C0E218]/10 px-4 py-1.5 text-sm font-medium text-[#C0E218]">
            <RiImageLine className="size-4" />
            <span>{t('showcase_eyebrow')}</span>
          </div>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-base-content md:text-4xl">
            {t('showcase_title')}
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-base-content/60 md:text-lg">
            {t('showcase_desc')}
          </p>
        </motion.div>

        {/* Screens */}
        <div className="mt-16 space-y-14 md:mt-24 md:space-y-20">
          {showcaseShots.map((shot, index) => (
            <motion.div
              key={shot.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 }}
            >
              <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-10">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs tracking-[0.2em] text-[#C0E218]/70">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-base-content md:text-2xl">
                    {t(shot.titleKey)}
                  </h3>
                </div>
                <p className="max-w-md text-sm font-light leading-relaxed text-base-content/60 md:text-right md:text-base">
                  {t(shot.descKey)}
                </p>
              </div>

              {/* same frame treatment as the rest of the site's product visuals */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative overflow-hidden rounded-2xl border border-base-content/10 bg-base-200/30 p-2 shadow-2xl transition-colors duration-300 hover:border-[#C0E218]/30"
              >
                <Image
                  src={shot.src}
                  alt={`${t(shot.titleKey)} — Coolha`}
                  width={shot.width}
                  height={shot.height}
                  sizes="(min-width: 1024px) 1100px, 100vw"
                  className="w-full rounded-xl"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Closing call to action — same button style as the header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mt-20 max-w-2xl text-center md:mt-28"
        >
          <h3 className="text-2xl font-bold tracking-tight text-base-content md:text-3xl">
            {t('showcase_closing_title')}
          </h3>
          <p className="mt-4 text-base font-light leading-relaxed text-base-content/60 md:text-lg">
            {t('showcase_closing_desc')}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-4xl px-8 text-base font-semibold"
            >
              <a href="https://app.coolha.com" target="_blank" rel="noreferrer">
                {tw('launch')}
              </a>
            </Button>
            <a
              href="mailto:connect@coolha.com"
              className="text-sm text-base-content/50 transition-colors duration-300 hover:text-base-content"
            >
              connect@coolha.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
