"use client"

import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"
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

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className={theme === "light" ? "text-primary" : undefined}
                >
                    <Sun />
                    <span>Light</span>
                    <span className={`ml-auto ${theme === "light" ? "opacity-100" : "opacity-0"}`}>
                        ✓
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className={theme === "dark" ? "text-primary" : undefined}
                >
                    <Moon />
                    <span>Dark</span>
                    <span className={`ml-auto ${theme === "dark" ? "opacity-100" : "opacity-0"}`}>
                        ✓
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className={theme === "system" ? "text-primary" : undefined}
                >
                    <Monitor />
                    <span>System</span>
                    <span className={`ml-auto ${theme === "system" ? "opacity-100" : "opacity-0"}`}>
                        ✓
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
