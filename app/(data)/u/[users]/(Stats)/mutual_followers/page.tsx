'use client'
/* import BFollow from '@/components/lnes/DataUsers/hook/BFollow'; */
import { useInfiniteScroll } from '@/components/lnes/Data/u/hook/useInfiniteScroll';
import Avatarimg from '@/components/lnes/PostsCard/Avatarimg';
import AvatarName from '@/components/lnes/PostsCard/AvatarName';
import { useProfile, useMutualFollowers, useSession, SessionType } from '@lens-protocol/react-web';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function MutualFollowers({ params: { users }, }) {
    const router = useRouter()
    const { data: session } = useSession({ suspense: true });
    const { data: profile } = useProfile({
        forHandle: `lens/${users}`
    });
    if (!profile) {
        return <div>正在加载档案信息...</div>;
    }
    const observerValue = session.type === SessionType.WithProfile && session.profile.id;
    if (typeof observerValue === 'string') {
        const { data: MutualFollowersData, hasMore, observeRef } = useInfiniteScroll(useMutualFollowers({
            observer: observerValue,
            viewing: profile.id,
        }));

        return (
            <div>
                <div className='py-1'>关注的人也关注了ta</div>
                <div className="flex mx-auto  justify-center">

                    <div className=' flex  lg:flex-wrap flex-col w-full '>
                        {MutualFollowersData && MutualFollowersData.length > 0 ? <>
                            {MutualFollowersData?.map(MutualF => (
                                <div key={MutualF.id}
                                    className="p-4 py-2 mt-2 bg-base-100   cursor-pointer"
                                    onClick={() => router.push(`/u/${MutualF?.handle?.localName}`)}>
                                    <div className="space-y-3 flex">
                                        <div className="overflow-hidden rounded-md flex flex-row">
                                            <Avatarimg
                                                /* className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square" */
                                                href={MutualF.handle ? MutualF.handle.localName : MutualF.id}
                                                src={MutualF} />

                                            <AvatarName localName={MutualF.handle?.localName ?? MutualF.id} displayName={MutualF?.metadata?.displayName} namespace={`lens`} createdAt={MutualF.createdAt} id={MutualF} />
                                        </div>
                                        <div className='flex-1'></div>
                                        {/* <BFollow profile={MutualF} /> */}
                                    </div>
                                </div>
                            ))}
                        </> : <>
                            <div>没有共同关注的用户</div>
                        </>}

                    </div>

                </div>

                {hasMore && (
                    <div className="flex justify-center my-4">
                        <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
                    </div>
                )}

            </div>
        )
    } else {
        // 处理 observerValue 不是有效 ProfileId 的情况
        return <div>无法获取有效的 observer 值</div>;
    }
}
