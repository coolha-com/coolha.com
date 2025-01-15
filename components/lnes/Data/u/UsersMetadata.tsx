'use client'

import UseFollow from "@/components/lnes/Data/u/hook/BFollow";
import { AddressTruncate } from "@/utils/AddressTruncate"
import { SessionType, useFollow, useProfile, useSession } from "@lens-protocol/react-web";
import Link from "next/link"
import { RiCheckboxCircleFill, RiFileCopyLine, RiVerifiedBadgeFill } from "react-icons/ri";
import Follow from "./hook/Follow";
import BFollow from "@/components/lnes/Data/u/hook/BFollow";

export default function UsersMetadata({ profile }) {
    const { data: session } = useSession({ suspense: true });
    //当前登入的账户
    let profileHandle;
    if (session.type === SessionType.WithProfile && session.profile?.handle?.fullHandle) {
        profileHandle = session.profile.handle.fullHandle;
    }

    const ensName = profile?.onchainIdentity?.ens?.name;
    const ethAddress = profile?.ownedBy?.address;
    const ethAddressText = ensName ?
        <> {ensName} <img className="size-4 ml-1" src="/logo/ens_mark_primary.svg" alt="ENS.logo" /></> : AddressTruncate(`${ethAddress}`);
    return (
        <div className="flex flex-row items-center pt-2  px-4 bg-base-100">

            <div className="w-16 h-16 md:w-24 md:h-24 ">
                {profile?.metadata?.picture ? (
                    <>
                        {profile.metadata.picture.optimized?.uri && (
                            <img
                                className="rounded-full  w-16 h-16 md:w-24 md:h-24 "
                                src={profile.metadata.picture.optimized.uri}
                                alt="picture Set"
                            />
                        )}
                        {profile.metadata.picture.__typename === 'ProfilePicture_NftImage_' && (
                            <img
                                className="rounded-full  w-16 h-16 md:w-24 md:h-24 "
                                src={profile.metadata.picture.uri}
                                alt="picture NFT"
                            />
                        )}
                    </>
                ) : (
                    <img
                        className="rounded-full  w-16 h-16 md:w-24 md:h-24 "
                        src="/rlogo.png" // 使用默认的占位符图片
                        alt="optimized on"
                    />
                )}
            </div>


            <div className="ml-2 lg:ml-4">
                <b className="md:text-xl flex flex-row items-center  font-bold">{profile?.metadata?.displayName}<RiVerifiedBadgeFill className="ml-1 size-5 text-primary  rounded-full" /></b>
                <p className="text-[#878787] text-sm"> @{profile?.handle?.localName}   </p>



                <p className="text-[#878787]  text-sm font-bold hover:text-primary w-full flex flex-row">
                    <Link href={`https://www.oklink.com/zh-hans/multi-search#key=${ensName ? ensName : ethAddress}`} target='_blank'>
                        <span className="flex-1 inline-flex items-center hover:text-primary  w-full">{ethAddressText}</span>
                    </Link>

                </p>
                {/* <p className="badge badge-outline text-gray-500"> <span className="font-bold w-full">{profile?.createdAt ? formatDate(profile?.createdAt) : ''}</span> </p> */}
                {/*  <p className="text-gray-500"><span className="font-bold">{AddressTruncate(`${profile?.ownedBy?.address}`)}</span>   </p> */}
            </div>
            <div className="flex-1 lg:ml-2"></div>



            <div >
                <BFollow profile={profile} />
            </div>

        </div>
    )
}
