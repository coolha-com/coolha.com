'use client'

import Link from "next/link";

export default function ChatPage() {
    const chatData = [
        { name: 'Lens', message: 'Hello! CoolhaTop users' ,img:'/lens/Icon-T-Black_@2x.png'},
        { name: 'Coolha', message: '暂未集成 XMTP' ,img:'/favicon.ico'},
        { name: 'Coolha', message: '暂未集成 XMTP' ,img:'/favicon.ico'},
        { name: 'Coolha', message: '暂未集成 XMTP' ,img:'/favicon.ico'},
        { name: 'Coolha', message: '暂未集成 XMTP' ,img:'/favicon.ico'},
        { name: 'Coolha', message: '暂未集成 XMTP' ,img:'/favicon.ico'},
        { name: 'Coolha', message: '暂未集成 XMTP' ,img:'/favicon.ico'},
        { name: 'Coolha', message: '暂未集成 XMTP' ,img:'/favicon.ico'},
        { name: 'Coolha', message: '暂未集成 XMTP' ,img:'/favicon.ico'},
        { name: 'Coolha', message: '暂未集成 XMTP' ,img:'/favicon.ico'},
    ];

    return (
        <>
            {chatData.map((chat, index) => (
                <Link key={index} href={`/chat/${chat.name}`} className="flex p-4  bg-base-100 hover:bg-[--link-hover-background]">

                    <div className="flex-none w-14">
                        <img src={chat.img} alt={chat.name} className=" rounded-full bg-white" />
                    </div>

                    <div className="flex-auto pl-2">
                        <p className="font-bold">{chat.name}</p>
                        <p className="text-[--navlink-color] truncate ...">{chat.message}</p>
                    </div>

                    <div className="truncate ... text-sm text-gray-500">
                        <p>23:00</p>
                    </div>

                </Link>
            ))}
        </>
    );
}