
// @ts-nocheck

'use client'
import { useInfiniteScroll } from "@/components/lnes/Data/u/hook/useInfiniteScroll";
import Avatarimg from "@/components/lnes/PostsCard/Avatarimg";
import AvatarName from "@/components/lnes/PostsCard/AvatarName";
import InteractCard from "@/components/lnes/PostsCard/InteractCard";
import Meide from "@/components/lnes/PostsCard/Meide";
import Menu from "@/components/lnes/PostsCard/Menu/Menu";
import { PosAtext, UsersPosAtext } from "@/components/lnes/PostsCard/PosAtext";
import { profileId, SessionType, useFeed, useProfile, useSession, PublicationType, LimitType, FeedEventItemType } from "@lens-protocol/react-web";
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
        const { data, loading, hasMore, observeRef } = useInfiniteScroll(useFeed({
            limit: LimitType.Ten,
            where: {
                for: profileId(sesssion.profile.id),
                feedEventItemTypes: [FeedEventItemType.Post, FeedEventItemType.Quote]
            },

        }));


        return (
            <div className="flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-dvw">
                {loading && <LoadingSpinner />}
                {data?.map((pub) => (
                    <div className=" bg-base-100  w-dvw max-w-3xl p-4 py-2 mt-2" key={`${pub.root.id}`}>


                        {/* 帖子主内容 */}
                        {pub.root.__typename === 'Post' && <>



                            <div className=" flex ">
                                <div className="flex " onClick={(e) => e.stopPropagation()}>
                                    <Avatarimg
                                        href={pub.root.by && pub.root.by.handle ? pub.root.by.handle.localName : pub?.root.by?.id}
                                        src={pub.root.by}
                                    />
                                    <AvatarName
                                        localName={pub.root.by && pub.root.by.handle ? pub.root.by.handle.localName : pub?.root.by?.id}
                                        displayName={pub.root.by && pub.root.by.metadata ? pub.root.by.metadata.displayName : ''}
                                        namespace={pub.root.by && pub.root.by.handle ? pub.root.by.handle.namespace : ''}
                                        id={pub}
                                        createdAt={pub.root.createdAt}
                                    />
                                </div>
                                <div className="flex-1 flex" ><Link href={`/p/${pub.id}`} className="flex-1"></Link></div>
                                <Menu pub={pub} />
                            </div>
                            <Link href={`/p/${pub.id}`} >
                                <PosAtext content={pub.root.metadata?.content} />
                                <Meide pub={pub.root.metadata?.asset} />
                            </Link>


                        </>}

                        {/*   <div >
                          {pub.mirrors && <>
                                <div className="mb-3 flex flex-row gap-0.5 text-base-content/70">
                                    <RiLoopLeftFill className="size-6" />
                                    <b className=""> {pub.root.by.metadata?.displayName} </b>
                                    <span className=""> 转发了</span>
                                </div>
                            </>}
                                <div className="flex" >
                                    <p className="text-primary">转发B</p>
                                    <Avatarimg src={pub} href={pub.root.by?.handle?.localName} />
                                    <AvatarName
                                        localName={pub.root.by?.handle?.localName}
                                        displayName={pub.root.by.metadata?.displayName}
                                        namespace={pub.root.by?.handle?.namespace}
                                        id={pub.root}
                                        createdAt={pub.root.createdAt}
                                    />
                                    <div className="flex-1 flex" ><Link href={`/p/${pub.root.id}`} className="flex-1"></Link></div>
                                    <Menu pub={pub.root} />
                                </div>

                                <Link href={`/p/${pub.root.id}`} passHref>
                                    <UsersPosAtext content={pub.root.metadata.content} />
                                    <Meide pub={pub.root.metadata.asset} />
                                </Link>

                            </div> */}




                        <div>
                            {/* 如果是引用类型的帖子，显示引用的内容 */}
                            {pub.root.__typename === "Quote" && (

                                <div className="pl-0 pt-2">

                                    <div className=" flex ">
                                        <div className="flex " onClick={(e) => e.stopPropagation()}>
                                            <Avatarimg
                                                href={pub.root.by && pub.root.by.handle ? pub.root.by.handle.localName : pub?.root.by?.id}
                                                src={pub.root.by}
                                            />
                                            <AvatarName
                                                localName={pub.root.by && pub.root.by.handle ? pub.root.by.handle.localName : pub?.root.by?.id}
                                                displayName={pub.root.by && pub.root.by.metadata ? pub.root.by.metadata.displayName : ''}
                                                namespace={pub.root.by && pub.root.by.handle ? pub.root.by.handle.namespace : ''}
                                                id={pub}
                                                createdAt={pub.root.createdAt}
                                            />
                                        </div>
                                        <div className="flex-1 flex" ><Link href={`/p/${pub.id}`} className="flex-1"></Link></div>
                                        <Menu pub={pub} />
                                    </div>
                                    <Link href={`/p/${pub.id}`} >
                                        <PosAtext content={pub.root.metadata?.content} />
                                        <Meide pub={pub.root.metadata?.asset} />
                                    </Link>

                                    <div className="p-4 py-2 border rounded-2xl ">
                                        <div className="flex" >
                                            <Avatarimg src={pub.root.quoteOn.by} href={pub.root.quoteOn.by.handle?.localName} />
                                            <AvatarName
                                                localName={pub.root.quoteOn.by.handle?.localName}
                                                displayName={pub.root.quoteOn.by.metadata?.displayName}
                                                namespace={pub.root.quoteOn.by.handle?.namespace}
                                                id={pub.root.quoteOn}
                                                createdAt={pub.root.quoteOn.createdAt}
                                            />
                                            <div className="flex-1 flex" ><Link href={`/p/${pub.root.quoteOn.id}`} passHref className="flex-1"></Link></div>
                                        </div>

                                        <Link href={`/p/${pub.root.quoteOn.id}`} passHref>
                                            <PosAtext content={pub?.root?.quoteOn?.metadata?.content} />
                                            <Meide pub={pub.root.quoteOn.metadata?.asset} />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>








                        <InteractCard dataname={pub.root} />

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