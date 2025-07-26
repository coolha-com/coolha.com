'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { RiCloseLargeFill, RiMenuFill, RiMoonLine, RiSunLine, RiTranslate } from "react-icons/ri";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import MediaLink from "./MediaLink";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import ThemeSwap from "@/components/ui/ThemeSwap";
export default function Header() {
    return (
        <div className="min-w-80 w-screen bg-base-100 justify-around  z-50  flex  fixed top-0 left-0 right-0 transition-transform duration-300 px-2">
            <div className="navbar  max-w-screen-xl mx-auto  ">


                <div className="navbar-start">{/* 左 */}
                    <Link href={'/about'} className="border-base-content">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Image src="/logo/logo.png" alt="logo.png" width={42} height={42} className=" rounded-full " />
                        </motion.div>
                    </Link>
                </div>

                {/* 手机隐藏navbar-center */}
                <div className="navbar-center hidden md:flex">{/* 中 */}
                    <ul className="menu menu-horizontal px-1 gap-4">
                        {/* <li><LinkNavbar href='/' Name='首页' /></li> */}
                        <LinkMenu />
                    </ul>
                </div>

                {/* 按钮 */}
                <div className="navbar-end gap-1">{/* 右 */}
                    <ThemeSwap />
                   <LanguageSwitcher />
                    <Link href={'/home'} role="button" className=" hidden md:flex btn btn-primary text-lg font-bold rounded-full " >
                        启动
                    </Link>
                    <div className="dropdown dropdown-end flex-row flex gap-2">
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <label tabIndex={1} role="button" className="md:hidden btn  btn-square btn-ghost rounded-full ">
                                <RiMenuFill className=" w-7 h-7 swap-off" />
                            </label>

                            <ul tabIndex={1} className="dropdown-content menu bg-base-100 rounded-box border gap-2 z-[1] min-w-72 max-w-96 p-2 shadow">
                                {/* <li><LinkNavbar href='/' Name='首页' /></li> */}
                                <LinkMenu />
                            </ul>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}
function LinkNavbar({ href, Name }: any) {
    const pathname = usePathname();
    return (
        <Link href={href} className={`header_link text-lg ${pathname === `${href}` ? "active" : ""
            }`}>
            {Name}
        </Link>
    )
}


function LinkMenu() {
    const [isMdScreen, setIsMdScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        const handleResize = () => setIsMdScreen(mediaQuery.matches);

        // 初始化时检查屏幕大小
        handleResize();

        // 添加监听器
        mediaQuery.addEventListener("change", handleResize);
        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    const handleMouseEnter = (event: React.MouseEvent<HTMLDetailsElement>) => {
        if (isMdScreen) {
            event.currentTarget.setAttribute("open", "true");
        }
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLDetailsElement>) => {
        if (isMdScreen) {
            event.currentTarget.removeAttribute("open");
        }
    };

    return (
        <>
            <li>
                <Link href={'/home'} role="button" className="md:hidden btn btn-primary text-lg font-bold rounded-full " >
                    启动
                </Link>
            </li>

            <li>
                <details className="relative text-lg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                    <summary className="cursor-pointer">媒体</summary>
                    <ul className="w-52 bg-base-100 md:absolute md:top-7 md:left-0 md:border md:rounded-2xl md:shadow-lg md:z-10">
                        <div className="grid grid-flow-row grid-cols-3 gap-4 p-2">
                            <MediaLink />
                        </div>

                    </ul>
                </details>
            </li>

            <li>
                <details className="relative text-lg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                    <summary className="cursor-pointer">信息</summary>
                    <ul className="w-56 bg-base-100 md:absolute md:top-7 md:left-0 md:border md:rounded-2xl md:shadow-lg md:z-10">
                        <li> <Link href={`/about_us`} prefetch={false}>关于我们</Link></li>
                        <li> <Link href={`https://link3.to/coolha`} target='_blank'>联系</Link></li>
                        <li>  <Link href={`https://coolha-com.larksuite.com/base/Uq2HbmW8hasT3ksO7cquMgFWs2w?table=tblTSPWUJqLQjdTI&view=vewOlmHa88`} target='_blank'>反馈</Link></li>
                    </ul>
                </details>
            </li>

            <li>
                <details className="relative text-lg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <summary className="cursor-pointer">资源</summary>
                    <ul className="w-56 bg-base-100 md:absolute md:top-7 md:left-0 md:border md:rounded-2xl md:shadow-lg md:z-10">
                        <li> <Link href={`https://docs.coolha.com`} target='_blank'>文档</Link></li>
                        <li><Link href="https://docs.coolha.com/apps/privacy" target='_blank'>隐私</Link></li>
                        <li><Link href="https://docs.coolha.com/apps/terms" target='_blank'>条款</Link></li>
                    </ul>
                </details>
            </li>



        </>
    );
}
