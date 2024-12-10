'use client'

import AuthButton from "@/components/header/AuthButton";
import { useSession } from "@lens-protocol/react-web";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RiBardLine, RiUserFollowLine, RiShapesLine, RiFileTextLine, RiImageLine, RiMusic2Line, RiVideoLine, RiSearchLine, RiApps2Line } from "react-icons/ri";
import ButtonList from "../home/_contexts/ButtonList";

export default function Linknav() {
    const pathname = usePathname();
    const router = useRouter();

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
        },
        {
            href: "/find",
            name: "活动",
            logo: <RiApps2Line />
        }
    ]
    return (
        <>

            {/* 类型 */}
            <div className="flex flex-row-reverse w-full  max-w-3xl mx-auto  items-center justify-center z-40 h-12 ">
                {linknav.map((item) => (
                    <div className='mx-auto  w-1/3  z-20 flex flex-row-reverse tabs tabs-bordered' key={item.href}>

                        <Link href={item.href} className={`z-20 flex flex-row  items-center justify-center w-full h-12  text-[#878787] border-b-0 bg-base-100 hover:bg-[--link-hover-background] ${pathname === item.href ? 'text-info  border-b-info border-b-2' : ''}`}>
                            <div className=' justify-center text-xl xs:text-2xl sm:text-3xl z-20'> {item.logo} </div>
                            <p className="text-sm text-inherit z-20 text-center md:text-base md:ml-1 hidden xs:flex ">{item.name}</p>
                        </Link>

                    </div>
                ))}
            </div>


            <div className={`w-full mx-auto max-w-3xl ${pathname === '/find' && 'hidden'}`}>
                <ButtonList />
            </div>
        </>
    )
}
