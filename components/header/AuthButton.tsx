'use client'

import { truncateEthAddress } from "@/utils/truncateEthAddress";
import { useSession, SessionType, useLogout } from "@lens-protocol/react-web";
import { useTheme } from "next-themes";
import { useState } from "react";
import { RiAccountCircleFill, RiArrowLeftRightFill, RiAtLine, RiEmotionHappyLine, RiGlobalLine, RiLogoutCircleRLine, RiMoonClearLine, RiServiceLine, RiSettingsLine, RiSunLine, RiWallet3Line } from "react-icons/ri";
import { useAccount, useEnsName } from "wagmi";
import { WelcomeToLens } from "../lnes/Auth/WelcomeToLens";
import Cover04Text from '@/public/lens/Cover04-Text.png'
import web3背景 from '@/public/coolha.top/web3背景.png'

import { config } from "@/config/Wagmi";
import Image from "next/image";
import Link from "next/link";
import { useAppKit, useAppKitNetwork } from "@reown/appkit/react";
export default function Auth() {
    const { theme, setTheme } = useTheme();
    const { address } = useAccount({ config });
    const { data: ensName } = useEnsName({ address })
    const { data: session, loading } = useSession();
    const { execute } = useLogout();
    const { caipNetwork, caipNetworkId, chainId, switchNetwork } = useAppKitNetwork()
    const { open, close } = useAppKit()


    // 添加一个状态来控制模态框的显示和隐藏
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const handleOutsideClick = (event) => {
        if (event.target.classList.contains("bg-black") || event.target.classList.contains("bg-opacity-50")) {
            setShowModal(false);
        }
    };
    return (
        <>
            {loading && <>
                <button className="btn btn-primary btn-sm md:btn-md text-black  text-xl mx-1" >
                    <span className="loading loading-xs md:loading-sm loading-spinner"></span>
                </button>
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


            {/* 未登入显示 */}
            {!session || session.type !== SessionType.WithProfile && <>
                {address ?
                    <button
                        className="bg-primary rounded-full py-2 px-3 text-black   mx-1"
                        onClick={toggleModal}>
                        {ensName ? ensName : truncateEthAddress(address)}
                    </button>
                    :
                    <button onClick={toggleModal} type="button" className="bg-primary rounded-full py-1.5 px-3 text-black text-base md:text-xl  mx-1">
                        登录
                    </button>
                }
            </>}
            {showModal &&
                <div className=" w-full h-full fixed inset-0 flex justify-center items-center  z-50   transition-opacity duration-300 ease-in-out   bg-black bg-opacity-90" onClick={handleOutsideClick}>
                    <div className=" w-11/12 md:w-[450px] rounded-2xl max-w-md  scale-95  transition-transform duration-300 ease-in-out transform bg-base-100     z-auto border ">
                        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                            <button className="btn btn-circle btn-sm btn-primary text-lg" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <figure>
                            <Image
                                src={web3背景}
                                alt="web3背景"
                                sizes="100%"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                                className=" rounded-t-2xl"
                            />

                        </figure>
                        <div className="card-body border-opacity-50">
                            <WelcomeToLens />
                        </div>
                    </div>
                    {/*                     <form onClick={toggleModal}>
                        <button>close</button>
                    </form> */}
                </div>
            }






        </>
    )
}