'use client'
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { RiCloseLine, RiMenuLine } from "react-icons/ri";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/", key: "home" },
  { href: "/agent", key: "agent" },
  { href: "/rwa", key: "rwa" },
  { href: "/company", key: "company" },
] as const;

function isActive(pathname: string, href: string) {
  const clean = pathname.replace(/^\/(en|zh-Hans|zh-Hant)/, "") || "/";
  if (href === "/") return clean === "/" || clean === "";
  return clean === href || clean.startsWith(href + "/");
}

export default function Header() {
    const t = useTranslations('header');
    const pathname = usePathname();
    // 顶部时铺满全宽，向下滚动后收缩为圆角胶囊
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // 滞后阈值：下滑超过 40px 才收缩，回到 16px 以内才展开，避免阈值附近反复切换
        const update = () => {
            const y = window.scrollY;
            setScrolled((prev) => (prev ? y > 16 : y > 40));
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    // 路由变化时关闭菜单
    useEffect(() => { setMenuOpen(false); }, [pathname]);

    return (
        <header className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-[420ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${scrolled ? "px-3 pt-3 md:px-6 md:pt-4" : "px-0 pt-0"}`}>
            <div className={`glass-panel-strong mx-auto flex w-full items-center justify-between border transition-[max-width,height,padding,border-radius,border-color] duration-[420ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
                scrolled
                    ? "h-14 max-w-5xl rounded-[1.75rem] border-white/12 px-2.5 md:px-3"
                    : "h-16 max-w-full rounded-none border-transparent px-4 md:h-18 md:px-6"
            }`}>

                <div className="flex items-center gap-4">
                    <Link href={'/'} className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F237]">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Image src="/logo/logo.png" alt="Coolha" width={40} height={40} className="rounded-xl" />
                        </motion.div>
                    </Link>

                    <ul className="hidden md:flex gap-1 items-center">
                        <LinkMenu pathname={pathname} />
                    </ul>
                </div>

                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        className="hidden h-9 cursor-not-allowed items-center justify-center rounded-full bg-white/[0.09] px-5 text-xs font-semibold tracking-wide text-white/55 md:inline-flex"
                    >
                        {t("launch")}
                    </button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full md:hidden"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        {menuOpen ? <RiCloseLine className="size-6" /> : <RiMenuLine className="size-6" />}
                    </Button>
                </div>
            </div>

            {/* 移动端下拉菜单：在导航条下方展开，点外部或链接关闭 */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* 点击外部关闭的透明遮罩 */}
                        <motion.div
                            className="fixed inset-0 -z-10 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                            aria-hidden="true"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -12, scale: 0.98 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-2 md:hidden"
                        >
                            <nav className="glass-panel-strong flex flex-col gap-1 rounded-2xl p-2 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
                                <LinkMenu pathname={pathname} isMobile onNavigate={() => setMenuOpen(false)} />
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    )
}

function LinkMenu({ isMobile = false, pathname = "", onNavigate }: { isMobile?: boolean; pathname?: string; onNavigate?: () => void }) {
    const t = useTranslations('header');

    if (isMobile) {
        return (
            <>
                {NAV.map((item) => (
                    <MobileNavLink
                        key={item.href}
                        href={item.href}
                        label={t(item.key)}
                        active={isActive(pathname, item.href)}
                        onClick={onNavigate}
                    />
                ))}
            </>
        );
    }

    return (
        <>
            {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                    <li key={item.href} className="list-none">
                        <Link
                            href={item.href}
                            prefetch={false}
                            aria-current={active ? "page" : undefined}
                            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                active
                                    ? "bg-white/[0.12] text-white"
                                    : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                            }`}
                        >
                            {t(item.key)}
                        </Link>
                    </li>
                );
            })}
        </>
    );
}

function MobileNavLink({ href, label, active = false, onClick, isExternal = false }: { href: string; label: string; active?: boolean; onClick?: () => void; isExternal?: boolean }) {
    return (
        <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            aria-current={active ? "page" : undefined}
            onClick={onClick}
            className={`group flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                active
                    ? "bg-white/[0.12] text-white"
                    : "text-white/65 hover:bg-white/[0.06] hover:text-white"
            }`}
        >
            <span className="text-base font-medium">{label}{isExternal && <> ↗</>}</span>
            {active && <span className="size-2 rounded-full bg-[#C8F237] shadow-[0_0_10px_2px_rgba(200,242,55,0.35)]" aria-hidden="true" />}
        </Link>
    );
}
