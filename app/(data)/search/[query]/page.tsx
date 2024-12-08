'use client'

import BFollow from "@/components/lnes/Data/u/hook/BFollow";
import { useInfiniteScroll } from "@/components/lnes/Data/u/hook/useInfiniteScroll";
import Avatarimg from "@/components/lnes/PostsCard/Avatarimg";
import AvatarName from "@/components/lnes/PostsCard/AvatarName";
import InteractCard from "@/components/lnes/PostsCard/InteractCard";
import Meide from "@/components/lnes/PostsCard/Meide";
import Menu from "@/components/lnes/PostsCard/Menu/Menu";
import { PosAtext } from "@/components/lnes/PostsCard/PosAtext";
import Avatar from "@/gui/flowbite/Avatar";
import { appId, SearchPublicationType, useSearchProfiles, useSearchPublications, LimitType } from "@lens-protocol/react-web";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function page({ params: { query } }) {
    const router = useRouter()
    const { data: Profiles, loading: Profilesloading } = useSearchProfiles({ query: query });
    const { data: Pub, hasMore, observeRef } = useInfiniteScroll(useSearchPublications({
        query: query,
        limit: LimitType.Ten,
        where: {
            publicationTypes: [SearchPublicationType.Post, SearchPublicationType.Quote/* ,SearchPublicationType.Comment */],
            metadata: {
                /* publishedOn: [appId('Orb')], */
            }
        }
    }));
    return (
        <div className=" min-h-dvh ">
            <div className=' flex  lg:flex-wrap flex-col w-full'>
                {Profiles?.slice(0, 3).map(profile => (
                    <div
                        key={profile.id}
                        className="p-4 mt-2 bg-base-100   cursor-pointer"
                        onClick={() => router.push(`/u/${profile?.handle?.localName}`)}>
                        <div className="space-y-3 flex">
                            <div className="overflow-hidden rounded-md flex flex-row">

                                <Avatarimg
                                    href={profile.handle ? profile.handle.localName : profile.id}
                                    src={profile} />
                                <AvatarName localName={profile.handle?.localName ?? profile.id} displayName={profile?.metadata?.displayName} namespace={`lens`} createdAt={profile.createdAt} id={profile} />
                            </div>
                            <div className='flex-1'></div>
                            {/* <BFollow profile={profile} /> */}
                        </div>
                    </div>
                ))}
                {Profilesloading ? 'Loading...' : <Link href={`/search/${query}/user`} className="btn btn-sm bg-base-100 my-2">查看更多用户</Link>}
            </div>

            {Pub?.map((pub: any) => (
                <div className=" bg-base-100  mx-auto max-w-3xl lg: p-4 mt-2" key={pub.id}>

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

                        <div className="flex-1 flex" ><Link href={`posts/${pub.id}`} className="flex-1"></Link></div>
                        <Menu pub={pub} />

                    </div>

                    <div >
                        <Link href={`posts/${pub.id}`} >
                            <PosAtext content={pub.metadata.content} />
                            <Meide pub={pub.metadata.asset} />
                        </Link>

                        {/* 如果是引用类型的帖子，显示引用的内容 */}
                        {pub.__typename === "Quote" && (
                            <div className="pl-0 pt-2">
                                <div className="p-4 border rounded-2xl ">

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
            ))}
            {hasMore && (
                <div className="flex justify-center my-4">
                    <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
                </div>
            )}
        </div>
    )
}