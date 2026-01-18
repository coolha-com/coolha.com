'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { RxChatBubble, RxPerson, RxBell } from 'react-icons/rx'

export default function Message({ children }: any) {
  const pathname = usePathname();
  const t = useTranslations('message')

  // 指定要显示导航栏的路径列表
  const displayPaths = ["/message/chat", "/message/community", "/message/notice"];
  // 判断当前路径是否在指定列表中
  const shouldDisplayNav = displayPaths.includes(pathname);

  const linknav = [
    {
      href: "/message/chat",
      name: t('chat'),
      logo: <RxChatBubble />
    },
    {
      href: "/message/community",
      name: t('community'),
      logo: <RxPerson />
    },
    {
      href: "/message/notice",
      name: t('notifications'),
      logo: <RxBell />
    },
  ]

  return (
    <div className='pb-14 w-dvw md:mx-auto md:max-w-3xl'>


      {shouldDisplayNav &&
        <div className="flex flex-row w-dvw md:w-full z-20 h-12 items-center border-b">

          {linknav.map((item) => (
            <div className='mx-auto max-w-3xl flex-row w-1/3 justify-around flex z-20' key={item.href}>

              <Link href={item.href} className={`z-20 flex items-center justify-center w-[100%] h-12 flex-row text-muted-foreground hover:bg-muted/50 transition-colors border-b-2 border-transparent ${pathname === item.href ? 'text-primary border-b-primary' : ''}`}>
                <div className='justify-center text-2xl sm:text-2xl z-20'> {item.logo} </div>
                <p className="text-sm text-inherit z-20 text-center ml-1">{item.name}</p>
              </Link>

            </div>
          ))}

        </div>
      }


      {children}
    </div>
  );
}
