'use client'
import { ThemeProvider } from "next-themes";

// app/layout.jsx
export default function Theme({ children }: any) {
    return (
        <>
            <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={true}>
                {children}
            </ThemeProvider>
        </>
    )
}
