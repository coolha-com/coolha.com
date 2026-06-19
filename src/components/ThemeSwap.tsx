"use client"

import * as React from "react"
import { RiComputerLine, RiMoonLine, RiSunLine } from "react-icons/ri"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ThemeSwap() {
    const { setTheme, theme } = useTheme()
    const currentTheme = theme ?? "system"

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                    <RiSunLine
                        className={`size-5 transition-all ${currentTheme === "light"
                            ? "scale-100 rotate-0 opacity-100"
                            : "absolute scale-0 -rotate-90 opacity-0"
                            }`}
                    />
                    <RiMoonLine
                        className={`size-5 transition-all ${currentTheme === "dark"
                            ? "absolute scale-100 rotate-0 opacity-100"
                            : "absolute scale-0 rotate-90 opacity-0"
                            }`}
                    />
                    <RiComputerLine
                        className={`size-5 transition-all ${currentTheme === "system"
                            ? "absolute scale-100 rotate-0 opacity-100"
                            : "absolute scale-0 rotate-90 opacity-0"
                            }`}
                    />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className={theme === "light" ? "text-primary" : undefined}
                >
                    <RiSunLine />
                    <span>Light</span>
                    <span className={`ml-auto ${theme === "light" ? "opacity-100" : "opacity-0"}`}>
                        ✓
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className={theme === "dark" ? "text-primary" : undefined}
                >
                    <RiMoonLine />
                    <span>Dark</span>
                    <span className={`ml-auto ${theme === "dark" ? "opacity-100" : "opacity-0"}`}>
                        ✓
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className={theme === "system" ? "text-primary" : undefined}
                >
                    <RiComputerLine />
                    <span>System</span>
                    <span className={`ml-auto ${theme === "system" ? "opacity-100" : "opacity-0"}`}>
                        ✓
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
