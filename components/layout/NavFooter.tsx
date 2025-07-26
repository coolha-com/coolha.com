"use client";

import Link from "next/link";

import { usePathname, } from 'next/navigation'

import { RiApps2Fill, RiApps2Line, RiArchiveFill, RiArchiveLine, RiChat1Fill, RiChat1Line, RiCompass3Fill, RiCompass3Line, RiCompassFill, RiCompassLine, RiHome5Fill, RiHome5Line, RiHomeFill, RiHomeLine, RiMailFill, RiMailLine, RiMessageFill, RiMessageLine, RiSearchFill, RiSearchLine, RiUserFill, RiUserLine } from "react-icons/ri";


export default function NavFooter() {
    return (
        <div >

            <div className="md:hidden flex fixed bottom-0 w-full h-14 bg-base-100 backdrop-filter backdrop-saturate-180 backdrop-blur-16  z-50 p-1">

                <NavLink
                    href='/home'
                    activeHrefs={['/home']}
                    icon={<RiHomeLine className="size-7" />}
                    activeIcon={<RiHomeFill className="size-7" />}
                    text='首页'
                />

                <NavLink
                    href='/find'
                    activeHrefs={['/find']}
                    icon={<RiCompassLine  className="size-7" />}
                    activeIcon={<RiCompassFill className="size-7" />}
                    text='发现'
                />


                <NavLink
                    href='/message/chat'
                    activeHrefs={['/message',]}
                    icon={<RiChat1Line className="size-7" />}
                    activeIcon={<RiChat1Fill className="size-7" />}
                    text='消息'
                />

                <NavLink
                    href={`/profile`}
                    activeHrefs={[`/profile`]}
                    icon={<RiUserLine className="size-7" />}
                    activeIcon={<RiUserFill className="size-7" />}
                    text='个人'
                />

                {/*        {address ? () : (
          <NavLink
            href={`/profile/sin`}
            activeHrefs={[`/profile/sin`]}
            icon={<RiUserLine className="Navicon" />}
            activeIcon={<RiUserFill className="Navicon" />}
          />
        )}
 */}
            </div>


        </div>
    );
}


function NavLink({ href, activeIcon, icon, activeHrefs, text }) {
    const pathname = usePathname();
    // 检查路径是否以activeHrefs中的任何一个前缀开头
    const isActive = activeHrefs.some((activeHref) => pathname.startsWith(activeHref));


    return (
        <Link
            className={`flex-1 flex flex-col items-center justify-center h-full  transition-shadow text-base-content/60  hover:bg-base-content/20 rounded-full  ${isActive ? '' : ''}`}
            href={href}
            prefetch={true} passHref 
        >

            <div className={`flex flex-col items-center justify-center  ${isActive && 'text-base-content'} `}>
                {isActive ? activeIcon : icon}
                {/* <span className="text-xs mt-0.5">{text}</span> */}
            </div>

        </Link>
    );
}
