'use client'


import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
    RiBuilding4Line,
    RiGlobalLine,
    RiShieldKeyholeLine,
    RiFundsLine,
    RiLineChartLine,
    RiExchangeFundsLine
} from "@remixicon/react";

export default function RWAPage() {
    const t = useTranslations("rwa");

    return (
        <div className="bg-base-100 min-h-screen">

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/hongkong.jpg')] bg-cover bg-center bg-no-repeat pointer-events-none" />
                <div className="absolute inset-0 bg-black/15 dark:bg-black/55 pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-b from-black/50 dark:from-black/60 via-black/50 to-black/50 dark:to-black/60 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C0E218]/15 text-[#D6F44A] border border-[#C0E218]/35 text-sm font-medium mb-4 backdrop-blur-sm">
                            <RiGlobalLine className="w-4 h-4" />
                            <span>{t("hero_tag")}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
                            {t("hero_title")}<span className="text-[#C0E218]">{t("hero_title_highlight")}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/85 font-light leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
                            {t("hero_desc")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* What is RWA Section */}
            <section className="py-20 bg-base-200/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 bg-linear-to-br from-[#C0E218]/5 to-base-200 p-8 rounded-2xl border border-[#C0E218]/20">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#C0E218]">{t("definition_title")}</h2>
                        <div className="space-y-4 text-lg text-base-content/80 leading-relaxed">
                            <p className="font-semibold text-base-content">
                                {t("definition_intro")}
                            </p>
                            <p>
                                {t("definition_desc")}
                            </p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold">{t("what_is_rwa_title")}</h2>
                            <div className="space-y-4 text-lg text-base-content/80 leading-relaxed">
                                <p>
                                    {t("what_is_rwa_desc1")}
                                </p>
                                <p>
                                    {t("what_is_rwa_desc2")}
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="p-6 bg-base-100 rounded-2xl border border-base-content/5 space-y-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <RiBuilding4Line className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-lg">{t("physical_assets")}</h3>
                                <p className="text-sm text-base-content/60">{t("physical_assets_desc")}</p>
                            </div>
                            <div className="p-6 bg-base-100 rounded-2xl border border-base-content/5 space-y-4 mt-8">
                                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                    <RiFundsLine className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-lg">{t("financial_assets")}</h3>
                                <p className="text-sm text-base-content/60">{t("financial_assets_desc")}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Advantages */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold">{t("core_advantages_title")}</h2>
                    <p className="text-lg text-base-content/70">{t("core_advantages_subtitle")}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: RiExchangeFundsLine,
                            title: t("adv_liquidity_title"),
                            desc: t("adv_liquidity_desc")
                        },
                        {
                            icon: RiShieldKeyholeLine,
                            title: t("adv_trust_title"),
                            desc: t("adv_trust_desc")
                        },
                        {
                            icon: RiLineChartLine,
                            title: t("adv_friction_title"),
                            desc: t("adv_friction_desc")
                        }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-3xl bg-base-100 border border-base-content/10 hover:border-[#C0E218]/50 transition-colors group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center mb-6 group-hover:bg-[#C0E218]/10 group-hover:text-[#C0E218] transition-colors">
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-base-content/70 leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* AEO: Use Cases Section */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold">{t("use_cases_title")}</h2>
                    <p className="text-lg text-base-content/70">{t("use_cases_subtitle")}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl bg-base-100 border border-base-content/10"
                    >
                        <h3 className="text-xl font-bold mb-4 text-[#C0E218]">{t("use_case_real_estate_title")}</h3>
                        <p className="text-base-content/70">{t("use_case_real_estate_desc")}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-8 rounded-2xl bg-base-100 border border-base-content/10"
                    >
                        <h3 className="text-xl font-bold mb-4 text-[#C0E218]">{t("use_case_bonds_title")}</h3>
                        <p className="text-base-content/70">{t("use_case_bonds_desc")}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-8 rounded-2xl bg-base-100 border border-base-content/10"
                    >
                        <h3 className="text-xl font-bold mb-4 text-[#C0E218]">{t("use_case_commodities_title")}</h3>
                        <p className="text-base-content/70">{t("use_case_commodities_desc")}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="p-8 rounded-2xl bg-base-100 border border-base-content/10"
                    >
                        <h3 className="text-xl font-bold mb-4 text-[#C0E218]">{t("use_case_carbon_title")}</h3>
                        <p className="text-base-content/70">{t("use_case_carbon_desc")}</p>
                    </motion.div>
                </div>
            </section>

            {/* Future Outlook */}
            <section className="py-20 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-12 rounded-[2.5rem] bg-linear-to-br from-base-200 to-base-100 border border-base-content/5 shadow-2xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("future_title")}</h2>
                        <p className="text-lg text-base-content/80 leading-relaxed mb-8">
                            {t("future_desc")}
                        </p>
                    </motion.div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl -z-10">
                    <div className="absolute inset-0 bg-[#C0E218]/5 blur-[100px] rounded-full" />
                </div>
            </section>

        </div>
    )
}
