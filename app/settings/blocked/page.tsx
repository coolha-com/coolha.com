'use client'
import AvatarName from "@/components/lnes/PostsCard/AvatarName";
import Avatar from "@/gui/flowbite/Avatar";
import { SessionType, useBlockedProfiles, useProfile, useSession } from "@lens-protocol/react-web";
import { useRouter } from "next/navigation";
import { UnblockButton } from "./UnblockButton";
import Link from "next/link";
import Avatarimg from "@/components/lnes/PostsCard/Avatarimg";

export default function page() {
  const router = useRouter()

  const { data: datauseSession } = useSession({ suspense: true });
  if (datauseSession && datauseSession.type === SessionType.WithProfile) {
    const { data: BlockedProfiles } = useBlockedProfiles();
    if (BlockedProfiles?.length === 0) return <div  >未找到被屏蔽的配置文件</div>;
    return (
      <div>
        <div>
          <h1>被屏蔽的配置文件列表</h1>
          <p>您可以随时取消屏蔽它们。</p>
        </div>
        <div className=' flex  lg:flex-wrap flex-col w-full '>
          {BlockedProfiles?.map(profile => (
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
                <div className="flex h-full  items-center"><UnblockButton profile={profile} /></div>
              </div>
            </div>
          ))}

        </div>
      </div>
    )
  }
}
