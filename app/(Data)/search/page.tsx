'use client'

import { useInfiniteScroll } from "@/components/lnes/Data/u/hook/useInfiniteScroll";
import Avatarimg from "@/components/lnes/PostsCard/Avatarimg";
import AvatarName from "@/components/lnes/PostsCard/AvatarName";
import Avatar from "@/gui/flowbite/Avatar";
import { useSession, SessionType, useProfile, useRecommendedProfiles, profileId, ExploreProfilesOrderByType, useExploreProfiles, LimitType } from "@lens-protocol/react-web";
import { useRouter } from "next/navigation";
function Text() {
    return (
        <div>推荐关注</div>
    )
}

export default function page() {
    const router = useRouter()
    const { data: datauseSession } = useSession({ suspense: true });
    if (datauseSession && datauseSession.type === SessionType.WithProfile) {
        const ProfileWithProfile = datauseSession.profile.handle?.fullHandle ?? datauseSession.profile.id;
        const { data: profile } = useProfile({
            forHandle: ProfileWithProfile
        });
        const { data: RecommendedProfiles, hasMore, observeRef } = useInfiniteScroll(useRecommendedProfiles({
            limit: LimitType.Ten,
            for: profileId(profile?.id ? profile?.id : ''),
        }));
        return (
            <div className="flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full mx-auto max-w-3xl">


                <div className="flex  justify-center">

                    <div className=' flex  lg:flex-wrap flex-col w-full '>
                        {RecommendedProfiles?.map(profile => (
                            <div
                                key={profile.id}
                                className="p-2 mt-2 bg-base-100   cursor-pointer"
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
                    </div>

                </div>

                {hasMore && (
                    <div className="flex justify-center my-4">
                        <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
                    </div>
                )}

            </div >
        )
    }

    let { data: profiles, error: profileError, loading: loadingProfiles, hasMore, observeRef } = useInfiniteScroll(useExploreProfiles({
        limit: LimitType.Ten,
        orderBy: ExploreProfilesOrderByType.MostFollowers
    })) as any
    profiles = profiles?.filter(p => p.metadata?.picture?.optimized?.uri)
    return (
        <>
            <div className="flex mx-auto max-w-3xl justify-center">
                <div className=' flex  lg:flex-wrap flex-col w-full '>
                    {profiles?.map(profile => (
                        <div
                            key={profile.id}
                            className="p-2 mt-2 bg-base-100   cursor-pointer"
                            onClick={() => router.push(`/u/${profile.handle.localName}`)}>
                            <div className="space-y-3 flex">
                                <div className="overflow-hidden rounded-md flex flex-row">
                                    <Avatar
                                        /* className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square" */
                                        src={profile.metadata?.picture?.optimized?.uri
                                        }
                                        alt={`${profile.metadata?.displayName}.Avatar`} />

                                    <AvatarName localName={profile.handle?.localName ?? profile.id} displayName={profile.metadata.displayName} namespace={`lens`} createdAt={profile.createdAt} id={profile} />
                                </div>
                                <div className='flex-1'></div>
                                {/* <BFollow profile={profile} /> */}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {hasMore && (
                <div className="flex justify-center my-4">
                    <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
                </div>
            )}

        </>
    )
}