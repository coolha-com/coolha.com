'use client'
import { usePathname, useRouter } from "next/navigation";
import { RiAddCircleLine, RiSearchLine } from "react-icons/ri";
import { MenuButton } from "./MenuButton";

export default function NavHeader() {
    const pathname = usePathname();

    return (
        <>
            {["/find", , "/profile"].includes(pathname) ? (
                <div className=" flex md:hidden  md:border-0 w-100vw p-0 bg-base-100 h-12">
                    {pathname === "/find" && <Find />}
                    {/* {pathname === "/message/chat" && <Message />} */}
                    {pathname && pathname.startsWith("/profile") && null}
                    {pathname === "/profile" && <Profile />}
                
                    
                </div>
            ) : null}
        </>
    )
}

function Find() {
    const router = useRouter();
    return (
        <div className="navbar min-h-12 py-0 p-0 px-2">
            <div className=" navbar-start"> </div>
            <div className=" navbar-center">发现</div>
            <div className=" navbar-end"> </div>
        </div>
    )
}

function Message() {
    return (
        <div className="navbar min-h-12 py-0 p-0 px-2">
            <div className=" navbar-start"> </div>
            <div className=" navbar-center">消息</div>
            <div className=" navbar-end">
                <button className="btn btn-square  btn-ghost" >
                    <RiAddCircleLine size={24}/>
                </button>
            </div>
        </div>
    );
}

function Profile() {
    return (
        <div className="navbar  min-h-12 py-0 p-0 px-2">
            <div className="navbar-start">
            </div>
            <div className="navbar-center"> </div>
            <div className="navbar-end">
                <MenuButton />
            </div>
        </div>
    )
}


