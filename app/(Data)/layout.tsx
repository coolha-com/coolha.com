
'use client'

import Sidebar from "@/components/layout/Sidebar"


export default function layout({ children }) {
    return (
        <>
            <div className='bg-base-200 min-h-dvh  flex'>

                <div className="md:w-20 xl:w-56">
                    <Sidebar />
                </div>

                <div className='flex-1'>
                    {children}
                </div>

                <div className="lg:w-20 xl:w-56" />

            </div>
        </>
    )
}