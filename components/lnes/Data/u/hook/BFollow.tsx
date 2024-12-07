import React from 'react';
import FollowButton from './Follow';
import UnFollowButton from './UnFollow';
import { Profile, SessionType, useSession } from '@lens-protocol/react-web';
import Link from 'next/link';
export default function BFollow({ profile }: { profile: Profile }) {

  // 使用 profile.operations.canFollow 和 profile.operations.canUnfollow 来决定按钮显示
  const canFollow = profile?.operations?.canFollow;
  const canUnfollow = profile?.operations?.canUnfollow;


  const { data: session } = useSession({ suspense: true });
  //当前登入的账户
  let profileHandle;
  if (session.type === SessionType.WithProfile && session.profile?.handle?.fullHandle) {
    profileHandle = session.profile.handle.fullHandle;
  }

  const UsersID = profileHandle && profile?.handle?.fullHandle === profileHandle && profile?.handle?.fullHandle
  return (
    <div>


      {UsersID ?
        (<Link href={`/settings/edit_profile`} className="btn btn-sm btn-primary text-black">编辑资料</Link>)
        :
        (<> {canUnfollow ? (<UnFollowButton profile={profile} />) : (<FollowButton profile={profile} />)} </>)
      }

    </div>
  );
}