// app/page.tsx
'use client';

import Header from "@/app/(www)/_page/Header";
import Footer from "@/app/(www)/_page/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

//import LoadingDotsLogo from "@/gui/LoadingDotsLogo";


export default function Page() {
  return (
    <div className=" bg-base-100">
      <Header />

      <div className=" min-h-screen  bg-base-100 relative isolate overflow-hidden" /* style={{ backgroundImage: 'url(/repeated-square-dark.png)' }} */>
        <div className="hero-overlay bg-opacity-60"></div>


        <div className=" flex flex-col justify-center items-center text-center  text-neutral-content  mt-20">

          <img src="/logo/logo.png" alt="/logo/logo.png" className=' image-full w-2/5 md:w-60  m-4' />

          <div className="max-w-4xl ">
            <h1 className="text-5xl md:text-7xl font-bold mb-10"><span className="text-[#C0E218]  drop-shadow-[2px_2px_2px_black]">Coolha </span></h1>
            <p className="text-base-content  text-2xl">数字增长新动力，使更多用户连接到Web3世界 </p>
            <p className="text-base-content  text-2xl">为创作者、品牌、社区、组织赋能 </p>
            <p className='p-1 mb-5 text-base-content'>基于以太坊区块链第二层 Lens Chain 开发的去中心化社交应用</p>


            <div className='mt-5 self-center flex gap-2 w-full sm:w-auto flex-col sm:flex-row justify-center px-12'>
              <motion.div whileHover={{ scale: 1.05 }} >
                <Link href={'/home'} role="button" className="btn btn-outline text-base-content hover:btn-primary text-xl md:text-2xl font-bold rounded-full "  >
                  开始使用 →
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