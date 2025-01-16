'use client'
import Sidebar from '@/components/header/Sidebar'
import NavBar from '@/components/header/NavBar'
import NavFooter from '@/components/header/NavFooter'
import { usePathname } from 'next/navigation';


export default function layout({ children }) {
  const pathname = usePathname();
  const activeHrefs = ['/home', '/message', '/profile']

  const isActive = activeHrefs.some((activeHref) => pathname.startsWith(activeHref));
  return (
    <div className='bg-base-200  min-h-dvh flex'>

      <div className="md:w-20 xl:w-56">
        <Sidebar />
      </div>

      <div className="flex-1">
        <NavBar />
        {children}
        <NavFooter />
      </div>

      <div className={` ${isActive && `lg:w-20 xl:w-56`}`} />

    </div>
  )
}
