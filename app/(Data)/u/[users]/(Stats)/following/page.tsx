'use client'

/* import BFollow from "@/components/lnes/DataUsers/hook/BFollow"; */
import { useInfiniteScroll } from "@/components/lnes/Data/u/hook/useInfiniteScroll";
import Avatarimg from "@/components/lnes/PostsCard/Avatarimg";
import AvatarName from "@/components/lnes/PostsCard/AvatarName";
import { useProfile, useProfileFollowing } from "@lens-protocol/react-web";
import { useRouter } from 'next/navigation'

export default function following({ params: { users }, }) {
  const router = useRouter()
  const { data: profile } = useProfile({
    forHandle: `lens/${users}`
  });
  if (!profile) {
    return <div>正在加载档案信息...</div>;
  }
  const { data: ProfileFollowing, hasMore, observeRef } = useInfiniteScroll(useProfileFollowing({
    for: profile.id,
  }));
  return (
    <>
      <div className='py-1'> ta 关注的</div>
      <div className="flex mx-auto  justify-center">

        <div className=' flex  lg:flex-wrap flex-col w-full '>
          {ProfileFollowing?.map(Following => (
            <div
              key={Following.id}
              className="p-4 py-2 mt-2 bg-base-100   cursor-pointer"
              onClick={() => router.push(`/u/${Following?.handle?.localName}`)}>
              <div className="space-y-3 flex">
                <div className="overflow-hidden rounded-md flex flex-row">
                  <Avatarimg
                    /* className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square" */
                    href={Following.handle ? Following.handle.localName : Following.id}
                    src={Following} />

                  <AvatarName localName={Following.handle?.localName ?? Following.id} displayName={Following?.metadata?.displayName} namespace={`lens`} createdAt={Following.createdAt} id={Following} />
                </div>
                <div className='flex-1'></div>
                {/* <BFollow profile={Following} /> */}
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