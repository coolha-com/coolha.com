'use client'

import { SessionType, useSession } from "@lens-protocol/react-web";
import { useAccount, useEnsName } from "wagmi";
import { config } from "@/config/Wagmi";
//import { useWeb3Modal } from '@web3modal/wagmi/react'
import { ConnectWalletButton } from "@/components/wagmi/ConnectWalletButton";
import { DisconnectWalletButton } from "@/components/wagmi/DisconnectWalletButton";
import { truncateEthAddress } from "@/utils/truncateEthAddress";
import ThemeSwap from "@/gui/ThemeSwap";
import LoginForm from "@/components/lnes/Auth/LoginForm";
import { LogoutButton } from "@/components/lnes/Auth/LogoutButton";
import Link from "next/link";
import { useAppKit } from "@reown/appkit/react";

export function WelcomeToLens() {
    const { isConnected, address, isConnecting } = useAccount({ config });
    const { data: ensName } = useEnsName({ address })
    const { data } = useSession({ suspense: true, });
    const { open, close } = useAppKit()

    return (
        <div className=" flex justify-center items-center">
            <div className=" gap-14 w-dvw">
                <div className="mt-2 mb-16 flex flex-col md:flex-row  justify-between items-center gap-3">
                    <div className="flex flex-row justify-center items-center m-1 w-full">
                        <button onClick={() => open()} className=" bg-primary rounded-full py-2 px-3 text-black hover:bg-primary/90">
                            {address && <div className=" hidden md:block ">  </div>}
                            {isConnecting ?
                                (<div><span className="loading loading-spinner"></span></div>)
                                :
                                (isConnected ? ensName ? ensName : truncateEthAddress(address) : "连接钱包")
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
