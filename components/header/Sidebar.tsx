'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RiHomeFill, RiHomeLine, RiCompass3Fill, RiCompass3Line, RiChat1Fill, RiChat1Line, RiUserFill, RiUserLine, RiSettingsLine, RiSunLine, RiMoonClearLine, RiSearchLine, RiMenu2Fill, RiMoonLine } from "react-icons/ri";
import AuthButton from "./AuthButton";
import ButtonMenu from "./ButtonMenu";
import { motion } from "motion/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState } from "react";
export default function Sidebar() {
    return (
        <div className=" hidden md:block min-h-full max-w-16 xl:max-w-56 fixed top-0 left-0 z-50">


            <div className="h-svh z-50">
                <ul className="menu bg-base-100 min-h-full w-full  gap-1 z-50">
                    <Logo />
                    <Search />
                    <NavbarLink />
                    <div className="mt-auto">
                        <AuthButton />
                    </div>
                    <div className="">
                        <Linkabout />
                    </div>
                </ul>
            </div>

        </div>
    )
}
function Logo() {
    return (
        <div className="max-h-12">

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={`/home`} className="flex flex-row items-center justify-center gap-2 ">
                    <div className="max-h-12">
                        <img src='/favicon.ico' className="w-12 h-12 rounded-full " alt='Q' />
                    </div>
                    <div className="text-3xl font-bold xl:block hidden">
                        Coolha
                    </div>
                </Link>
            </motion.div>
        </div>
    )
}
function Search() {
    const pathname = usePathname();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && searchQuery.trim()) {
            router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push("/search");
        }
    };

    const handleButtonClick = () => {
        if (searchQuery.trim()) {
            router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push("/search");
        }
    };
    return (
        <>
            <div className="my-1">
                <label className="input input-bordered xl:flex items-center w-40 hidden">
                    <span className="btn btn-ghost btn-circle btn-sm " onClick={handleButtonClick}>
                        <RiSearchLine className=" size-5 " />
                    </span>
                    <input type="text" className="grow" placeholder="搜索" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} />

                </label>
            </div>
            <div role="button" className={`btn btn-ghost btn-circle flex xl:hidden ${pathname && pathname.startsWith('/search') && "bg-[var(--button-bg)]  "}`} onClick={handleButtonClick}>
                <RiSearchLine className=" size-7 " />
            </div>
        </>
    )
}
function NavbarLink() {
    const pathname = usePathname();
    const links = [
        {
            title: '首页',
            href: '/home',
            iconActive: RiHomeFill,
            iconInactive: RiHomeLine,
            startsWith: '/home'
        },
        {
            title: '发现',
            href: '/find',
            iconActive: RiCompass3Fill,
            iconInactive: RiCompass3Line,
            startsWith: '/find'
        },
        {
            title: '消息',
            href: '/message/chat',
            iconActive: RiChat1Fill,
            iconInactive: RiChat1Line,
            startsWith: '/message'
        },
        {
            title: '用户',
            href: '/profile',
            iconActive: RiUserFill,
            iconInactive: RiUserLine,
            startsWith: '/profile'
        }
    ];
    return (
        <>
            {links.map(link => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={`xl:w-40 btn btn-ghost btn-circle xl:justify-start xl:pl-2  ${pathname && pathname.startsWith(link.startsWith) && "bg-[var(--button-bg)]  "}`}
                    >
                        {pathname.startsWith(link.startsWith) ? <link.iconActive className="size-7" /> : <link.iconInactive className="size-7" />}
                        <span className=" hidden xl:flex text-lg">
                            {link.title}
                        </span>
                    </Link>
                </li>
            ))}

        </>
    )
}
function Linkabout() {
    const { theme, setTheme } = useTheme();
    return (
        <div className="flex flex-col h-full gap-2">

            <div className="hidden xl:flex flex-col xl:flex-row w-40 gap-1 ">
                <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="btn btn-ghost btn-circle">
                    {theme === 'dark' ? (<RiSunLine className="size-7" />) : (<RiMoonLine className="size-7" />)}
                </div>
                <Link href={`/settings`} className="btn btn-ghost btn-circle"><RiSettingsLine className="size-7" /></Link>
            </div>


            <div className=" hidden xl:block text-base-content/50 text-sm">
                <span className="text-xs">v0.1.2-alphav</span>
                <div className="flex gap-1">
                    <Link href={`https://about.coolha.com`} className="  hover:link ">关于</Link>
                    <Link href={`https://link3.to/coolha`} className="  hover:link ">联系</Link>
                </div>
                <div className=" flex gap-1">
                    <Link href={`/fqa`} className="  hover:link ">帮助</Link>
                    <Link href={`/terms`} className="  hover:link ">条款</Link>
                    <Link href={`/privacy`} className="  hover:link ">隐私</Link>
                </div>
                <div className=""> <p>©{new Date().getFullYear()} coolha.com </p></div>
            </div>

            <div className=" block xl:hidden">
                <ButtonMenu />
            </div>

        </div>
    )
}