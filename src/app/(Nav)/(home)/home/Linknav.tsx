'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from 'next-intl'
import { RxStarFilled, RxPerson, RxDashboard, RxMagnifyingGlass } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Linknav() {
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations('home')
    const linknav = [
        {
            href: "/home/foryou",
            name: t('recommended'),
            logo: <RxStarFilled />
        },
        {
            href: "/home/following",
            name: t('following'),
            logo: <RxPerson />
        },
        {
            href: "/home",
            name: t('all'),
            logo: <RxDashboard />
        },
    ]
    return (
        <>
            <div className="fixed top-0 md:hidden flex flex-row w-full max-w-3xl z-50 h-12 items-center bg-background border-b px-2">
                <div className="flex items-center gap-2 w-full">
                    <Link href={`/home`} >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Avatar className="w-9 h-9">
                                <AvatarImage src="/favicon.ico" alt="Coolha" />
                                <AvatarFallback>CH</AvatarFallback>
                            </Avatar>
                        </motion.div>
                    </Link>
                    <div className="flex-1"></div>
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push(`/search`)}>
                        <RxMagnifyingGlass className="w-6 h-6" />
                    </Button>
                </div>
            </div>

            {/* 类型 */}
            <div className="flex flex-row-reverse mx-auto max-w-3xl items-center justify-center z-40 h-10 md:h-12 mt-12 md:mt-0 ">
                {linknav.slice(0, 3).map((item) => (
                    <div className='mx-auto w-1/3 z-20 flex flex-row-reverse ' key={item.href}>

                        <Link href={item.href} className={`z-20 flex flex-row items-center justify-center w-full h-10 md:h-12 text-muted-foreground border-b-2 border-transparent hover:bg-muted/50 transition-colors ${pathname === item.href ? 'text-primary border-b-primary' : ''}`}>
                            <span className='justify-center text-base xs:text-2xl sm:text-3xl z-20'> {item.logo} </span>
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
