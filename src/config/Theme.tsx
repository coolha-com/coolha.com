'use client'

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

type ThemeProps = {
    children: ReactNode;
};

export default function Theme({ children }: ThemeProps) {
    const scriptProps =
        typeof window === "undefined" ? undefined : ({ type: "application/json" } as const);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            scriptProps={scriptProps}
        >
            {children}
        </ThemeProvider>
    );
}
