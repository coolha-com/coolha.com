'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { RiAccountCircleFill, RiBardLine, RiFileTextLine, RiImageLine, RiMenuLine, RiMusic2Line, RiSearchLine, RiShapesLine, RiUserFollowLine, RiVideoLine } from 'react-icons/ri'
import ButtonList from '../(Nav)/home/_contexts/ButtonList';
import { OrderByProvider } from '../(Nav)/home/_contexts/OrderByContext';
import Header from '@/components/header/Header';
import Navbar from '@/components/header/Navbar';
import NavHeader from '@/components/header/NavHeader';
import { useState, useEffect } from 'react';



export default function HomeLayout({ children }) {
  const pathname = usePathname();
  const linknav = [
    {
      href: "/find/article",
      name: "文章",
      logo: <RiFileTextLine />
    },
    {
      href: "/find/image",
      name: "图片",
      logo: <RiImageLine />
    },
    {
      href: "/find/music",
      name: "音乐",
      logo: <RiMusic2Line />
    },
    {
      href: "/find/video",
      name: "视频",
      logo: <RiVideoLine />
    }
  ]
  return (
    <>
      <Header />
      <div className="h-0 md:h-16" />
      <NavHeader />
      <div className=' min-h-[calc(100dvh-4rem)] '>
        <div className="    flex flex-col ">


          {/* 类型 */}
          <div className="flex flex-row-reverse w-full  max-w-3xl mx-auto  items-center justify-center z-40 h-10 md:h-12 ">
            {linknav.map((item) => (
              <div className='mx-auto  w-1/3  z-20 flex flex-row-reverse tabs tabs-bordered' key={item.href}>

                <Link href={item.href} className={`z-20 flex flex-row  items-center justify-center w-full h-10 md:h-12  text-[#878787] border-b-0 bg-base-100 hover:bg-[--link-hover-background] ${pathname === item.href ? 'text-info  border-b-info border-b-2' : ''}`}>
                  <div className=' justify-center text-base xs:text-2xl sm:text-3xl z-20'> {item.logo} </div>
                  <p className="text-sm text-inherit z-20 text-center md:text-base md:ml-1 hidden xs:flex ">{item.name}</p>
                </Link>

              </div>
            ))}
          </div>






          <OrderByProvider>
            <div className='w-full mx-auto max-w-3xl'>
              <ButtonList />
            </div>
            <div className='w-full'>
              {children}
            </div>
          </OrderByProvider>

          {/* <CreatePos /> */}


        </div>
      </div>
      <Navbar />
    </>

  )
}


