'use client'
import { ThemeProvider } from "next-themes";

// app/layout.jsx
export default function Theme({ children }: any) {
    return (
        <>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </>
    )
}