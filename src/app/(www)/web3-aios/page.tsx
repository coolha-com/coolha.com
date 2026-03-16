'use client'

import { motion } from "framer-motion"
import { useTranslations } from "next-intl";

export default function page() {
    const t = useTranslations("web3-aios");
    return (
        <>

            <section className="py-24 px-6 md:px-12 bg-base-200 text-base-content relative overflow-hidden">
                <div className="max-w-5xl mx-auto space-y-24">

                    {/* Introduction */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                            {t.rich('web3_ai_company_os', {
                                green: (chunks) => <span className="text-[#C0E218]">{chunks}</span>
                            })}
                        </h2>

                        <p className="text-lg leading-relaxed max-w-2xl mx-auto text-base-content/70">
                            {t("ai_rise_desc")}
                        </p>
                    </motion.div>

                    {/* New Model */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-base-100 p-8 md:p-12 rounded-3xl border border-base-content/5 shadow-2xl relative"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C0E218] to-transparent opacity-50"></div>
                        <div className="text-center space-y-8">
                            <h3 className="text-2xl md:text-3xl font-semibold">{t("new_work_model_title")}</h3>

                            <div className="py-8">
                                <span className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-base-content to-[#C0E218]">
                                    {t("one_person_one_company")}
                                </span>
                            </div>

                            <p className="text-lg md:text-xl text-base-content/80 leading-relaxed max-w-3xl mx-auto">
                                {t("model_desc")}
                            </p>
                        </div>
                    </motion.div>

                    {/* Vision & Comparison */}
                    <div className="space-y-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h3 className="text-3xl md:text-5xl font-bold italic tracking-wide text-[#C0E218] drop-shadow-sm">
                                "{t("empower_individual")}"
                            </h3>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                            <motion.div
                                initial={{ x: -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="p-8 rounded-2xl bg-base-100/50 border border-base-content/5"
                            >
                                <h4 className="text-xl font-semibold mb-4 text-base-content/60">{t("in_the_past")}</h4>
                                <p className="text-lg">{t("past_startup_desc")}</p>
                            </motion.div>

                            <motion.div
                                initial={{ x: 30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="p-8 rounded-2xl bg-[#C0E218]/10 border border-[#C0E218]/20"
                            >
                                <h4 className="text-xl font-semibold mb-4 text-[#C0E218]">{t("in_ai_era")}</h4>
                                <p className="text-lg font-medium">{t("ai_startup_desc")}</p>
                            </motion.div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="text-center text-xl md:text-2xl font-light leading-relaxed max-w-4xl mx-auto pt-8 border-t border-base-content/10"
                        >
                            {t("conclusion_desc")}
                        </motion.p>
                    </div>

                </div>
            </section>
        </>
    )
}