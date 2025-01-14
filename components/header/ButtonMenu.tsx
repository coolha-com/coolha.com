'use client'

import { RiSettingsLine, RiServiceLine, RiSunLine, RiMoonClearLine, RiMoonLine, } from "react-icons/ri";
import Link from "next/link";
import { useTheme } from "next-themes";
import { CgMenuGridO } from "react-icons/cg";

export default function ButtonMenu() {
    const { theme, setTheme } = useTheme();






    return (
        <>
            {/* 菜单按钮 */}
            <div className="dropdown dropdown-bottom dropdown-end md:dropdown-top md:dropdown-right">

                <div tabIndex={0} role="button" className=" xl:w-40 btn btn-ghost btn-circle btn-sm md:btn-md xl:justify-start xl:pl-2 mx-1 md:mx-0">
                    <CgMenuGridO className="size-6 md:size-8" />
                    <span className=" hidden xl:flex text-lg">更多</span>
                </div>

                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border text-lg">

                    <li><Link href={`/settings`}><RiSettingsLine className="size-7" />应用设置</Link></li>
                    <li>
                        <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                            {theme === 'dark' ? (<RiSunLine className="size-7" />) : (<RiMoonLine className="size-7" />)}
                            <span>切换主题</span>
                        </div>
                    </li>

                    <li className="my-1"></li>

                    <div className="text-base-content/50 text-sm">
                        <span className="text-xs">v0.1.2-alphav</span>
                        <div className="flex gap-1">
                            <Link href={`https://about.coolha.com`} className="  hover:link " target='_blank'>关于</Link>
                            <Link href={`https://docs.coolha.com`} className="  hover:link " target='_blank'>文档</Link>
                            <Link href={`https://link3.to/coolha`} className="  hover:link " target='_blank'>联系</Link>
                        </div>
                        <div className=" flex gap-1">
                            <Link href={`https://docs.coolha.com/apps/privacy`} className="  hover:link " target='_blank'>隐私</Link>
                            <Link href={`https://docs.coolha.com/apps/terms`} className="  hover:link " target='_blank'>条款</Link>
                        </div>
                        <div className=""> <p>©{new Date().getFullYear()} coolha.com </p></div>
                    </div>

                </ul>
            </div>





        </>
    );
}
