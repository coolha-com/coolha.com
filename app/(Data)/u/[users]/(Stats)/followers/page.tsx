'use client'
/* import BFollow from '@/components/lnes/DataUsers/hook/BFollow'; */
import { useInfiniteScroll } from '@/components/lnes/Data/u/hook/useInfiniteScroll';
import Avatarimg from '@/components/lnes/PostsCard/Avatarimg';
import AvatarName from '@/components/lnes/PostsCard/AvatarName';
import { useProfile, useProfileFollowers } from '@lens-protocol/react-web';
import Link from 'next/link';
import { useRouter } from 'next/navigation'


export default function followers({ params: { users }, }) {
  const router = useRouter()
  const { data: profile } = useProfile({
    forHandle: `lens/${users}`
  });
  if (!profile) {
    return <div>正在加载档案信息...</div>;
  }
  const { data: ProfileFollowers, hasMore, observeRef } = useInfiniteScroll(useProfileFollowers({
    of: profile.id,
  }));
  return (
    <div>

      <div className='py-2'>
        ta 的粉丝 <Link href={`/u/${users}/mutual_followers`} className='btn btn-sm'>共同关注了ta</Link>
      </div>

      <div className="flex mx-auto  justify-center">

        <div className=' flex  lg:flex-wrap flex-col w-full '>
          {ProfileFollowers?.map(Followers => (
            <div
              key={Followers.id}
              className="p-4 py-2 mt-2 bg-base-100   cursor-pointer"
              onClick={() => router.push(`/u/${Followers?.handle?.localName}`)}>
              <div className="space-y-3 flex">
                <div className="overflow-hidden rounded-md flex flex-row">
                  <Avatarimg
                    /* className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square" */
                    href={Followers.handle ? Followers.handle.localName : Followers.id}
                    src={Followers} />

                  <AvatarName localName={Followers.handle?.localName ?? Followers.id} displayName={Followers?.metadata?.displayName} namespace={`lens`} createdAt={Followers.createdAt} id={Followers} />
                </div>
                <div className='flex-1'></div>
                {/* <BFollow profile={Followers} /> */}
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

    </div>
  )
}