'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";
import { useOrderBy } from './OrderByContext';
import { orderOptions } from './OrderBylist';
import { ExplorePublicationsOrderByType } from "@lens-protocol/react-web";
export default function ButtonList() {
    const pathname = usePathname();
    const { state, dispatch } = useOrderBy();
    const { orderBy } = state;
    const handleOrderByChange = (type: ExplorePublicationsOrderByType) => {
        dispatch({ type: 'SET_ORDER_BY', payload: type });
    };
    return (
        <div>

            {/*                 <div className='m-1' >
                    <Link
                        className={`px-1 md:btn md:btn-sm ${pathname === '/home/following' ? 'text-info md:btn-primary' : ''}`}
                        href={`/home/following`}
                    >
                        关注
                    </Link>
                </div>
                <div className='m-1' >
                    <Link
                        className={`px-1 md:btn md:btn-sm ${pathname === '/home/foryou' ? 'text-info md:btn-primary' : ''}`}
                        href={`/home/foryou`}
                    >
                        给你
                    </Link>
                </div> */}
            {pathname === '/home/foryou' || pathname === '/home/following' ? '' :
                <div className="  flex md:flex-row  z-20 h-10 items-center bg-base-100  overflow-y-auto ">
                    {orderOptions.map((option) => (
                        <div className='m-1  ' key={option.key}>
                            <button
                                className={` whitespace-nowrap text-base-content/70 flex items-center px-1 md:py-1.5 md:px-3 md:rounded-full md:hover:bg-[var(--button-bg)] hover:border-info ${pathname === '/home/foryou' || pathname === '/home/following' ? '' : orderBy === option.key && 'text-info '}`}
                                onClick={() => handleOrderByChange(option.key)}
                            >
                                {option.title}
                            </button>
                        </div>
                    ))}
                </div>
            }


        </div>
    )
}