'use client'
import { AddressTruncate } from "@/utils/AddressTruncate";
import { useSession, SessionType, useLogout } from "@lens-protocol/react-web";
import { RiAccountCircleFill, RiAtLine, RiGlobalLine, RiLoginCircleLine, RiLogoutCircleRLine, RiMenu2Fill, RiMoreFill, RiWallet3Line } from "react-icons/ri";
import { useAccount, useEnsName } from "wagmi";

import { config } from "@/config/Wagmi";
import Link from "next/link";
import { useAppKit, useAppKitNetwork } from "@reown/appkit/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import makeBlockie from 'ethereum-blockies-base64';
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
        <div className="">
            {loading && <>
                <button className="xl:w-40 btn  btn-sm md:btn-md text-base-content  text-xl " >
                    <span className="loading loading-xs md:loading-sm loading-spinner"></span>
                </button>
            </>}


            {/* 未登入显示 */}
            {!session || session.type !== SessionType.WithProfile && <>
                {address ?
                    <Link href="/login">
                        <div className=" btn btn-primary btn-ghost btn-circle flex xl:hidden  xl:pl-2" >
                            <img src={makeBlockie(address)} className="w-9 h-9 rounded-full" />
                        </div>
                        <div className="  btn btn-primary hidden xl:flex xl:justify-start xl:w-40 xl:pl-2 " >
                            <img src={makeBlockie(address)} className="w-9 h-9  rounded-full" />
                            <span className="">{ensName ? ensName : AddressTruncate(address)}</span>
                        </div>
                    </Link>
                    :
                    <Link href="/login" >
                        <div className="btn btn-primary  md:btn-circle xl:text-xl xl:w-40 hidden md:flex xl:hidden ">
                            <RiLoginCircleLine className=" size-8 " />
                            <span className=" md:hidden xl:block block">登录</span>
                        </div>
                        <div className="btn btn-primary btn-sm md:btn-md md:hidden xl:flex text-sm xl:text-xl xl:w-40">
                            <span className="">登录</span>
                        </div>
                    </Link>
                }
            </>}

            {/* 登入成功显示 */}
            {session && session.type === SessionType.WithProfile && session.profile?.metadata?.picture &&
                <div className=" flex flex-col gap-1">


                    <div className="dropdown dropdown-bottom dropdown-end  md:dropdown-right  z-50">
                        {/* md:用户资料 */}
                        <div tabIndex={0} role="button" className="">
                            <div className="xl:w-40 btn md:btn-ghost btn-circle xl:justify-start xl:pl-2">
                                {session.profile?.metadata?.picture ? (
                                    <>
                                        {session.profile.metadata.picture.__typename === 'ImageSet' && (
                                            <img
                                                src={session.profile.metadata.picture.optimized?.uri}
                                                className=" w-9 rounded-full"
                                                alt="picture Set"
                                            />
                                        )}
                                        {session.profile.metadata.picture.__typename === 'NftImage' && (
                                            <img
                                                src={session.profile.metadata.picture.image.optimized?.uri}
                                                className=" w-9 rounded-full"
                                                alt="picture NFT"
                                            />
                                        )}
                                        <div className="xl:flex hidden  flex-col text-left">
                                            <span className="text-ellipsis">
                                                {session?.profile?.metadata?.displayName}
                                            </span>
                                            <span className="text-ellipsis text-[#878787] text-sm">
                                                @{session?.profile?.handle?.localName}
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <RiMoreFill className=" size-9 rounded-full border border-base-content" />
                                    </>
                                )}
                            </div>
                        </div>



                        {/* 菜单 */}
                        {/*                         <div tabIndex={0} role="button" className="xl:w-40 btn md:btn-ghost btn-circle xl:justify-start xl:pl-2 hidden md:flex">
                            <RiMenu2Fill className="size-7" />
                            <span className="xl:block hidden text-ellipsis text-lg">更多</span>
                        </div>
 */}

                        <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52 border text-lg">
                            <li><div onClick={() => open()} ><RiWallet3Line className="size-7" />{address ? '查看钱包' : '连接钱包'}</div></li>
                            <li><div onClick={() => open({ view: 'Networks' })}><RiGlobalLine className="size-7" />切换网络</div> </li>
                            <img src={caipNetwork?.assets?.imageUrl} alt={caipNetwork?.assets?.imageUrl} />

                            <li className="my-1"></li>
                            {/* <li><Link href={``}> <RiEmotionHappyLine className="size-7" />设置状态</Link></li> */}
                            <li><Link href={`/u/${session?.profile?.handle?.localName}`}><RiAtLine className="size-7" />查看主页</Link></li>

                            <li className="my-1"></li>
                            {/* <li><div > <RiArrowLeftRightFill className="size-7" />切换账号</div></li> */}
                            <li><div onClick={() => execute()}> <RiLogoutCircleRLine className="size-7" />注销</div></li>
                        </ul>


                    </div>
                </div>

            }










        </div>
    )
}