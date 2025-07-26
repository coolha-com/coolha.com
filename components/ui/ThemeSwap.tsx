'use client'
import { RiMoonLine, RiSunLine, RiComputerLine } from "react-icons/ri";
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";

export default function ThemeSwap() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="btn btn-circle">
                <RiMoonLine size={24} />
            </div>
        );
    }

    return (
        <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="btn  btn-circle">
            {theme === 'dark' ? (<RiSunLine size={24} />) : (<RiMoonLine size={24} />)}
            {/* <RiComputerLine /> */}
        </div>
    )
}