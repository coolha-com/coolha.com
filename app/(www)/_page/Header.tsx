'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { RiCloseLargeFill, RiMenuFill, RiMoonLine, RiSunLine, RiTranslate } from "react-icons/ri";
import Image from "next/image";
import { useTheme } from "next-themes";
import MediaLink from "./MediaLink";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import ThemeSwap from "@/components/ui/ThemeSwap";
import { useTranslations } from "next-intl";
export default function Header() {
    const t = useTranslations('header');
    return (
        <div className="min-w-80 w-screen bg-base-100 justify-around  z-50  flex  fixed top-0 left-0 right-0 transition-transform duration-300 px-2">
            <div className="navbar  max-w-7xl mx-auto  ">


                <div className="navbar-start">{/* 左 */}
                    <Link href={'/about'} className="border-base-content">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Image src="/logo/logo.png" alt="logo.png" width={42} height={42} className=" rounded-full " />
                        </motion.div>
                    </Link>

                    <ul className="menu menu-horizontal px-1 gap-4 hidden md:flex">
                        {/* <li><LinkNavbar href='/' Name='首页' /></li> */}
                        <LinkMenu />
                    </ul>
                    
                </div>

                {/* 手机隐藏navbar-center */}
                <div className="navbar-center hidden md:flex">{/* 中 */}
           
                </div>

                {/* 按钮 */}
                <div className="navbar-end gap-1">{/* 右 */}
                    <ThemeSwap />
                    <LanguageSwitcher />
                    <Link href={'/home'} role="button" className=" hidden md:flex btn btn-primary text-lg font-bold rounded-full " >
                        {t("launch")}
                    </Link>
                    <div className="dropdown dropdown-end flex-row flex gap-2">
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <label tabIndex={1} role="button" className="md:hidden btn  btn-square btn-ghost rounded-full ">
                                <RiMenuFill className=" w-7 h-7 swap-off" />
                            </label>

                            <ul tabIndex={1} className="dropdown-content menu bg-base-100 rounded-box border gap-2 z-1 min-w-72 max-w-96 p-2 shadow">
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
    const t = useTranslations('header');

    return (
        <>
            <li>
                <Link href={'/home'} role="button" className="md:hidden btn btn-primary text-lg font-bold rounded-full " >
                    {t("launch")}
                </Link>
            </li>


            <li className="text-lg">
                <Link href={`/about_company`} prefetch={false}>
                    {t("about_company")}
                </Link>
            </li>

            {/*             <li className=" text-lg">
                <Link href={`#footer-media`} >
                    {t("media")}
                </Link>
            </li> */}

            <li className="text-lg">
                <Link href={`https://link3.to/coolha`} target='_blank'>
                    {t("contact")}↗
                </Link>
            </li>

            <li className="text-lg">
                <Link href={`https://docs.coolha.com`} target='_blank'>
                    {t("docs")}↗
                </Link>
            </li>




        </>
    );
}
