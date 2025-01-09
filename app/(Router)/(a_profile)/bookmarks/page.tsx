'use client'

import { useInfiniteScroll } from "@/components/lnes/Data/u/hook/useInfiniteScroll";
import Avatarimg from "@/components/lnes/PostsCard/Avatarimg";
import AvatarName from "@/components/lnes/PostsCard/AvatarName";
import InteractCard from "@/components/lnes/PostsCard/InteractCard";
import Meide from "@/components/lnes/PostsCard/Meide";
import Menu from "@/components/lnes/PostsCard/Menu/Menu";
import { PosAtext } from "@/components/lnes/PostsCard/PosAtext";
import { ExplorePublicationType, SessionType, useBookmarks, useSession, LimitType } from "@lens-protocol/react-web";
import Link from "next/link";

export default function page() {
    const { data: session } = useSession({ suspense: true });
    if (session && session.type === SessionType.Anonymous) {
        return (
            <div>
                <div className='rounded-[--rounded-box] px-2  md:px-4'>
                    <div className=' rounded-[--rounded-box]   bg-base-100 mt-4 py-2 px-1'>
                        <div className=" h-16  md:h-24 ml-2 lg:ml-4">
                            <div>暂未登录账户</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (session && session.type === SessionType.WithProfile) {
        const { data, loading, hasMore, observeRef } = useInfiniteScroll(useBookmarks({
            limit: LimitType.Ten,
        })) as any;

        return (
            <>
                {data?.map((pub: any) => (
                    <>
                        <div className=" bg-base-100  mx-auto max-w-3xl  lg: p-4 py-2 mt-2" key={pub.id}>
                            {/* 帖子主内容 */}
                            <div className=" flex ">
                                <div className="flex " onClick={(e) => e.stopPropagation()}>
                                    <Avatarimg
                                        href={pub.by && pub.by.handle ? pub.by.handle.localName : pub.by.id}
                                        src={pub.by}
                                    />
                                    <AvatarName
                                        localName={pub.by && pub.by.handle ? pub.by.handle.localName : pub.by.id}
                                        displayName={pub.by && pub.by.metadata ? pub.by.metadata.displayName : ''}
                                        namespace={pub.by && pub.by.handle ? pub.by.handle.namespace : ''}
                                        id={pub}
                                        createdAt={pub.createdAt}
                                    />
                                </div>

                                <div className="flex-1 flex" ><Link href={`/p/${pub.id}`} className="flex-1"></Link></div>
                                <Menu pub={pub} />

                            </div>

                            <div >
                                <Link href={`/p/${pub.id}`} >
                                    <PosAtext content={pub.metadata.content} />
                                    <Meide pub={pub.metadata.asset} />
                                </Link>

                                {/* 如果是引用类型的帖子，显示引用的内容 */}
                                {pub.__typename === "Quote" && (
                                    <div className="pl-0 pt-2">
                                        <div className="p-4 py-2 border rounded-2xl ">

                                            <div className="flex" >
                                                <Avatarimg src={pub.quoteOn.by} href={pub.by.handle.localName} />
                                                <AvatarName
                                                    localName={pub.quoteOn.by.handle.localName}
                                                    displayName={pub.quoteOn.by.metadata?.displayName}
                                                    namespace={pub.quoteOn.by.handle.namespace}
                                                    id={pub.quoteOn}
                                                    createdAt={pub.quoteOn.createdAt}
                                                />
                                                <div className="flex-1 flex" ><Link href={`/p/${pub.quoteOn.id}`} passHref className="flex-1"></Link></div>
                                            </div>

                                            <Link href={`/p/${pub.quoteOn.id}`} passHref>
                                                <PosAtext content={pub.quoteOn.metadata.content} />
                                                <Meide pub={pub.quoteOn.metadata.asset} />
                                            </Link>
                                        </div>
                                    </div>
                                )}

                            </div>


                            <InteractCard dataname={pub} />

                        </div>
                    </>
                ))}


                {hasMore && (
                    <div className="flex justify-center my-4">
                        <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
                    </div>
                )}
            </>
        )
    }
}