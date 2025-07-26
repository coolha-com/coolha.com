'use client'

import { useRouter } from "next/navigation"
import { RiArrowLeftLine, RiMore2Fill } from "react-icons/ri"


export default function layout({ children, params }) {
    const router = useRouter()
    return (
        <div className="mx-auto max-w-3xl">
            {/* 导航栏 */}
            <div className="navbar py-0 bg-base-100">
                <div className=" navbar-start">
                    <button className="btn btn-square btn-ghost" onClick={() => router.back()} >
                        <RiArrowLeftLine size={24} />
                    </button>
                </div>
                <div className=" navbar-center">{params.chatid}</div>
                <div className=" navbar-end">
                    <button className="btn btn-square btn-ghost">
                        <RiMore2Fill size={24} />
                    </button>
                </div>
            </div>
            {children}
        </div>
    )
}