'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RiHomeFill, RiHomeLine, RiChat1Fill, RiChat1Line, RiUserFill, RiUserLine, RiSearchLine, RiCompassFill, RiCompassLine, RiWallet3Line, RiVerifiedBadgeLine, RiBookmarkLine, RiSearchFill } from "react-icons/ri";
/* import AuthButton from "AuthButton"; */
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from 'next-intl'
import ButtonMenu from "./ButtonMenu";
import dynamic from "next/dynamic";
const ConnectButton = dynamic(() => import("../web3/ConnectButton"), { ssr: false });
export default function Sidebar() {
    return (
        <div className=" hidden md:block min-h-full max-w-16 xl:max-w-56 fixed top-0 left-0 z-50">


            <div className="menu bg-base-100 min-h-full h-svh w-full gap-1 z-50">

                <Logo />
                {/* <Search /> */}
                <NavbarLink />

                <div className="">
                    <ButtonMenu />
                </div>

                <div className="mt-auto">
                    <ConnectButton />
                </div>

            </div>

        </div>
    )
}
function Logo() {
    return (
        <div className="max-h-12">

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={`/home`} className="flex flex-row items-center gap-2 ">
                    <div className="max-h-12">
                        <img src='/favicon.ico' className="w-10 h-10 rounded-full " alt='Q' />
                    </div>
                    <div className="text-3xl font-bold xl:block hidden ">
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
                <label className="input input-bordered xl:flex items-center justify-start w-40 hidden">
                    <span className="btn btn-ghost btn-circle btn-sm " onClick={handleButtonClick}>
                        <RiSearchLine className=" size-7 " />
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
    const t = useTranslations('sidebar')
    const links = [
        {
            title: t('search'),
            href: '/search',
            iconActive: RiSearchFill,
            iconInactive: RiSearchLine,
            startsWith: '/search'
        },
        {
            title: t('home'),
            href: '/home',
            iconActive: RiHomeFill,
            iconInactive: RiHomeLine,
            startsWith: '/home'
        },
        {
            title: t('discover'),
            href: '/find',
            iconActive: RiCompassFill,
            iconInactive: RiCompassLine,
            startsWith: '/find'
        },
        {
            title: t('messages'),
            href: '/message/chat',
            iconActive: RiChat1Fill,
            iconInactive: RiChat1Line,
            startsWith: '/message'
        },
        {
            title: t('profile'),
            href: '/profile',
            iconActive: RiUserFill,
            iconInactive: RiUserLine,
            startsWith: '/profile'
        },
        {
            title: t('wallet'),
            href: '/wallet',
            iconActive: RiWallet3Line,
            iconInactive: RiWallet3Line,
            startsWith: '/wallet'
        },
        /*         {
                    title: '书签',
                    href: '/bookmarks',
                    iconActive: RiBookmarkLine,
                    iconInactive: RiBookmarkLine,
                    startsWith: '/bookmarks'
                } */

    ];
    return (
        <>
            {links.map(link => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={`btn btn-ghost btn-circle no-animation xl:justify-start xl:w-40  xl:pl-2  ${pathname && pathname.startsWith(link.startsWith) && "btn-active "}`}
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
