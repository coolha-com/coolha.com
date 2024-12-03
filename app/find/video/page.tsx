'use client'
import {
  useExplorePublications,
  ExplorePublicationType,
  LimitType,
  PublicationMetadataMainFocusType
} from '@lens-protocol/react-web'
import InteractCard from '@/components/lnes/PostsCard/InteractCard'

import Avatarimg from '@/components/lnes/PostsCard/Avatarimg'
import AvatarName from '@/components/lnes/PostsCard/AvatarName'
import { PosAtext, UsersPosAtext } from '@/components/lnes/PostsCard/PosAtext'
import { useInfiniteScroll } from '@/components/lnes/DataUsers/hook/useInfiniteScroll'
import Menu from '@/components/lnes/PostsCard/Menu/Menu'
import PosVideo from '@/components/lnes/PostsCard/PosVideo'
import { useOrderBy } from '../../(Nav)/home/_contexts/OrderByContext'
import Link from 'next/link'
import LoadingSpinner from '@/gui/LoadingSpinner'
import { convertLinksToHTML } from '@/utils/convertLinksToHTML'

export default function Page() {
  const { state, dispatch } = useOrderBy();
  const { orderBy } = state;

  let { data: musicPubs, loading: loadingMusicPubs, hasMore, observeRef } = useInfiniteScroll(useExplorePublications({
    limit: LimitType.TwentyFive,
    orderBy,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Video, PublicationMetadataMainFocusType.ShortVideo,PublicationMetadataMainFocusType.TextOnly]
      }
    }
  })) as any






  return (
    <>



      <div className="flex  flex-col w-full ">


        {loadingMusicPubs && <LoadingSpinner />}


        <div className="carousel carousel-vertical  h-[calc(100vh-152px)] w-full   items-center">
          {musicPubs?.map(mpub => (

            <div className={`carousel-item h-full md:h-[600px] max-w-3xl flex flex-col justify-center`} >
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
              
              <video controls key={mpub.id} className='h-96  w-dvw '>
                <source src={mpub.metadata?.asset?.video?.optimized?.uri} type="video/mp4" className='w-full aspect-video'/>
              </video>

              {/*               <div className='w-full'>
                 <PosAtext content={mpub.metadata.content} />
                <InteractCard dataname={mpub} />
              </div> */}
            </div>

          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center">
            <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
          </div>
        )}

      </div>
    </>
  )
}