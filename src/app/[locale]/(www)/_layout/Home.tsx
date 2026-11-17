// app/page.tsx
'use client';

import Image from "next/image";
import { useTranslations } from "next-intl";
import Product from "./Product";
import Absolute from "./Absolute";

export default function HomeContent() {
  const t = useTranslations("www");
  return (
    <div className=" bg-base-100">

      <div className=" min-h-screen  bg-base-100 relative isolate overflow-hidden">
        <div className="hero-overlay bg-opacity-60"></div>


        <div className=" flex flex-col justify-center items-center text-center  text-neutral-content  mt-20">

          <Image
            src="/logo/logo.png"
            alt="Coolha"
            width={192}
            height={192}
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 40vw, 192px"
            className="w-2/5 md:w-48 m-4 h-auto"
          />

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

            <div className="flex justify-center">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex cursor-default items-center border border-base-content/20 bg-transparent px-10 py-4 rounded-full text-lg font-light tracking-wider text-base-content backdrop-blur-sm disabled:cursor-default disabled:opacity-100"
              >
                <span>{t("launch")}</span>
              </button>
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


