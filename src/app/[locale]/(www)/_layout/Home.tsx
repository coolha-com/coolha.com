// app/page.tsx
'use client';

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Product from "./Product";
import Absolute from "./Absolute";

// Apple 式缓出曲线：起步快、收尾极稳
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// 首屏编排：子元素依次入场
const intro: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.08, staggerChildren: 0.09 },
  },
};

// 文字层：模糊 + 上浮
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

// 右侧图形组：比文字稍晚起势，圆环逐层扩散
const orbGroup: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.2, staggerChildren: 0.1 },
  },
};

const ringIn: Variants = {
  hidden: { opacity: 0, scale: 0.68 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: EASE },
  },
};

const logoIn: Variants = {
  hidden: { opacity: 0, scale: 0.74, filter: "blur(14px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.15, ease: EASE },
  },
};

const dotIn: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 16 },
  },
};

export default function HomeContent() {
  const t = useTranslations("www");
  return (
    <main className="site-shell">
      <section className="relative flex min-h-[46rem] items-center overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,_rgb(200_242_55/10%),_transparent_45%),radial-gradient(ellipse_at_85%_80%,_rgb(168_214_40/9%),_transparent_50%)]" />
        <div className="pointer-events-none absolute -right-28 bottom-0 size-[32rem] rounded-full bg-[#C8F237]/8 blur-[120px]" />

        <motion.div
          variants={intro}
          initial="hidden"
          animate="show"
          className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:px-12 md:py-28"
        >
          <div className="order-2 max-w-2xl text-center md:order-1 md:text-left">
            <motion.h1
              variants={fadeUp}
              className="text-6xl font-semibold tracking-[-0.065em] text-[#C8F237] sm:text-7xl md:text-8xl"
            >
              Coolha
            </motion.h1>

            <div className="mt-9 space-y-3 text-pretty px-2 text-lg font-light leading-8 text-white/75 sm:text-xl lg:px-0">
              <motion.p variants={fadeUp}>{t("subtitle1")}</motion.p>
              <motion.p variants={fadeUp} className="text-white/57">{t("subtitle2")}</motion.p>
            </div>

            <motion.div variants={fadeUp} className="mt-10 flex justify-center md:justify-start">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex h-12 cursor-not-allowed items-center justify-center rounded-full bg-white/[0.09] px-7 text-sm font-semibold tracking-wide text-white/55"
              >
                <span>{t("launch")}</span>
              </button>
            </motion.div>
          </div>

          <motion.div
            variants={orbGroup}
            className="order-1 mx-auto flex aspect-square w-full max-w-[27rem] items-center justify-center md:order-2"
          >
            <motion.div variants={ringIn} className="absolute inset-[6%] rounded-full border border-white/10" />
            <motion.div variants={ringIn} className="absolute inset-[16%] rounded-full border border-[#C8F237]/20" />
            <motion.div variants={ringIn} className="absolute inset-[29%] rounded-full border border-white/10" />
            <motion.div
              variants={logoIn}
              whileHover={{ scale: 1.06, rotate: -3, transition: { type: "spring", stiffness: 260, damping: 20 } }}
              className="relative flex size-[62%] cursor-default items-center justify-center"
            >
              <Image
                src="/logo/logo.png"
                alt="Coolha"
                width={192}
                height={192}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 42vw, 192px"
                className="h-auto w-full drop-shadow-[0_24px_48px_rgba(200,242,55,0.22)]"
              />
            </motion.div>
            <motion.span
              variants={dotIn}
              className="absolute bottom-[17%] right-[9%] size-2.5 rounded-full bg-[#C8F237] shadow-[0_0_26px_7px_rgba(200,242,55,0.24)]"
            />
          </motion.div>
        </motion.div>
      </section>

      <Product />
      <Absolute />
    </main>
  );
}
