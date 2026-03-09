// app/page.tsx
'use client';

import Header from "@/app/(www)/_page/Header";
import Footer from "@/app/(www)/_page/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

//import LoadingDotsLogo from "@/gui/LoadingDotsLogo";


export default function Page() {
  const t = useTranslations("www");
  return (
    <div className=" bg-base-100">
      <Header />

      <div className=" min-h-screen  bg-base-100 relative isolate overflow-hidden" /* style={{ backgroundImage: 'url(/repeated-square-dark.png)' }} */>
        <div className="hero-overlay bg-opacity-60"></div>


        <div className=" flex flex-col justify-center items-center text-center  text-neutral-content  mt-20">

          <img src="/logo/logo.png" alt="/logo/logo.png" className=' image-full w-2/5 md:w-48  m-4' />

          <div className="max-w-4xl ">
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-[#C0E218] drop-shadow-[2px_2px_2px_black]">
                Coolha
              </span>
            </h1>

            <div className="space-y-4 mb-12">
              <p className="text-base-content/90 text-lg md:text-xl font-light tracking-wide leading-8">
                {t("subtitle1")}
              </p>
              <p className="text-base-content/90 text-lg md:text-xl font-light tracking-wide leading-8">

              </p>
            </div>

            {/*             <div className="mb-10">
              <p className="text-base-content/70 text-base md:text-lg font-light leading-7 max-w-xl mx-auto tracking-wide">
                {t("description")}
              </p>
            </div> */}

            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/home"
                  className="group inline-flex items-center gap-3 bg-transparent border border-base-content/20 hover:border-[#C0E218] text-base-content hover:text-[#C0E218] px-10 py-4 rounded-full text-lg font-light tracking-wider transition-all duration-500 hover:shadow-[0_0_30px_rgba(192,226,24,0.3)] backdrop-blur-sm"
                >
                  <span>{t("开始使用")}</span>
                  <motion.span
                    className="text-xl"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>


        </div>


        <Absolute />
      </div>

      {/* New Content Section */}
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

      <Footer />
    </div>
  );
}

function Absolute() {
  return (
    <div>
      <div className="absolute left-1/3 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/1000] w-[72.1875rem] bg-gradient-to-tr from-[#C0E218]  opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="absolute left-2/3 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/1155] w-[72.1875rem] bg-gradient-to-tr from-[#C0E218] to-[#C0E218] opacity-10"
          style={{
            clipPath:
              'polygon(14.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 87.5% 58.3%, 85.2% 14.5%, 27.5% 76.7%, 0.1% 14.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
}