'use client'

import { RxCube, RxGear, RxGrid } from "react-icons/rx";
import Link from "next/link";
import { useTranslations } from 'next-intl'
import ThemeSwap from "../ui/ThemeSwap";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export default function ButtonMenu() {
    const t = useTranslations('menu')
    return (
        <>
            {/* 菜单按钮 */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full hover:bg-muted p-2 md:p-0 xl:w-40 xl:justify-start xl:pl-2 mx-1 md:mx-0 gap-2 h-auto">
                        <RxGrid className="w-6 h-6 md:w-7 md:h-7" />
                        <span className="hidden xl:flex text-lg">{t('more')}</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="p-3 bg-background shadow-lg border min-w-64" style={{ borderRadius: '1.5rem' }} align="end" sideOffset={8}>

                    {/* 主要功能区 */}
                    <div className="mb-3">
                        <div className="flex items-center mb-3 gap-2 px-2">
                            <ThemeSwap />
                            <LanguageSwitcher />
                        </div>
                        {/*                         <DropdownMenuItem asChild>
                            <Link href={`/settings`} prefetch={false} className="w-full flex items-center gap-2 cursor-pointer" >
                                <RxGear className="w-6 h-6" />
                                <span>{t('app_settings')}</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/extend`} prefetch={false} className="w-full flex items-center gap-2 cursor-pointer" >
                                <RxCube className="w-6 h-6" />
                                <span>{t('extensions')}</span>
                            </Link>
                        </DropdownMenuItem> */}
                    </div>

                    {/* 分隔线 */}
                    <DropdownMenuSeparator />

                    {/* 信息链接区 */}
                    <div className="px-2 py-2 space-y-3">
                        {/* 版本信息 */}
                        <div className="flex items-center justify-between">
                            <Link href={`/about`} className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors" target='_blank'>
                                {t('about')}
                            </Link>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                                v0.1-alpha
                            </span>
                        </div>

                        {/* 链接组 1 */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                            <Link href={`/company`} prefetch={false} className="text-muted-foreground hover:text-foreground hover:underline transition-colors" target='_blank'>
                                {t('company')}
                            </Link>
                            <Link href={`https://link3.to/coolha`} className="text-muted-foreground hover:text-foreground hover:underline transition-colors" target='_blank'>
                                {t('contact')}
                            </Link>
                            <Link href={`https://coolha-com.sg.larksuite.com/share/base/form/shrusf2YvDVxMoNgsYrV1uZ8J3e`} className="text-muted-foreground hover:text-foreground hover:underline transition-colors" target='_blank'>
                                {t('feedback')}
                            </Link>
                        </div>

                        {/* 链接组 2 */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                            <Link href={`https://docs.coolha.com`} className="text-muted-foreground hover:text-foreground hover:underline transition-colors" target='_blank'>
                                {t('docs')}
                            </Link>
                            <Link href={`https://docs.coolha.com/docs/apps/privacy`} className="text-muted-foreground hover:text-foreground hover:underline transition-colors" target='_blank'>
                                {t('privacy')}
                            </Link>
                            <Link href={`https://docs.coolha.com/docs/apps/terms`} className="text-muted-foreground hover:text-foreground hover:underline transition-colors" target='_blank'>
                                {t('terms')}
                            </Link>
                        </div>

                        {/* 版权信息 */}
                        <div className="text-xs text-muted-foreground/50 pt-2 border-t mt-2">
                            <span>© {new Date().getFullYear()} coolha.com</span>
                        </div>
                    </div>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
