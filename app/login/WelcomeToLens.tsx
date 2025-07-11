'use client'

import { SessionType, useSession } from "@lens-protocol/react-web";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { config } from "@/config/Wagmi";
import { AddressTruncate } from "@/utils/AddressTruncate";
import LoginForm from "@/components/lnes/Auth/LoginForm";
import { LogoutButton } from "@/components/lnes/Auth/LogoutButton";
import Link from "next/link";
import { useAppKit } from "@reown/appkit/react";
import makeBlockie from "ethereum-blockies-base64";

export function WelcomeToLens() {
    const { isConnected, address, isConnecting } = useAccount({ config });
    const { data: EnsName } = useEnsName({ address: address })
    const { data } = useSession({ suspense: true, });
    const { open, close } = useAppKit()

    return (
        <div className=" flex justify-center items-center">
            <div className=" gap-14 w-dvw">
                
                <div className="mt-2 mb-16 flex flex-col md:flex-row  justify-between items-center gap-3">
                    <div className="flex flex-row justify-center items-center m-1 w-full">
                        <button onClick={() => open()} className=" btn btn-primary">
                            {isConnected ?
                                <>
                                    <img src={makeBlockie(address as `0x${string}`)} className="w-9 h-9 rounded-full" />
                                    <span className="">{EnsName ? EnsName : AddressTruncate(address)}</span>
                                </>
                                :
                                "连接钱包"
                            }
                        </button>
                    </div>
                </div>

                {!data?.authenticated && address && (
                    <>
                        <LoginForm wallet={address} />

                        <div className="divider">
                            没有Lens账户?
                            <Link href={'/signup'} className="link link-hover link-info">前往注册</Link>
                        </div>
                    </>
                )}

                {data && data.type === SessionType.WithProfile && (
                    <>
                        <p className="">当前登入的Lens账号 </p>
                        <div className="mt-2  flex-row flex justify-between items-center">
                            <button className='btn btn-outline  text-base-content  font-semibold' >
                                <div className="w-8 rounded-full ">
                                    {data?.profile?.metadata?.picture?.__typename === 'ImageSet' && (
                                        <img
                                            src={data.profile.metadata.picture.optimized?.uri}
                                            className="rounded-full"
                                            alt="picture Set"
                                        />
                                    )}
                                    {data?.profile?.metadata?.picture?.__typename === 'NftImage' && (
                                        <img
                                            src={data.profile.metadata.picture.image.optimized?.uri}
                                            className="rounded-full"
                                            alt="picture NFT"
                                        />
                                    )}
                                </div>
                                @{data.profile.handle?.localName ?? data.profile.id}
                            </button>
                            <LogoutButton />
                        </div>
                    </>
                )}

            </div>
        </div>

    );
}
