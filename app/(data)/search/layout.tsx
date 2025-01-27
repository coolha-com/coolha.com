'use client'

import Sidebar from "@/components/header/Sidebar";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { RiArrowLeftLine, RiSearchLine } from "react-icons/ri"


export default function layout({ children }) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && searchQuery.trim()) {
            router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
        }
    };
    const handleButtonClick = () => {
        if (searchQuery.trim()) {
            router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
        }
    };
    return (
        <div className="w-full">



                <div className="navbar w-full mx-auto max-w-3xl py-0 bg-base-100 border-b">
                    <div className=" navbar-start">
                        <button className="btn btn-ghost btn-square" onClick={() => router.back()}>
                            <RiArrowLeftLine size={24} />
                        </button>
                    </div>
                    <div className=" navbar-center flex flex-1 w-full ">
                        <label className="input input-bordered flex flex-1 items-center ">
                            <input type="text" className="grow" placeholder="搜索" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} />

                        </label>
                    </div>
                    <div className=" navbar-end">
                        <button className="btn btn-ghost btn-square" onClick={handleButtonClick}>
                            <RiSearchLine size={24} />
                        </button>
                    </div>
                </div>





            <div className='bg-base-200 min-h-dvh  flex'>

                <div className="md:w-20 xl:w-56">
                    <Sidebar />
                </div>

                <div className='flex-1'>
                    {children}
                </div>

                <div className="lg:w-20 xl:w-56" />

            </div>
        </div>
    )
}