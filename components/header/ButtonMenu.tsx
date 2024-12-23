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
                <div tabIndex={0} role="button" className="p-2 rounded-full hover:bg-[var(--button-bg)] "><CgMenuGridO className="size-6 md:size-8" /></div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border text-lg">
                    <li><Link href={`/settings`}><RiSettingsLine className="size-7" />应用设置</Link></li>
                    <li><div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                        {theme === 'dark' ? (<RiSunLine className="size-7" />) : (<RiMoonLine className="size-7" />)}
                        <span>切换主题</span>
                    </div></li>
                    {/*  <li><Link href={`/settings`}><RiTranslate className="size-7" />界面语言</Link></li> */}
                    <li className="my-1"></li>
                    <div className="text-base-content/50 text-sm">
                        <Link href={`https://github.com/coolha-com/coolha/releases/tag/alphav`} className="text-xs  hover:link " target='_blank'> v0.1.2-alphav</Link>
                        <br />
                        <Link href={`/about`} className="  hover:link "> 关于应用</Link>
                        <Link href={`mailto:cs@coolha.com`} className="  hover:link "> 赞助合作</Link>
                        <br />
                        <Link href={`/fqa`} className="  hover:link "> 常见问题</Link>
                        <Link href={`/terms`} className="  hover:link "> 条款规则</Link>
                        <Link href={`/privacy`} className="  hover:link "> 隐私政策</Link>
                        <div className=""> <p>© {new Date().getFullYear()} coolha.com </p></div>
                    </div>

                </ul>
            </div>





        </>
    );
}
