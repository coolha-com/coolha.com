'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RiBardLine, RiUserFollowLine, RiShapesLine, RiFileTextLine, RiImageLine, RiMusic2Line, RiVideoLine, RiSearchLine } from "react-icons/ri";

export default function Linknav() {
    const pathname = usePathname();
    const router = useRouter();
    const linknav = [
        {
            href: "/home/foryou",
            name: "推荐",
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
/*         {
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
        } */
    ]
    return (
        <>
            <div className=" fixed top-0 md:hidden flex flex-row w-dvw max-w-3xl z-50 h-12  items-center  ">
                <div className="navbar w-full min-h-12 p-0 px-2 bg-base-100 z-50">
                    <div className="navbar-start gap-1">
                        <Link href={`/home`} >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <img src='/favicon.ico' className="w-9 h-9 rounded-full " alt='Coolha' />
                            </motion.div>
                        </Link>
                        <button className="p-1 btn btn-ghost btn-circle" onClick={() => router.push(`/search`)}>
                            <RiSearchLine className="w-7 h-7 " />
                        </button>
                    </div>
                    <div className="navbar-center"></div>
                    <div className="navbar-end">{/* <AuthButton /> */}</div>
                </div>
            </div>

            {/* 类型 */}
            <div className="flex flex-row-reverse mx-auto  max-w-3xl  items-center justify-center z-40 h-10 md:h-12 mt-12 md:mt-0 ">
                {linknav.slice(0, 3).map((item) => (
                    <div className='mx-auto  w-1/3  z-20 flex flex-row-reverse ' key={item.href}>

                        <Link href={item.href} className={`z-20 flex flex-row  items-center justify-center w-full h-10 md:h-12  text-[#878787] border-b-0 bg-base-100 hover:bg-base-content/5 ${pathname === item.href ? 'text-info  border-b-info border-b-2' : ''}`}>
                            <span className=' justify-center text-base xs:text-2xl sm:text-3xl z-20'> {item.logo} </span>
                            <p className="text-sm text-inherit z-20 text-center md:text-base md:ml-1 hidden xs:flex ">{item.name}</p>
                        </Link>

                    </div>
                ))}
            </div>

            <div className="w-full mx-auto max-w-3xl">
                {/* <ButtonList /> */}
            </div>
        </>
    )
}