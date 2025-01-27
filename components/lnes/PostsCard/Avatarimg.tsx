'use client'
import { useRouter } from "next/navigation";
import Motion from '@/gui/framer/Motion'
import Link from "next/link";
import { RiAccountCircleFill } from "react-icons/ri";

export default function Avatarimg({ href, src }) {
    const router = useRouter()
    return (
        <div onClick={(e) => { e.stopPropagation(); }}>

            <Link href={`/u/${href}`}>
                <div className="py-[4px] ">


                    {src?.metadata?.picture ? (

                        src.metadata.picture.__typename === 'ImageSet' ? (
                            src.metadata.picture.__typename === 'ImageSet' && (
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={src.metadata.picture.optimized?.uri}
                                    alt={src.metadata.picture.optimized?.uri}
                                />
                            )
                        ) : (
                            src.metadata.picture.__typename === 'NftImage' && (
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={src.metadata.picture.image.optimized?.uri}
                                    alt={src.metadata.picture.image.optimized?.uri}
                                />
                            ))

                    ) : (
                        <RiAccountCircleFill
                            className=" size-10 rounded-full border border-base-content"
                        />
                    )}


                </div>
            </Link>
        </div>
    )
}

