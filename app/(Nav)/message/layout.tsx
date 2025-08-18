'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation'
import { RiChat3Line, RiFileTextLine, RiImageLine, RiMessage2Line, RiMusic2Line, RiNotification3Line, RiQuestionAnswerLine, RiShapesLine, RiTeamLine, RiVideoLine } from 'react-icons/ri'
export default function Message({ children }) {
  const pathname = usePathname();

  // 指定要显示导航栏的路径列表
  const displayPaths = ["/message/chat", "/message/community", "/message/notice"];
  // 判断当前路径是否在指定列表中
  const shouldDisplayNav = displayPaths.includes(pathname);

  return (
    <div className='pb-14 w-dvw md:mx-auto md:max-w-3xl'>


      {shouldDisplayNav &&
        <div className="flex flex-row w-dvw md:w-full  z-20 h-12  items-center ">

          {linknav.map((item) => (
            <div className='mx-auto max-w-3xl flex-row w-1/3 justify-around flex  bg-base-100 hover:bg-[--link-hover-background]  z-20' key={item.href}>

              <Link href={item.href} className={`z-20 flex items-center justify-center w-[100%] h-12 flex-row text-[#878787]  ${pathname === item.href ? 'text-info border-b-info border-b-2' : ''}`}>
                <div className=' justify-center text-2xl sm:text-2xl z-20'> {item.logo} </div>
                <p className="text-sm text-inherit z-20 text-center">{item.name}</p>
              </Link>

            </div>
          ))}

        </div>
      }


      {children}
    </div>
  );
}

const linknav = [
  {
    href: "/message/chat",
    name: "聊天",
    logo: <RiMessage2Line />
  },
  {
    href: "/message/community",
    name: "社区",
    logo: <RiTeamLine />
  },
  {
    href: "/message/notice",
    name: "通知",
    logo: <RiNotification3Line />
  },

]