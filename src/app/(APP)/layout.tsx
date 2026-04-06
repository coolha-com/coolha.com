'use client'

import NavBar from './_layout/NavBar';
import NavFooter from './_layout/NavFooter';
import Sidebar from './_layout/Sidebar';
import { usePathname } from 'next/navigation';


export default function layout({ children }) {
  const pathname = usePathname();
  const activeHrefs = ['/dashboard', '/find','/ai','/wallet', '/profile']

  const isActive = activeHrefs.some((activeHref) => pathname.startsWith(activeHref));
  return (
    <div className='bg-base-200  min-h-dvh flex'>

      <div className="md:w-20 xl:w-52">
        <Sidebar />
      </div>

      <div className="flex-1">
        <NavBar />
        {children}
        <NavFooter />
      </div>

      <div className={` ${isActive && `lg:w-20 xl:w-52`}`} />

    </div>
  )
}
