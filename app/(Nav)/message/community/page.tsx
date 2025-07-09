import Link from "next/link";

export default function communitypage() {

    const chatData = [
        { name: 'Lens Community', message: 'Hello! Coolha Community users' ,img:'/lens/Icon-T-Black_@2x.png'},
        { name: 'Groups', message: '暂未集成' ,img:'/favicon.ico'},

    ];
    return (
        <div>
            {chatData.map((chat, index) => (
                <Link key={index} href={`/chat/${chat.name}`} className="flex p-3  bg-base-100 hover:bg-[--link-hover-background] border-b">

                    <div className="flex-none w-14">
                        <img src={chat.img} alt={chat.name} className=" rounded-full bg-white" />
                    </div>

                    <div className="flex-auto pl-2">
                        <p className="font-bold">{chat.name}</p>
                        <p className="text-[--navlink-color] truncate ...">{chat.message}</p>
                    </div>

                    <div className="truncate ... text-sm text-gray-500">
                        <p>16:00</p>
                    </div>

                </Link>
            ))}
        </div>
    )
}