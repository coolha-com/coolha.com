// @ts-nocheck

'use client'
import { useInfiniteScroll } from "@/components/lnes/Data/u/hook/useInfiniteScroll";
import Avatarimg from "@/components/lnes/PostsCard/Avatarimg";
import AvatarName from "@/components/lnes/PostsCard/AvatarName";
import InteractCard from "@/components/lnes/PostsCard/InteractCard";
import Meide from "@/components/lnes/PostsCard/Meide";
import Menu from "@/components/lnes/PostsCard/Menu/Menu";
import { PosAtext, UsersPosAtext } from "@/components/lnes/PostsCard/PosAtext";
import { profileId, SessionType, useFeed, useProfile, useSession, PublicationType, LimitType, FeedEventItemType, useFeedHighlights } from "@lens-protocol/react-web";
import Link from "next/link";
import { RiLoopLeftFill } from "react-icons/ri";
import LoadingSpinner from '@/gui/LoadingSpinner';


export default function page() {

    const { data: sesssion } = useSession({ suspense: true });
    if (sesssion && sesssion.type === SessionType.Anonymous) {
        return (
            <div className="">
                <div>暂未登录账户</div>
            </div>
        );
    }
    if (sesssion && sesssion.type === SessionType.WithProfile) {
        const { data, loading, hasMore, observeRef } = useInfiniteScroll(useFeedHighlights({

            where: {
                for: profileId(sesssion.profile.id)
            },
        }));


        return (
            <div className="flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-[100vw]">
                {loading && <LoadingSpinner />}
                {data?.map((pub, idx) => (
                    <div className=" bg-base-100  w-dvw max-w-3xl p-4 py-2 mt-2" key={`${pub.id}-${idx}`}>


                        {/* 帖子主内容 */}
                        {/* {pub.__typename === 'Post' && <> </>}*/}
                        <div className=" flex ">
                            <div className="flex " onClick={(e) => e.stopPropagation()}>
                                <Avatarimg
                                    href={pub.by && pub.by.handle ? pub.by.handle.localName : pub?.by?.id}
                                    src={pub.by}
                                />
                                <AvatarName
                                    localName={pub.by && pub.by.handle ? pub.by.handle.localName : pub?.by?.id}
                                    displayName={pub.by && pub.by.metadata ? pub.by.metadata.displayName : ''}
                                    namespace={pub.by && pub.by.handle ? pub.by.handle.namespace : ''}
                                    id={pub}
                                    createdAt={pub.createdAt}
                                />
                            </div>
                            <div className="flex-1 flex" ><Link href={`/posts/${pub.id}`} className="flex-1"></Link></div>
                            <Menu pub={pub} />
                        </div>

                        <div>
                            <Link href={`/posts/${pub.id}`} >
                                <PosAtext content={pub.metadata?.content} />
                                <Meide pub={pub.metadata?.asset} />
                            </Link>

                            {/* 如果是引用类型的帖子，显示引用的内容 */}
                            {pub.__typename === "Quote" && (
                                <div className="pl-0 pt-2">
                                    <div className="p-4 py-2 border rounded-2xl ">

                                        <div className="flex" >
                                            <Avatarimg src={pub.quoteOn.by} href={pub.by.handle?.localName} />
                                            <AvatarName
                                                localName={pub.by.handle?.localName}
                                                displayName={pub.by.metadata?.displayName}
                                                namespace={pub.by.handle?.namespace}
                                                id={pub.quoteOn}
                                                createdAt={pub.quoteOn.createdAt}
                                            />
                                            <div className="flex-1 flex" ><Link href={`/posts/${pub.quoteOn.id}`} passHref className="flex-1"></Link></div>
                                        </div>

                                        <Link href={`/posts/${pub.quoteOn.id}`} passHref>
                                            <PosAtext content={pub?.quoteOn?.metadata?.content} />
                                            <Meide pub={pub.quoteOn.metadata?.asset} />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <InteractCard dataname={pub} />

                    </div>
                ))}
                {hasMore && (
                    <div className="flex justify-center my-4">
                        <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
                    </div>
                )}
            </div>
        );
    }
}