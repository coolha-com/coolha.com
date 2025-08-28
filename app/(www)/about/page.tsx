// app/page.tsx
'use client';

import Header from "@/app/(www)/_page/Header";
import Footer from "@/app/(www)/_page/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

//import LoadingDotsLogo from "@/gui/LoadingDotsLogo";


export default function Page() {
  const t = useTranslations("about");
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
                {t("title")}
              </span>
            </h1>
            
            <div className="space-y-6 mb-12">
              <p className="text-base-content/90 text-lg md:text-xl font-light tracking-wide leading-8">
                {t("subtitle1")}
              </p>
              <p className="text-base-content/90 text-lg md:text-xl font-light tracking-wide leading-8">
                {t("subtitle2")}
              </p>
            </div>
            
            <div className="mb-10">
              <p className="text-base-content/70 text-base md:text-lg font-light leading-7 max-w-xl mx-auto tracking-wide">
                {t("description")}
              </p>
            </div>

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