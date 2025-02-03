'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function layout({ children }) {
    const pathname = usePathname();
    return (
        <>
            <div role="tablist" className="tabs tabs-boxed w-full md:w-1/2">
                <Link href={`/settings/manager`} role="tab" className={`tab ${pathname === '/settings/manager' && 'tab-active'}`}>托管地址</Link>
                <Link href={`/settings/manager/managed`} role="tab" className={`tab ${pathname === '/settings/manager/managed' && 'tab-active'}`}>管理账户</Link>
                <Link href={`/settings/manager/un_managed`} role="tab" className={`tab ${pathname === '/settings/manager/un_managed' && 'tab-active'}`}>取消托管</Link>
            </div>
            {children}
        </>
    )
}


