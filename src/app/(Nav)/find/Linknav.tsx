'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from 'next-intl'
import { RxFileText, RxImage, RxSpeakerLoud, RxVideo, RxGrid } from "react-icons/rx";

export default function Linknav() {
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations('find')

    const linknav = [
        {
            href: "/find/article",
            name: t('articles'),
            logo: <RxFileText />
        },
        {
            href: "/find/image",
            name: t('images'),
            logo: <RxImage />
        },
        {
            href: "/find/music",
            name: t('music'),
            logo: <RxSpeakerLoud />
        },
        {
            href: "/find/video",
            name: t('videos'),
            logo: <RxVideo />
        },
        {
            href: "/find",
            name: t('explore'),
            logo: <RxGrid />
        }
    ]
    return (
        <>

            {/* 类型 */}
            <div className="flex flex-row-reverse mx-auto items-center justify-center z-40 h-12 ">
                {linknav.map((item) => (
                    <div className='mx-auto w-1/3 z-20 flex flex-row-reverse' key={item.href}>

                        <Link href={item.href} prefetch={false} className={`z-20 flex flex-row items-center justify-center w-full h-12 text-muted-foreground border-b-2 border-transparent hover:bg-muted/50 transition-colors ${pathname === item.href ? 'text-primary border-b-primary' : ''}`}>
                            <div className='justify-center text-xl xs:text-2xl sm:text-3xl z-20'> {item.logo} </div>
                            <p className="text-sm text-inherit z-20 text-center md:text-base md:ml-1 hidden sm:flex ">{item.name}</p>
                        </Link>

                    </div>
                ))}
            </div>

            {pathname === '/find' ? <></> :
                <div className={`w-full mx-auto `}>
                    {/*   <ButtonList /> */}
                </div>
            }

        </>
    )
}
