'use client'
import { AddressTruncate } from '@/utils/AddressTruncate';
import { weiToDawei } from '@/utils/uint256to';
import { SessionType, useProfileManagers, useSession, useUpdateProfileManagers } from '@lens-protocol/react-web';
import Link from 'next/link';
import SignlessExperienceChecker from './SignlessExperienceChecker';
import { AddProfileManagers, RemoveProfileManagers } from './UpdateProfileManagers';
//https://www.lens.xyz/docs/primitives/profile/manager
export default function ProfilesManaged() {
  const { data: session } = useSession();
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

    const { data: ProfileManagers, error, loading } = useProfileManagers({
      for: session.profile.id,
    });

    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    if (ProfileManagers.length === 0) {
      return <p>No profiles managed by this wallet.</p>;
    }

    return (
      <div>

        <SignlessExperienceChecker />


        <div className='p-2'>
          <p className='p-2'> 可以控制您Lens个人资料的帐户,可以代表您执行操作。 </p>
          <div ><AddProfileManagers /></div>
          <ul>
            {ProfileManagers.map(({ address, isLensManager }) => (
              <li
                key={address}
                className="p-2 mt-2 bg-base-100   cursor-pointer"
              >
                <div className="space-y-3 flex">
                  <div className="overflow-hidden rounded-md flex flex-row items-center" >

                    <Link href={`https://polygonscan.com/address/${address}`} className="link link-hover" target='_blank'>
                      <span className=""> {AddressTruncate(address)}↗ </span>
                    </Link>
                    - {isLensManager ? 'Lens Profile Manager' : 'Other'}
                  </div>
                  <div className='flex-1'> </div>
                  <div className="flex h-full  items-center"><RemoveProfileManagers address={address} /></div>
                </div>
              </li>
            ))}
          </ul>
        </div>




      </div>
    );
  }
}
