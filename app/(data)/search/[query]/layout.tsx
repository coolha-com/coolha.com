'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";

export default function layout({ params: { query }, children }) {
    const linknav = [
        {
            href: `/search/${query}`,
            name: "推荐",
            isExact: true,  // 表示精确匹配
        },
        {
            href: `/search/${query}/pub`,
            name: "帖子",
        },
        {
            href: `/search/${query}/user`,
            name: "用户",
        }
    ]
    const pathname = usePathname();
    return (
        <div className="mx-auto max-w-3xl lg:justify-center pb-14 flex flex-col ">

            <div className="flex flex-row z-20 h-10 max-w-3xl mx-auto w-full  top-16 ">
                {linknav.map((item) => (
                    <div className=' flex-col sm:flex-row  w-1/3 flex  z-20  ' key={item.href}>
                        <Link href={item.href} className={`z-20 flex items-center justify-center w-[100%] h-10  flex-col sm:flex-row  text-[#878787] border-b-0 bg-base-100 hover:bg-[--link-hover-background] ${(item.isExact ? pathname === item.href : pathname.startsWith(item.href)) ? 'text-info border-b-info border-b-2' : ''
                            }`}>
                            <p className="text-sm text-inherit z-20 text-center md:text-base md:ml-1 hidden xs:flex ">{item.name}</p>
                        </Link>
                    </div>
                ))}
            </div>


            {children}

        </div>
    )
}