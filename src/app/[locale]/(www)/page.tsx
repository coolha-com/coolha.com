// app/page.tsx
'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Product from "./_layout/Product";
import Absolute from "./_layout/Absolute";

//import LoadingDotsLogo from "@/gui/LoadingDotsLogo";


export default function Page() {
  const t = useTranslations("www");
  return (
    <div className=" bg-base-100">

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

            <div className="space-y-4 mb-12 px-6">
              <p className="text-base-content/90 text-lg md:text-xl font-light tracking-wide leading-8">
                {t("subtitle1")}
              </p>
              <p className="text-base-content/90 text-lg md:text-xl font-light tracking-wide leading-8">
                {t("subtitle2")}
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
                  href="https://app.coolha.com"
                  target="_blank"
                  className="group inline-flex items-center gap-3 bg-transparent border border-base-content/20 hover:border-[#C0E218] text-base-content hover:text-[#C0E218] px-10 py-4 rounded-full text-lg font-light tracking-wider transition-all duration-500 hover:shadow-[0_0_30px_rgba(192,226,24,0.3)] backdrop-blur-sm"
                >
                  <span>{t("launch")}</span>
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


        {/* 产品介绍 */}
        <Product />

        <Absolute />
      </div>



    </div>
  );
}


