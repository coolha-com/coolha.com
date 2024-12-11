'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RiHomeFill, RiHomeLine, RiCompass3Fill, RiCompass3Line, RiChat1Fill, RiChat1Line, RiUserFill, RiUserLine, RiSettingsLine, RiSunLine, RiMoonClearLine, RiSearchLine, RiMenu2Fill } from "react-icons/ri";
import AuthButton from "./AuthButton";
import { MenuButton } from "./MenuButton";
import { motion } from "motion/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState } from "react";
export default function Sidebar() {
    return (
        <div className=" hidden md:block min-h-full max-w-16 xl:max-w-56 fixed top-0 left-0 z-50">


            <div className="h-svh z-50">
                <ul className="menu bg-base-100 min-h-full w-full  gap-2 z-50">
                    <Logo />
                    <Search />
                    <NavbarLink />
                    <div className="">
                        <AuthButton />
                    </div>
                    <div className="mt-auto">
                        <Linkabout />
                    </div>
                </ul>
            </div>

        </div>
    )
}
function Logo() {
    return (
        <Link href={`/home`} className="avatar w-12 h-12 ">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Image
                    src='/favicon.ico'
                    width={40}
                    height={40}
                    className="w-12 h-12 rounded-full "
                    alt='Q'
                />
            </motion.div>
        </Link>
    )
}
function Search() {
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
            <div className="">
                <label className="input input-bordered xl:flex items-center w-40 gap-2  hidden">
                    <span className="btn btn-ghost btn-circle btn-sm " onClick={handleButtonClick}>
                        <RiSearchLine className=" size-6 " />
                    </span>
                    <input type="text" className="grow" placeholder="搜索" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} />

                </label>
            </div>
            <div role="button" className="btn btn-ghost btn-circle flex xl:hidden" onClick={handleButtonClick}>
                <RiSearchLine className=" size-8 " />
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
                        {pathname.startsWith(link.startsWith) ? <link.iconActive className="size-8" /> : <link.iconInactive className="size-8" />}
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

            <div className="flex flex-col xl:flex-row w-40 gap-2">
                <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="btn btn-ghost btn-circle">
                    {theme === 'dark' ? (<RiSunLine className="size-8" />) : (<RiMoonClearLine className="size-8" />)}
                </div>
                <Link href={`/settings`} className="btn btn-ghost btn-circle"><RiSettingsLine className="size-8" /></Link>
            </div>

            <div className="flex xl:hidden btn btn-ghost btn-circle">
                <RiMenu2Fill className="size-8" />
            </div>

            <div className=" hidden xl:block text-base-content/50 text-sm">
                <Link href={`/about`} className="  hover:link "> 关于应用</Link>
                <Link href={`mailto:cs@coolha.com`} className="  hover:link "> 赞助合作</Link>
                <br />
                <Link href={`/fqa`} className="  hover:link "> 常见问题</Link>
                <Link href={`/terms`} className="  hover:link "> 条款规则</Link>
                <Link href={`/privacy`} className="  hover:link "> 隐私政策</Link>
                <div className=""> <p>© {new Date().getFullYear()} coolha.com </p></div>
                <Link href={`https://github.com/coolha-com/coolha/releases/tag/alphav`} className="text-xs  hover:link " target='_blank'> v0.1.2-alphav</Link>
            </div>

        </div>
    )
}