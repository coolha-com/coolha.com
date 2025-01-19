'use client'

import { useProfile } from '@lens-protocol/react-web'

import { PUBposts } from '@/components/lnes/Data/u/list/PUBposts';


export default function page({ params: { users } }) {

  // 将用户的名字和命名空间从 'users' 参数中拆分出来
  //users = users.split('.')[0];
  //const namespace = users.split('.')[1];

  // 使用拆分出来的命名空间和用户名调用 useProfile 钩子
  const { data: profile } = useProfile({
    forHandle: `lens/${users}`
  });

  return (
    <div className='lg:min-w-3xl mx-auto  bg-base-200'>
      {profile && <PUBposts profile={profile} />}

    </div>
  )
}











