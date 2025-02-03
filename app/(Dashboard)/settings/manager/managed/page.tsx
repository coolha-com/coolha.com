'use client'
import Avatarimg from '@/components/lnes/PostsCard/Avatarimg';
import { SessionType, useOwnedHandles, useProfile, useProfilesManaged, useSession } from '@lens-protocol/react-web';
import Link from 'next/link';
//https://www.lens.xyz/docs/primitives/profile/managed-profiles

export default function ProfilesManaged() {
  const { data: session } = useSession({ suspense: true });
  if (session && session.type === SessionType.Anonymous) {
    return (
      <div className="">
        <div>暂未连接钱包</div>
      </div>
    );
  }
  if (session && session.type === SessionType.JustWallet) {
    return (
      <div className="">
        <div>暂未连接Lens</div>
      </div>
    );
  }
  if (session && session.type === SessionType.WithProfile) {

    const { data: profiles, error, loading } = useProfilesManaged({
      for: session.address,
    });

    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    if (profiles.length === 0) {
      return <p>No profiles managed by this wallet.</p>;
    }

    return (
      <div>
        由您监督和管理的配置文件。
        {profiles.map((profile) => (
            <div
            key={profile.id}
            className="p-2 mt-2 bg-base-100   cursor-pointer"
          >
            <div className="space-y-3 flex">
              <div className="overflow-hidden rounded-md flex flex-row items-center" >
                <Avatarimg
                  href={profile && profile.handle ? profile.handle.localName : profile.id}
                  src={profile}
                />
                <Link href={`/u/${profile.handle?.localName ?? profile.id ? profile.handle?.localName ?? profile.id : profile.id}`} className="flex flex-col  items-center text-xs md:text-base ml-3">
                  <b className=" flex items-center overflow-hidden text-ellipsis whitespace-nowrap hover:underline hover:caret-primary hover:text-info ">{profile?.metadata?.displayName ? profile?.metadata?.displayName : ''} </b>
                  <span className="ml-1 text-[#878787] hover:underline hidden xs:flex">@{profile.handle?.localName ?? profile.id ? profile.handle?.localName ?? profile.id : profile.id}</span>
                </Link>

              </div>
              <div className='flex-1'></div>
              <div className="flex h-full  items-center"></div>
            </div>
          </div>
        ))}

      </div>
    );
  }
}