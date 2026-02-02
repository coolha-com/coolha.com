'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { RxHamburgerMenu, RxExternalLink } from "react-icons/rx";
import Image from "next/image";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import ThemeSwap from "@/components/ui/ThemeSwap";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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
                            <SheetContent side="right" className="flex flex-col w-[300px] sm:w-[400px] p-0">
                                <SheetHeader className="p-6 text-left border-b">
                                    <div className="flex items-center gap-3">
                                        <Image src="/logo/logo.png" alt="logo" width={32} height={32} className="rounded-full" />
                                        <SheetTitle className="text-xl font-bold text-primary">Coolha</SheetTitle>
                                    </div>
                                </SheetHeader>

                                <div className="flex-1 overflow-y-auto py-6 px-4">
                                    <nav className="flex flex-col gap-2">
                                        <LinkMenu isMobile />
                                    </nav>
                                </div>

                                <div className="p-6 border-t bg-muted/20">
                                    <p className="text-xs text-muted-foreground text-center">
                                        © {new Date().getFullYear()} Coolha Limited
                                    </p>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                </div>


            </div>
        </div>
    )
}

function LinkMenu({ isMobile = false }: { isMobile?: boolean }) {
    const t = useTranslations('header');

    if (isMobile) {
        return (
            <>
                <Button asChild className="w-full rounded-xl text-lg font-bold h-12 mb-4" size="lg">
                    <Link href={'/home'}>
                        {t("launch")}
                    </Link>
                </Button>

                <MobileNavLink href="/" label={t("home")} />
                <MobileNavLink href="/company" label={t("company")} />
                <MobileNavLink href="https://link3.to/coolha" label={t("contact")} isExternal />
                <MobileNavLink href="https://docs.coolha.com" label={t("docs")} isExternal />
            </>
        );
    }

    return (
        <>
            <li className="text-sm font-medium list-none">
                <Link href={`/`} prefetch={false} className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("home")}
                </Link>
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

function MobileNavLink({ href, label, isExternal = false }: { href: string, label: string, isExternal?: boolean }) {
    return (
        <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-colors group"
        >
            <span className="text-base font-medium text-foreground">{label}</span>
            {isExternal && <RxExternalLink className="w-4 h-4 text-muted-foreground" />}
        </Link>
    );
}

