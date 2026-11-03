import Footer from "./_layout/Footer"
import Header from "./_layout/Header"

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}
