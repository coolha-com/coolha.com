'use client'
import { RiMoonLine, RiSunLine, RiComputerLine } from "react-icons/ri";
import { useTheme } from "next-themes"

export default function ThemeSwap() {
    const { theme, setTheme } = useTheme();
    return (
        <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="btn btn-ghost btn-circle">
            {theme === 'dark' ? (<RiSunLine size={24} />) : (<RiMoonLine size={24} />)}
            {/* <RiComputerLine /> */}
        </div>
    )
}