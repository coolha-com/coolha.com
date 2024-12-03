'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { RiAccountCircleFill, RiBardLine, RiFileTextLine, RiImageLine, RiMenuLine, RiMusic2Line, RiSearchLine, RiShapesLine, RiUserFollowLine, RiVideoLine } from 'react-icons/ri'
import { OrderByProvider } from './_contexts/OrderByContext';
import ButtonList from './_contexts/ButtonList';
import CreatePos from '@/components/lnes/PosCreate/CreatePos';
import { useState } from 'react';
import Image from "next/image";
import { motion } from 'motion/react';
import { SessionType, useSession } from '@lens-protocol/react-web';
import Auth from '@/components/header/AuthButton';
import AuthButton from '@/components/header/AuthButton';


export default function HomeLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, loading } = useSession();
  const linknav = [
    {
      href: "/home/foryou",
      name: "给你",
      logo: <RiBardLine />
    },
    {
      href: "/home/following",
      name: "关注",
      logo: <RiUserFollowLine />
    },
    {
      href: "/home",
      name: "全部",
      logo: <RiShapesLine />
    },
    {
      href: "/home/article",
      name: "文章",
      logo: <RiFileTextLine />
    },
    {
      href: "/home/image",
      name: "图片",
      logo: <RiImageLine />
    },
    {
      href: "/home/music",
      name: "音乐",
      logo: <RiMusic2Line />
    },
    {
      href: "/home/video",
      name: "视频",
      logo: <RiVideoLine />
    }
  ]
  return (
    <div className="mx-auto max-w-3xl lg:justify-center pb-14 flex flex-col ">

      <div className=" fixed md:hidden flex flex-row w-full max-w-3xl z-50 h-12  items-center  ">
        <div className="navbar w-full min-h-12 p-0 px-2 bg-base-100 z-50">
          <div className="navbar-start gap-1">
            <Link href={`/home#hometop`} >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <img src='/favicon.ico' className="w-9 h-9 rounded-full " alt='Coolha' />
              </motion.div>
            </Link>
            <button className="p-1 rounded-full hover:bg-[var(--button-bg)]" onClick={() => router.push(`/search`)}>
              <RiSearchLine className="w-7 h-7 " />
            </button>
          </div>
          <div className="navbar-center"></div>
          <div className="navbar-end"><AuthButton /></div>
        </div>
      </div>

      {/* 类型 */}
      <div className="flex flex-row-reverse w-full max-w-3xl z-40 h-10 md:h-12 mt-12 md:mt-0  items-center  ">
        {linknav.slice(0, 3).map((item) => (
          <div className='mx-auto  w-1/3  z-20 flex flex-row-reverse ' key={item.href}>

            <Link href={item.href} className={`z-20 flex flex-row  items-center justify-center w-full h-10 md:h-12  text-[#878787] border-b-0 bg-base-100 hover:bg-[--link-hover-background] ${pathname === item.href ? 'text-info  border-b-info border-b-2' : ''}`}>
              <div className=' justify-center text-base xs:text-2xl sm:text-3xl z-20'> {item.logo} </div>
              <p className="text-sm text-inherit z-20 text-center md:text-base md:ml-1 hidden xs:flex ">{item.name}</p>
            </Link>

          </div>
        ))}
      </div>

      {/* 小屏幕显示的菜单按钮 */}
      {/*       <div className=" lg:hidden flex-row  max-w-3xl h-8 xs:h-16  items-center  ">
        <button
          className="lg:hidden bg-base-100 text-info p-2 rounded-full"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <RiMenuLine className="text-2xl" />
        </button>
      </div>


      <aside id="logo-sidebar" aria-label="Sidebar"
        className={`fixed top-16 left-0 z-40 h-screen transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full '} `}>

        <div className="h-full xl:px-1 py-2 overflow-y-auto bg-base-100 ">

          <ul className=" menu">
            {linknav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setSidebarOpen(false)} // 点击后自动关闭侧边栏
                  className={`flex items-center my-1 flex-col sm:flex-row  text-[#878787]  ${pathname === item.href ? 'text-primary' : ''}`}
                >
                  <div className=' justify-center text-base xs:text-2xl sm:text-3xl z-20'> {item.logo} </div>
                  <span className=" hidden lg:flex text-sm text-inherit z-20 text-center md:text-base md:ml-1  ">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </aside> */}



      <OrderByProvider>
        <ButtonList />
        <div className=''>
          {children}
        </div>
      </OrderByProvider>
      {/* <CreatePos /> */}


    </div>
  )
}


