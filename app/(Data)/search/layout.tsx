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
            <div className="navbar w-dvw md:w-full mx-auto max-w-3xl py-0 bg-base-100 border-b">

                {/* 左侧返回按钮 */}
                <div className="navbar-start w-auto">
                    <button className="btn btn-ghost btn-square" onClick={() => router.back()}>
                        <RiArrowLeftLine size={24} />
                    </button>
                </div>

                {/* 中间搜索框，占据所有可用空间 */}
                <div className="navbar-center flex flex-1">
                    <label className="input input-bordered flex flex-1 items-center">
                        <input
                            type="text"
                            className="w-full"
                            placeholder="搜索"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </label>
                </div>

                {/* 右侧搜索按钮 */}
                <div className="navbar-end w-auto">
                    <button className="btn btn-ghost btn-square" onClick={handleButtonClick}>
                        <RiSearchLine size={24} />
                    </button>
                </div>
            </div>

            {children}
        </div>

    )
}