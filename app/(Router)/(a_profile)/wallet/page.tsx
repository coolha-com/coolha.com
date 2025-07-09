'use client'
import { AddressTruncate } from '@/utils/AddressTruncate'
import Link from 'next/link'
import { RiTokenSwapLine, RiCoinsLine, RiNftLine, RiHistoryLine } from 'react-icons/ri'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import Token from './token'


export default function Wallet() {

    const { address } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
    const userData = [
        { label: 'Swap', href: '/wallet/swap', icon: RiTokenSwapLine, },
        { label: 'DeFi', href: '/wallet/defi', icon: RiCoinsLine, },
        { label: 'NFT', href: '/wallet/nft', icon: RiNftLine, },
        { label: '交易记录', href: '/wallet/tx_history', icon: RiHistoryLine, }
    ];
    return (
        <div className=''>

            {/*             <div className="">
                {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
                {address &&
                    <Link
                        href={`https://debank.com/profile/${ensName ? ensName : address}`}
                        className=' link link-hover btn'
                        target='_blank'>
                        {ensName ? `${ensName} (${AddressTruncate(address)})`
                            : AddressTruncate(address)}↗
                    </Link>}
            </div> */}
            <div className='bg-base-100  h-auto w-auto '>
                <div className='flex-row  grid grid-cols-4 justify-items-center h-auto w-auto  p-3 my-2'>
                    {userData.map((item, index) => (
                        <div>
                            <Link href={item.href ? item.href : ''} key={index} className='  grid justify-items-center  btn btn-circle btn-outline btn-lg'>
                                <item.icon size={32} />
                            </Link>
                            <p className='text-[0.5rem] xs:text-xs md:text-base text-center'>{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>



            {/* <Token /> */}


        </div>
    )
}
