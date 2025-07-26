'use client'

import Link from "next/link";

export default function ChatPage() {
    const chatData = [
        { name: 'Lens', message: 'Hello! Coolha users', img: '/lens/Icon-T-Black_@2x.png' },
        { name: 'Coolha', message: '暂未集成 XMTP', img: '/favicon.ico' },

    ];

    return (
        <>
            <Link key={'DeepSeek'} href={`/deepseek`} className="flex p-3  bg-base-100 hover:bg-[--link-hover-background] border-b">
                <div className="flex-none w-14">
                    <img src={`https://cdn.deepseek.com/platform/favicon.png`} alt={`DeepSeek`} className=" rounded-full bg-white" />
                </div>

                <div className="flex-auto pl-2">
                    <p className="font-bold">DeepSeek</p>
                    <p className="text-sm md:text-base text-[--navlink-color] text-ellipsis ...">DeepSeek Chat 仅在开发测试，未部署生产</p>
                </div>

                <div className="truncate ... text-sm text-gray-500">
                    <p>23:00</p>
                </div>
            </Link>

            {chatData.map((chat, index) => (
                <Link key={index} href={`/chat/${chat.name}`} className="flex p-3  bg-base-100 hover:bg-[--link-hover-background] border-b">

                    <div className="flex-none w-14">
                        <img src={chat.img} alt={chat.name} className=" rounded-full bg-white" />
                    </div>

                    <div className="flex-auto pl-2">
                        <p className="font-bold">{chat.name}</p>
                        <p className="text-sm md:text-base text-[--navlink-color] text-ellipsis ...">{chat.message}</p>
                    </div>

                    <div className="truncate ... text-sm text-gray-500">
                        <p>23:00</p>
                    </div>

                </Link>
            ))}
        </>
    );
}