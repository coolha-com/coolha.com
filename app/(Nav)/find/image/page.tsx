'use client'
import { useState } from 'react'
import {
  useExploreProfiles,
  useExplorePublications,
  ExploreProfilesOrderByType,
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  LimitType,
  PublicationMetadataMainFocusType
} from '@lens-protocol/react-web'


import ReactMarkdown from 'react-markdown'

import InteractCard, { CollectsToggle, UpvoteToggle } from '@/components/lnes/PostsCard/InteractCard'

import Avatar from '@/gui/flowbite/Avatar'
import Avatarimg from '@/components/lnes/PostsCard/Avatarimg'
import AvatarName from '@/components/lnes/PostsCard/AvatarName'
import { UsersPosAtext } from '@/components/lnes/PostsCard/PosAtext'
import { useInfiniteScroll } from '@/components/lnes/Data/u/hook/useInfiniteScroll'
import Menu from '@/components/lnes/PostsCard/Menu/Menu'
import PosVideo from '@/components/lnes/PostsCard/PosVideo'
import { useOrderBy } from '../../home/_contexts/OrderByContext'
import { orderOptions } from '../../home/_contexts/OrderBylist'
import PosImage from '@/components/lnes/PostsCard/PosImage'
import Link from 'next/link'
import LoadingSpinner from '@/gui/LoadingSpinner'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const { state, dispatch } = useOrderBy(); // 使用useOrderBy获取全局状态和dispatch函数
  const { orderBy } = state;

  let { data: musicPubs, loading: loadingMusicPubs, hasMore, observeRef } = useInfiniteScroll(useExplorePublications({
    limit: LimitType.TwentyFive,
    orderBy,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Image]
      }
    }
  })) as any






  return (
    <>


      <div className="flex  flex-col w-full">


        {loadingMusicPubs && <LoadingSpinner />}




        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {musicPubs &&
            Array.from({ length: Math.ceil(musicPubs.length / 3) }, (_, groupIndex) => (
              <div className="grid gap-4" key={groupIndex} >
                {musicPubs
                  .slice(groupIndex * 3, groupIndex * 3 + 3)
                  .map((mpub) => (
                    <Link href={`/posts//${mpub.id}`} key={mpub.id} className="" >
                      {/* 图片部分 */}
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src={mpub.metadata?.asset?.image?.optimized?.uri}
                        alt=""
                      />

                      {/*                       <div className="absolute inset-0 items-start p-4 rounded-lg hidden hover:flex">
                        <div className="flex w-full">
                          <UpvoteToggle dataname={mpub} />
                          <CollectsToggle dataname={mpub} />
                        </div>
                      </div> */}

                    </Link>
                  ))}
              </div>
            ))}
        </div>



        {hasMore && (
          <div className="flex justify-center my-4">
            <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
          </div>
        )}

      </div>
    </>
  )
}