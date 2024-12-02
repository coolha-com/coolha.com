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

import InteractCard from '@/components/lnes/PostsCard/InteractCard'
import { RiLoader4Line } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import Avatar from '@/gui/flowbite/Avatar'
import Avatarimg from '@/components/lnes/PostsCard/Avatarimg'
import AvatarName from '@/components/lnes/PostsCard/AvatarName'
import { UsersPosAtext } from '@/components/lnes/PostsCard/PosAtext'
import PosMusic from '@/components/lnes/PostsCard/PosMusic'
import { useInfiniteScroll } from '@/components/lnes/DataUsers/hook/useInfiniteScroll'
import Menu from '@/components/lnes/PostsCard/Menu/Menu'
import PosVideo from '@/components/lnes/PostsCard/PosVideo'
import { useOrderBy } from '../_contexts/OrderByContext'
import { orderOptions } from '../_contexts/OrderBylist'
import Link from 'next/link'
import LoadingSpinner from '@/gui/LoadingSpinner'

export default function Page() {
  const { state, dispatch } = useOrderBy(); 
  const { orderBy } = state;

  let { data: musicPubs, loading: loadingMusicPubs, hasMore, observeRef } = useInfiniteScroll(useExplorePublications({
    limit: LimitType.TwentyFive,
    orderBy,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Video,PublicationMetadataMainFocusType.ShortVideo]
      }
    }
  })) as any






  return (
    <>


      <div className="flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-[100vw]">


        {loadingMusicPubs && <LoadingSpinner />}


        {musicPubs?.map(mpub => (
          <div
            className=" bg-base-100  w-dvw  lg:max-w-3xl p-4 py-2 mt-2"
            key={mpub.id}
          /*  onClick={() => router.push(`https://share.lens.xyz/p/${mpub.id}`)} */
          >

            <div className=" flex">
              <div className="flex">
                <Avatarimg
                  href={mpub.by && mpub.by.handle ? mpub.by.handle.localName : mpub.by.id}
                  src={mpub.by}
                />
                <AvatarName
                  localName={mpub.by && mpub.by.handle ? mpub.by.handle.localName : mpub.by.id}
                  displayName={mpub.by?.metadata?.displayName} 
                  namespace={mpub.by && mpub.by.handle ? mpub.by.handle.namespace : ''}
                  id={mpub}
                  createdAt={mpub.createdAt} />
              </div>
              <div className="flex-1 flex" ><Link href={`/posts/${mpub.id}`} className="flex-1"></Link></div>
              <Menu pub={mpub} />
            </div>


            <div className='' >

              <UsersPosAtext content={mpub.metadata.content} />

              <PosVideo
                src={mpub.metadata?.asset?.video?.optimized?.uri}
              />
            </div>


            <InteractCard dataname={mpub} />



          </div>
        ))}

        {hasMore && (
          <div className="flex justify-center my-4">
            <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
          </div>
        )}

      </div>
    </>
  )
}