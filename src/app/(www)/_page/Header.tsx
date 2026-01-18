'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import ThemeSwap from "@/components/ui/ThemeSwap";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
    const t = useTranslations('header');
    return (
        <div className="w-full bg-background/80 backdrop-blur-md justify-around z-50 flex fixed top-0 left-0 right-0 transition-all duration-300 px-2 border-b">
            <div className="flex h-16 items-center w-full max-w-7xl mx-auto justify-between">


                <div className="flex items-center gap-4">{/* Left */}
                    <Link href={'/'} className="border-border">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Image src="/logo/logo.png" alt="logo.png" width={40} height={40} className="rounded-full" />
                        </motion.div>
                    </Link>

                    <ul className="hidden md:flex gap-6 items-center">
                        <LinkMenu />
                    </ul>

                </div>

                {/* Right */}
                <div className="flex items-center gap-3">{/* Right */}
                    <ThemeSwap />
                    <LanguageSwitcher />
                    <Button asChild className="hidden md:flex rounded-full text-sm font-semibold px-6" size="default">
                        <Link href={'/home'}>
                            {t("launch")}
                        </Link>
                    </Button>

                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <RxHamburgerMenu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <ul className="flex flex-col gap-4 mt-8 px-2">
                                    <LinkMenu />
                                </ul>
                            </SheetContent>
                        </Sheet>
                    </div>

                </div>


            </div>
        </div>
    )
}

function LinkMenu() {
    const t = useTranslations('header');

    return (
        <>
            <li className="md:hidden list-none">
                <Button asChild className="w-full rounded-full text-base font-bold">
                    <Link href={'/home'}>
                        {t("launch")}
                    </Link>
                </Button>
            </li>


            <li className="text-sm font-medium list-none">
                <Link href={`/company`} prefetch={false} className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("company")}
                </Link>
            </li>

            <li className="text-sm font-medium list-none">
                <Link href={`https://link3.to/coolha`} target='_blank' className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("contact")} ↗
                </Link>
            </li>

            <li className="text-sm font-medium list-none">
                <Link href={`https://docs.coolha.com`} target='_blank' className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("docs")} ↗
                </Link>
            </li>

        </>
    );
}
