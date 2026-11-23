'use client'

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  RiArrowLeftRightLine,
  RiBankLine,
  RiBuildingLine,
  RiGlobalLine,
  RiLineChartLine,
  RiShieldCheckLine,
  RiCoinLine,
  RiPulseLine,
  RiContractLine,
  RiFingerprintLine,
} from "react-icons/ri";
import {
  Card,
  CardIcon,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Apple 式缓出，与首屏保持一致
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Hero 卡片：整体轻微下沉缩放归位，内容分层入场
const heroGroup: Variants = {
  hidden: { opacity: 0, scale: 0.99, y: 14 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    // delay 让背景图先以正常亮度完整展示，遮罩变暗后才浮出卡片；
    // delayChildren 用绝对时间（父级 delay 不会传递给子级）
    transition: { duration: 0.7, ease: EASE, delay: 2.9, delayChildren: 3.15, staggerChildren: 0.1 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

// 区块标题：滚动进入时上浮
const TITLE_MOTION = {
  initial: { y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.7, ease: EASE },
};

export default function RWAPage() {
  const t = useTranslations("rwa");

  const advantages = [
    {
      icon: RiArrowLeftRightLine,
      title: t("adv_liquidity_title"),
      desc: t("adv_liquidity_desc"),
    },
    {
      icon: RiShieldCheckLine,
      title: t("adv_trust_title"),
      desc: t("adv_trust_desc"),
    },
    {
      icon: RiLineChartLine,
      title: t("adv_friction_title"),
      desc: t("adv_friction_desc"),
    },
  ]

  const concepts = [
    { icon: RiCoinLine, title: t("concept_tokenization_title"), desc: t("concept_tokenization_desc") },
    { icon: RiPulseLine, title: t("concept_fractionalization_title"), desc: t("concept_fractionalization_desc") },
    { icon: RiContractLine, title: t("concept_contract_title"), desc: t("concept_contract_desc") },
    { icon: RiFingerprintLine, title: t("concept_provenance_title"), desc: t("concept_provenance_desc") },
  ]

  const useCases = [
    {
      title: t("use_case_real_estate_title"),
      desc: t("use_case_real_estate_desc"),
    },
    {
      title: t("use_case_bonds_title"),
      desc: t("use_case_bonds_desc"),
    },
    {
      title: t("use_case_commodities_title"),
      desc: t("use_case_commodities_desc"),
    },
    {
      title: t("use_case_carbon_title"),
      desc: t("use_case_carbon_desc"),
    },
  ]

  return (
    <main className="site-shell min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[100svh] min-h-[38rem] overflow-hidden">
        {/* 背景图：先以 scale(1) 完整交出全景，2.4s 后缓慢推近，再进入左右摇镜 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="hero-pan-layer">
            <Image
              src="/hongkong.jpg"
              alt=""
              width={1920}
              height={1080}
              priority
              fetchPriority="high"
              quality={80}
              sizes="(max-width: 1023px) 480vw, 160vw"
              className="hero-zoom-img"
            />
          </div>
        </div>

        {/* 遮罩：先以正常亮度展示全景 2.3s，再渐暗，为文字让出对比度 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.3, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 bg-black/55"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.3, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-black/55"
        />

        <div className="absolute inset-0 z-10">
          <div className="mx-auto w-full max-w-6xl px-6 pt-[86px] md:px-12 md:pt-[102px]">
            <motion.div
              variants={heroGroup}
              initial="hidden"
              animate="show"
              className="glass-panel-float mx-auto max-w-2xl rounded-[1.5rem] p-5 text-center sm:p-6 md:p-8"
            >
              <motion.div
                variants={heroItem}
                className="glass-panel mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium text-[#DDFD7A] sm:text-xs"
              >
                <RiGlobalLine className="size-3" />
                <span>{t("hero_tag")}</span>
              </motion.div>
              <motion.h1
                variants={heroItem}
                className="text-3xl font-semibold tracking-[-0.05em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.6)] sm:text-4xl md:text-5xl"
              >
                {t("hero_title")}<span className="text-[#C8F237]">{t("hero_title_highlight")}</span>
              </motion.h1>
              <motion.p
                variants={heroItem}
                className="mt-4 text-sm font-light leading-relaxed text-white/90 [text-shadow:0_1px_18px_rgba(0,0,0,0.55)] sm:text-base md:text-lg"
              >
                {t("hero_desc")}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is RWA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <motion.div
            initial={{ y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="glass-panel mb-20 rounded-3xl p-8 md:p-12"
          >
            <h2 className="mb-6 text-3xl font-semibold tracking-[-0.035em] text-[#DDFD7A] md:text-4xl">{t("definition_title")}</h2>
            <div className="space-y-4 text-lg leading-relaxed text-white/70">
              <p className="font-semibold text-white">
                {t("definition_intro")}
              </p>
              <p>
                {t("definition_desc")}
              </p>
            </div>
          </motion.div>
          <div className="grid items-center gap-14 md:grid-cols-2">
            <motion.div
              initial={{x: -34}}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-semibold tracking-[-0.035em] text-white md:text-4xl">{t("tokenization_title")}</h2>
              <div className="space-y-4 text-lg leading-relaxed text-white/70">
                <p>
                  {t("what_is_rwa_desc2")}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{scale: 0.94}}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              <Card variant="accent">
                <CardIcon variant="accent">
                  <RiBuildingLine className="size-6" />
                </CardIcon>
                <CardHeader>
                  <CardTitle>{t("physical_assets")}</CardTitle>
                </CardHeader>
                <CardDescription>{t("physical_assets_desc")}</CardDescription>
              </Card>
              <Card variant="accent" className="mt-8">
                <CardIcon variant="accent">
                  <RiBankLine className="size-6" />
                </CardIcon>
                <CardHeader>
                  <CardTitle>{t("financial_assets")}</CardTitle>
                </CardHeader>
                <CardDescription>{t("financial_assets_desc")}</CardDescription>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Concepts */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-12">
        <motion.div {...TITLE_MOTION} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">{t("concepts_title")}</h2>
          <p className="text-lg text-white/55">{t("concepts_subtitle")}</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {concepts.map((concept, idx) => (
            <motion.div
              key={concept.title}
              initial={{ y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: idx * 0.08 }}
            >
              <Card className="h-full">
                <CardIcon>
                  <concept.icon className="size-6" />
                </CardIcon>
                <CardHeader>
                  <CardTitle>{concept.title}</CardTitle>
                </CardHeader>
                <CardDescription>{concept.desc}</CardDescription>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Advantages */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-12">
        <motion.div {...TITLE_MOTION} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">{t("core_advantages_title")}</h2>
          <p className="text-lg text-white/55">{t("core_advantages_subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: idx * 0.1 }}
            >
              <Card>
                <CardIcon>
                  <feature.icon className="size-6" />
                </CardIcon>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardDescription>{feature.desc}</CardDescription>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-12">
        <motion.div {...TITLE_MOTION} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">{t("use_cases_title")}</h2>
          <p className="text-lg text-white/55">{t("use_cases_subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: idx * 0.1 }}
            >
              <Card variant="accent">
                <CardHeader>
                  <CardTitle className="text-[#C8F237]">{item.title}</CardTitle>
                </CardHeader>
                <CardDescription>{item.desc}</CardDescription>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Future Outlook */}
      <section className="relative overflow-hidden py-24">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12">
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="glass-panel-strong rounded-[2rem] p-9 md:p-14"
          >
            <h2 className="mb-6 text-3xl font-semibold tracking-[-0.035em] text-white md:text-4xl">{t("future_title")}</h2>
            <p className="mb-8 text-lg leading-relaxed text-white/72">
              {t("future_desc")}
            </p>
          </motion.div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl -z-10">
          <div className="absolute inset-0 rounded-full bg-[#C8F237]/8 blur-[100px]" />
        </div>
      </section>
    </main>
  )
}
