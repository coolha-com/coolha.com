'use client'

import { RiSettingsLine, RiSunLine, RiMoonLine, RiComputerLine, } from "react-icons/ri";
import Link from "next/link";
import { useTheme } from "next-themes";
import { CgMenuGridO } from "react-icons/cg";

export default function ButtonMenu() {
    const { theme, setTheme, resolvedTheme } = useTheme();





    return (
        <>
            {/* 菜单按钮 */}
            <div className="dropdown dropdown-bottom dropdown-end md:dropdown-top md:dropdown-right">

                <div tabIndex={0} role="button" className=" rounded-full hover:bg-[var(--button-bg)] md:no-animation p-2 md:p-0 xl:w-40 md:btn md:btn-ghost md:btn-circle  xl:justify-start xl:pl-2 mx-1 md:mx-0">
                    <CgMenuGridO className="size-6 md:size-7" />
                    <span className=" hidden xl:flex text-lg">更多</span>
                </div>

                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box min-w-52 border text-lg">

                    <li><Link href={`/settings`}><RiSettingsLine className="size-7" />应用设置</Link></li>

                    <li>
                        <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                            {theme === 'dark' ? (<RiSunLine className="size-7" />) : (<RiMoonLine className="size-7" />)}
                            <span>切换主题</span>
                        </div>
                    </li>
                    <li className="my-1"></li>

                    {/*                     <div role="tablist" className="tabs tabs-boxed" >
                        <a role="tab" className={`tab ${theme === "light" ? "tab-active" : ""}`} onClick={() => setTheme("light")}  >
                            <RiSunLine size={24} />
                        </a>

                        <a role="tab" className={`tab ${theme === "dark" ? "tab-active" : ""}`} onClick={() => setTheme("dark")} >
                            <RiMoonLine size={24} />
                        </a>
                    </div> */}

                    <div className="text-base-content/50 text-sm">
                        

                        <div className="flex items-center gap-2">
                            <Link href={`/`} className="  hover:link ">关于应用</Link>
                            <span className="text-xs">v0.1.2-alphav</span>
                        </div>

                        <div className="flex gap-2">
                            <Link href={`/about_us`} prefetch={false} className="  hover:link " >团队</Link>
                            <Link href={`https://link3.to/coolha`} className="  hover:link " target='_blank'>联系</Link>
                            <Link href={`https://coolha-com.larksuite.com/share/base/form/shrusf2YvDVxMoNgsYrV1uZ8J3e`} className="  hover:link " target='_blank'>反馈</Link>
                        </div>

                        <div className=" flex gap-2">
                            <Link href={`https://docs.coolha.com`} className="  hover:link " target='_blank'>文档</Link>
                            <Link href={`https://docs.coolha.com/apps/privacy`} className="  hover:link " target='_blank'>隐私</Link>
                            <Link href={`https://docs.coolha.com/apps/terms`} className="  hover:link " target='_blank'>条款</Link>
                        </div>

                        <div className=""> <span>©{new Date().getFullYear()} coolha.com </span></div>

                    </div>

                </ul>
            </div>





        </>
    );
}
