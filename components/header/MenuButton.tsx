'use client'

import { RiSettingsLine, RiServiceLine, RiSunLine, RiMoonClearLine, } from "react-icons/ri";
import Link from "next/link";
import { useTheme } from "next-themes";

import { CgMenuGridO } from "react-icons/cg";
import AuthButton from "./AuthButton";

export function MenuButton() {
    const { theme, setTheme } = useTheme();






    return (
        <>
            {/* 菜单按钮 */}
            <div className="dropdown dropdown-bottom dropdown-end mx-1">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm md:btn-md  "><CgMenuGridO className="size-6 md:size-8" /></div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border text-lg">
                    <li><Link href={`/settings`}><RiSettingsLine size={24} />应用设置</Link></li>
                    <li><a onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                        {theme === 'dark' ?
                            (<RiSunLine size={24} />)
                            : (<RiMoonClearLine size={24} />)}
                        <span>切换主题</span></a>
                    </li>
                    {/*  <li><Link href={`/settings`}><RiTranslate size={24} />界面语言</Link></li> */}
                    <li className="my-1"></li>
                    {/*  <li><Link href={`mailto:cs@coolha.com`}> <RiServiceLine size={24} />赞助合作</Link></li> */}
                    <div className="">
                        <Link href={`mailto:cs@coolha.com`} className=" text-sm hover:link "> 赞助合作</Link>
                        <br />
                        <Link href={`/about`} className=" text-sm hover:link "> 关于应用</Link>
                        <Link href={`https://github.com/coolha-com/coolha`} className=" text-sm hover:link " target='_blank'> v0.1.2_beta</Link>
                        <br />
                        <Link href={`/fqa`} className=" text-sm hover:link "> 常见问题</Link>
                        <Link href={`/privacy`} className=" text-sm hover:link "> 隐私政策</Link>
                        <Link href={`/terms`} className=" text-sm hover:link "> 条款规则</Link>
                    </div>
                    {/*                     <li><Link href={`/fqa`}> <RiQuestionLine size={24} />常见问题</Link></li>
                    <li><Link href={`/privacy`}> <RiShieldUserLine size={24} />隐私政策</Link></li>
                    <li><Link href={`/terms`}> <RiFileTextLine size={24} />条款规则</Link></li>
                    <li><Link href={`/about`}> <RiInformation2Line size={24} />关于应用</Link></li>
                    <li><Link href={`https://github.com/callha/coolha`} target='_blank'>v0.1.1</Link></li> */}
                </ul>
            </div>


            <AuthButton />


        </>
    );
}
