'use client'

import { useProfile } from '@lens-protocol/react-web'

import { PUBposts } from '@/components/lnes/DataUsers/list/PUBposts';
import Loading from './loading';


export default function ProfileA({ params: { users }}) {

  // 将用户的名字和命名空间从 'users' 参数中拆分出来
  //users = users.split('.')[0];
  //const namespace = users.split('.')[1];

  // 使用拆分出来的命名空间和用户名调用 useProfile 钩子
  let { data: profile, loading } = useProfile({
    forHandle: `lens/${users}`
  });

  return (
    <div className='lg:min-w-3xl mx-auto  bg-base-200'>
      {loading && <div className=" w-full"><Loading /></div>}
      {profile && <PUBposts profile={profile} />}

    </div>
  )
}











