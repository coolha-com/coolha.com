'use client'
import {
  useExplorePublications,
  ExplorePublicationType,
  LimitType,
  PublicationMetadataMainFocusType
} from '@lens-protocol/react-web'

import Avatarimg from '@/components/lnes/PostsCard/Avatarimg'
import AvatarName from '@/components/lnes/PostsCard/AvatarName'
import { useInfiniteScroll } from '@/components/lnes/Data/u/hook/useInfiniteScroll'
import Menu from '@/components/lnes/PostsCard/Menu/Menu'
import { useOrderBy } from '../../(home)/home/_contexts/OrderByContext'
import Link from 'next/link'
import LoadingSpinner from '@/gui/LoadingSpinner'
import './video.css'
import { Collects, Comments, Mirrors, Upvote } from './VideoInterct'
export default function Page() {
  const { state, dispatch } = useOrderBy();
  const { orderBy } = state;

  let { data: musicPubs, loading: loadingMusicPubs, hasMore, observeRef } = useInfiniteScroll(useExplorePublications({
    limit: LimitType.Ten,
    orderBy,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Video, PublicationMetadataMainFocusType.ShortVideo]
      }
    }
  })) as any

  return (
    <div className="flex flex-col mx-auto  h-screen overflow-hidden ">
      {loadingMusicPubs && <LoadingSpinner />}

      <div className="h-[calc(100vh-146px)]  md:h-[calc(100vh-90px)]  overflow-y-scroll scroll-snap-y-mandatory">
        {musicPubs?.map((mpub, index) => (
          <div
            key={mpub.id}
            className="snap-center h-full flex flex-col relative"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 p-4 flex items-center w-full z-50">
              <Avatarimg
                href={mpub?.by.handle ? mpub.by.handle.localName : mpub?.by.id}
                src={mpub?.by}
              />
              <AvatarName
                localName={mpub?.by?.handle ? mpub.by.handle.localName : mpub?.by.id}
                displayName={mpub?.by?.metadata?.displayName}
                namespace={mpub?.by?.handle ? mpub.by.handle.namespace : ''}
                id={mpub}
                createdAt={mpub.createdAt}
              />
              <div className="ml-auto">
                <Menu pub={mpub} />
              </div>
            </div>

            {/* Video */}
            <video
              controls
              key={mpub.id}
              className="absolute inset-0 w-full h-full object-contain bg-black"
            >
              <source
                src={mpub.metadata?.asset?.video?.optimized?.uri}
                type="video/mp4"
              />
            </video>

            {/* Interact Buttons */}
            <div className="absolute right-0 bottom-20 flex flex-col  z-10">
              {/* 可以添加其他按钮 */}
              <Upvote dataname={mpub} />
              <Comments dataname={mpub} />
              <Mirrors dataname={mpub} />
              <Collects dataname={mpub} />
              {/*               <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black">
                👍
              </button> */}
            </div>
          </div>
        ))}

        {hasMore && (
          <div className="flex justify-center">
            <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>
    </div>
  )
}
