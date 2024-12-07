'use client'
import { useState } from 'react'
import {
  useExploreProfiles,
  useExplorePublications,
  ExploreProfilesOrderByType,
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  LimitType,
  PublicationMetadataMainFocusType,
  PublicationReactionType,
  useReactionToggle
} from '@lens-protocol/react-web'


import ReactMarkdown from 'react-markdown'

import InteractCard, { CollectsToggle, UpvoteToggle } from '@/components/lnes/PostsCard/InteractCard'

import Avatar from '@/gui/flowbite/Avatar'
import Avatarimg from '@/components/lnes/PostsCard/Avatarimg'
import AvatarName from '@/components/lnes/PostsCard/AvatarName'
import { PosAtext, UsersPosAtext } from '@/components/lnes/PostsCard/PosAtext'
import { useInfiniteScroll } from '@/components/lnes/Data/u/hook/useInfiniteScroll'
import Menu from '@/components/lnes/PostsCard/Menu/Menu'
import PosVideo from '@/components/lnes/PostsCard/PosVideo'
import { useOrderBy } from '../../home/_contexts/OrderByContext'
import { orderOptions } from '../../home/_contexts/OrderBylist'
import PosImage from '@/components/lnes/PostsCard/PosImage'
import Link from 'next/link'
import Meide from '@/components/lnes/PostsCard/Meide'
import LoadingSpinner from '@/gui/LoadingSpinner'
import { formatNumberWithUnit } from '@/utils/formatNumber'
import { RiHeart3Fill, RiHeart3Line, RiShoppingBagLine, RiVerifiedBadgeFill } from 'react-icons/ri'
import { timeAgo } from '@/utils/formatDate'
import Motion from '@/gui/framer/Motion'
import { motion } from 'motion/react'
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
        mainContentFocus: [PublicationMetadataMainFocusType.Article, PublicationMetadataMainFocusType.Story,]
      }
    }
  })) as any






  return (
    <>


      <div className="flex flex-wrap flex-col items-center justify-center  w-full p-4 mb-16 md:mb-0">


        {loadingMusicPubs && <LoadingSpinner />}

        <div className='"place-items-center grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 '>
          {musicPubs?.map(mpub => (
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} key={mpub.id}>

              <div className="card bg-base-100 w-full sm:w-80 md:h-[500px] shadow-xl shadow-base-content/10 cursor-pointer" onClick={() => router.push(`/posts//${mpub.id}`)} >
                <figure > <div className=' w-full h-32 flex justify-center items-center bg-primary'><p className='text-black text-xl'>{mpub.by?.metadata?.displayName ? mpub.by?.metadata?.displayName : ''}</p>  </div> </figure>
                <div className="card-body">
                  <div className="card-title">
                    <div className=" flex">
                      <div className="flex">
                        <Avatarimg href={mpub.by && mpub.by?.handle ? mpub.by?.handle?.localName : mpub.by?.id} src={mpub.by} />

                        <div className="ml-3">
                          <Link href={`/u/${mpub.by && mpub.by?.handle ? mpub.by?.handle?.localName : mpub.by?.id ? mpub.by && mpub.by?.handle ? mpub.by?.handle?.localName : mpub.by?.id : mpub.by.id}`} className="flex flex-row  items-center text-xs md:text-base">
                            <b className=" flex items-center overflow-hidden text-ellipsis whitespace-nowrap hover:underline hover:caret-primary hover:text-info ">{mpub.by?.metadata?.displayName ? mpub.by?.metadata?.displayName : ''} </b>
                            <RiVerifiedBadgeFill className=" size-4 ml-1 text-primary rounded-full" />
                          </Link>
                          <div className="">
                            <span className=' text-base-content/50  text-xs md:text-sm'> {timeAgo(mpub.createdAt)}</span>
                            {mpub?.metadata?.appId ? <span className=' text-base-content/50  text-xs md:text-sm'> {mpub?.metadata?.appId}</span> : ''}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <p className='line-clamp-3 text-ellipsis overflow-auto'>{mpub.metadata?.content}</p>
                  <div className="card-actions justify-end ">
                    <UpvoteToggle dataname={mpub} />
                    <CollectsToggle dataname={mpub} />
                  </div>
                </div>
              </div>

            </motion.div>
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

