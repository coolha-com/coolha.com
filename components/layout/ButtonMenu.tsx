'use client'

import { RiSettingsLine, RiSunLine, RiMoonLine, RiComputerLine, RiPuzzleLine, } from "react-icons/ri";
import Link from "next/link";
import { CgMenuGridO } from "react-icons/cg";
import { useTranslations } from 'next-intl'
import ThemeSwap from "../ui/ThemeSwap";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function ButtonMenu() {
    const t = useTranslations('menu')
    return (
        <>
            {/* 菜单按钮 */}
            <div className="dropdown dropdown-bottom dropdown-end md:dropdown-right  ">

                <div tabIndex={0} role="button" className=" rounded-full hover:bg-base-content/10  md:no-animation p-2 md:p-0 xl:w-40 md:btn md:btn-ghost md:btn-circle  xl:justify-start xl:pl-2 mx-1 md:mx-0">
                    <CgMenuGridO className="size-6 md:size-7" />
                    <span className=" hidden xl:flex text-lg">{t('more')}</span>
                </div>

                <ul tabIndex={0} className="dropdown-content z-[1] menu p-3 bg-base-100 shadow-lg border border-base-300 min-w-64 text-base" style={{ borderRadius: '1.5rem' }}>

                    {/* 主要功能区 */}
                    <div className="mb-3">
                        <div className="flex items-center mb-3 gap-2">
                            <ThemeSwap />
                            <LanguageSwitcher />
                        </div>
                        <li>
                            <Link href={`/settings`} prefetch={false} className="btn btn-ghost justify-start" >
                                <RiSettingsLine className="size-7" />
                                <span>{t('app_settings')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/extend`} prefetch={false} className="btn btn-ghost justify-start" >
                                <RiPuzzleLine className="size-7" />
                                <span>{t('extensions')}</span>
                            </Link>
                        </li>
                    </div>

                    {/* 分隔线 */}
                    <div className="divider my-2"></div>

                    {/* 信息链接区 */}
                    <div className="px-3 py-2 space-y-3">
                        {/* 版本信息 */}
                        <div className="flex items-center justify-between">
                            <Link href={`/about`} className="text-sm text-base-content/70 hover:text-base-content hover:underline transition-colors" target='_blank'>
                                {t('about')}
                            </Link>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                                v0.1-alpha
                            </span>
                        </div>

                        {/* 链接组 1 */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                            <Link href={`/about_us`} prefetch={false} className="text-base-content/70 hover:text-base-content hover:underline transition-colors" target='_blank'>
                                {t('about_us')}
                            </Link>
                            <Link href={`https://link3.to/coolha`} className="text-base-content/70 hover:text-base-content hover:underline transition-colors" target='_blank'>
                                {t('contact')}
                            </Link>
                            <Link href={`https://coolha-com.sg.larksuite.com/share/base/form/shrusf2YvDVxMoNgsYrV1uZ8J3e`} className="text-base-content/70 hover:text-base-content hover:underline transition-colors" target='_blank'>
                                {t('feedback')}
                            </Link>
                        </div>

                        {/* 链接组 2 */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                            <Link href={`https://docs.coolha.com`} className="text-base-content/70 hover:text-base-content hover:underline transition-colors" target='_blank'>
                                {t('docs')}
                            </Link>
                            <Link href={`https://docs.coolha.com/docs/apps/privacy`} className="text-base-content/70 hover:text-base-content hover:underline transition-colors" target='_blank'>
                                {t('privacy')}
                            </Link>
                            <Link href={`https://docs.coolha.com/docs/apps/terms`} className="text-base-content/70 hover:text-base-content hover:underline transition-colors" target='_blank'>
                                {t('terms')}
                            </Link>
                        </div>

                        {/* 版权信息 */}
                        <div className="text-xs text-base-content/50 pt-2 border-t border-base-300">
                            <span>© {new Date().getFullYear()} coolha.com</span>
                        </div>
                    </div>

                </ul>
            </div>





        </>
    );
}
