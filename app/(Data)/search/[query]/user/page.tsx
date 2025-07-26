'use client'
import BFollow from '@/components/lnes/Data/u/hook/BFollow';
import { useInfiniteScroll } from '@/components/lnes/Data/u/hook/useInfiniteScroll';
import Avatarimg from '@/components/lnes/PostsCard/Avatarimg';
import AvatarName from '@/components/lnes/PostsCard/AvatarName';
import Avatar from '@/gui/flowbite/Avatar';
import { useSearchProfiles, LimitType } from '@lens-protocol/react-web';
import { useRouter } from 'next/navigation';

export default function SearchProfiles({ params: { query } }) {

  const { data, error, loading, hasMore, observeRef } = useInfiniteScroll(useSearchProfiles({ query: query, limit: LimitType.Ten, }));
  const router = useRouter()

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (data.length === 0) return <p>未找到配置文件</p>;

  return (
    <div className=" min-h-dvh">

      <div className=' flex  lg:flex-wrap flex-col w-full '>
        {data?.map(profile => (
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
      </div>


      {hasMore && (
        <div className="flex justify-center my-4">
          <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
        </div>
      )}

    </div >
  );
}
//https://lens-protocol.github.io/lens-sdk/functions/_lens_protocol_react_web.Core.useSearchPublications.html