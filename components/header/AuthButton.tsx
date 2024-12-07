'use client'
import { truncateEthAddress } from "@/utils/truncateEthAddress";
import { useSession, SessionType, useLogout } from "@lens-protocol/react-web";
import { RiAccountCircleFill, RiAtLine, RiGlobalLine, RiLogoutCircleRLine, RiWallet3Line } from "react-icons/ri";
import { useAccount, useEnsName } from "wagmi";

import { config } from "@/config/Wagmi";
import Link from "next/link";
import { useAppKit, useAppKitNetwork } from "@reown/appkit/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Auth() {
    const router = useRouter();
    const { address, isConnected } = useAccount({ config });
    const { data: ensName } = useEnsName({ address })
    const { data: session, loading } = useSession();
    const { execute } = useLogout();
    const { caipNetwork, caipNetworkId, chainId, switchNetwork } = useAppKitNetwork()
    const { open, close } = useAppKit()

    // 跳转状态控制
    const [hasRedirected, setHasRedirected] = useState(false);
    // 监听钱包连接状态变化
    useEffect(() => {
        if (isConnected && session?.type === SessionType.JustWallet && !hasRedirected) {
            setHasRedirected(true); // 标记为已跳转
            router.push("/login"); // 跳转到 /login 页面
        }
    }, [isConnected, session, router, hasRedirected]);
    return (
        <>
            {loading && <>
                <button className="btn btn-primary btn-sm md:btn-md text-black  text-xl mx-1" >
                    <span className="loading loading-xs md:loading-sm loading-spinner"></span>
                </button>
            </>}


            {/* 未登入显示 */}
            {!session || session.type !== SessionType.WithProfile && <>
                {address ?
                    <Link href="/login" className="bg-primary rounded-full py-2 px-3 text-black hover:bg-primary/90  mx-1" >
                        {ensName ? ensName : truncateEthAddress(address)}
                    </Link>
                    :
                    <button onClick={() => open()} className="bg-primary rounded-full py-1.5 px-3 text-black text-base md:text-xl  mx-1">
                        登录
                    </button>
                }
            </>}

            {/* 登入成功显示 */}
            {session && session.type === SessionType.WithProfile && session.profile?.metadata?.picture &&
                <div className="dropdown dropdown-bottom dropdown-end  dropdown-hover mx-1 ">

                    <div tabIndex={0} role="button" >
                        <button className="avatar items-center flex">
                            {session.profile?.metadata?.picture ? (
                                <div className="w-9 md:w-12 rounded-full ">
                                    {session.profile.metadata.picture.__typename === 'ImageSet' && (
                                        <img
                                            src={session.profile.metadata.picture.optimized?.uri}
                                            className="rounded-full"
                                            alt="picture Set"
                                        />
                                    )}
                                    {session.profile.metadata.picture.__typename === 'NftImage' && (
                                        <img
                                            src={session.profile.metadata.picture.image.optimized?.uri}
                                            className="rounded-full"
                                            alt="picture NFT"
                                        />
                                    )}
                                </div>
                            ) : (
                                <><RiAccountCircleFill className=" size-12 rounded-full border border-base-content" /></>
                            )}
                        </button>
                    </div>

                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border text-lg">



                        <li><div onClick={() => open()} ><RiWallet3Line size={24} />{address ? '查看钱包' : '连接钱包'}</div></li>
                        <li><div onClick={() => open({ view: 'Networks' })}><RiGlobalLine size={24} />切换网络</div> </li>
                        <img src={caipNetwork?.assets?.imageUrl} alt={caipNetwork?.assets?.imageUrl} />

                        <li className="my-1"></li>
                        {/* <li><Link href={``}> <RiEmotionHappyLine size={24} />设置状态</Link></li> */}
                        <li><Link href={`/u/${session?.profile?.handle?.localName}`}><RiAtLine size={24} />{session?.profile?.handle?.localName}</Link></li>

                        <li className="my-1"></li>
                        {/* <li><div > <RiArrowLeftRightFill size={24} />切换账号</div></li> */}
                        <li><div onClick={() => execute()}> <RiLogoutCircleRLine size={24} />注销</div></li>

                    </ul>


                </div>
            }










        </>
    )
}