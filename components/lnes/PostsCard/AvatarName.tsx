'use client'

import { timeAgo } from "@/utils/formatDate"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RiCheckboxCircleFill, RiVerifiedBadgeFill } from "react-icons/ri"

export default function AvatarName({ localName, displayName, namespace, id, createdAt }) {
    const router = useRouter()
    return (
        <>
            <div className="ml-3 overflow-y-auto" onClick={(e) => { e.stopPropagation(); }}>

                <Link href={`/u/${localName ? localName : id.by.id}`} className="flex flex-row  items-center text-xs md:text-base">
                    <b className=" flex items-center overflow-hidden text-ellipsis whitespace-nowrap hover:underline hover:caret-primary hover:text-info ">{displayName ? displayName : ''} </b>
                    <RiVerifiedBadgeFill className=" size-4 ml-1 text-primary rounded-full" />
                    <span className="ml-1 text-[#878787] hover:underline hidden xs:flex">@{localName ? localName : id.by.id}</span>
                </Link>
                <span className="ml-1 text-[#878787] text-xs  hover:underline flex xs:hidden ">@{localName ? localName : id.by.id}</span>
                <div className="">
                    <span className=' text-base-content/50  text-xs md:text-sm'> {timeAgo(createdAt)}</span>
                    {id?.metadata?.appId ? <span className=' text-base-content/50  text-xs md:text-sm'> {id?.metadata?.appId}</span> : ''}
                </div>

            </div>

        </>
    )
}