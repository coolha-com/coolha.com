'use client'

import { usePublications, PublicationType, PublicationMetadataMainFocusType, LimitType, } from "@lens-protocol/react-web"
import { useInfiniteScroll } from "../hook/useInfiniteScroll"
import Link from "next/link"
import Avatarimg from "../../../PostsCard/Avatarimg"
import AvatarName from "../../../PostsCard/AvatarName"
import InteractCard from "../../../PostsCard/InteractCard"
import Meide from "../../../PostsCard/Meide"
import Menu from "../../../PostsCard/Menu/Menu"
import { UsersPosAtext } from "../../../PostsCard/PosAtext"

export default function PUBcollects({ profile }) {

  const { data, hasMore, observeRef } = useInfiniteScroll(usePublications({
    limit: LimitType.TwentyFive,
    where: {
      from: [profile?.id],
      publicationTypes: [PublicationType.Post],
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Mint]
      }
    }
  }))

  return (
    <div className="flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-dvw">
      {data?.map((pub: any, index: number) => (
        <div key={pub.id} className="bg-base-100   md:max-w-3xl w-dvw mt-2 p-4 pt-2 ">


          <>
            <div className="flex  ">
              <div className="flex" >
                <Avatarimg src={pub.by} href={pub.by.handle.localName} />
                <AvatarName
                  localName={pub.by.handle.localName}
                  displayName={pub.by.metadata?.displayName}
                  namespace={pub.by.handle.namespace}
                  id={pub}
                  createdAt={pub.createdAt}
                />
              </div>
              <div className="flex-1 flex" ><Link href={`/p/${pub.id}`} className="flex-1"></Link></div>
              <Menu pub={pub} />
            </div>
            <Link href={`/p/${pub.id}`} passHref legacyBehavior>
              <div>

                <UsersPosAtext content={pub.metadata.content} />
                <Meide pub={pub.metadata.asset} />

              </div>
            </Link>
            {/* 如果是引用类型的帖子，显示引用的内容 */}
            {pub.__typename === "Quote" && (
              <div className="p-6 pl-0">
                <div className="p-4 py-2 border rounded-2xl ">

                  <div className="flex" >
                    <Avatarimg src={pub.quoteOn.by} href={pub.by.handle.localName} />
                    <AvatarName
                      localName={pub.quoteOn.by.handle.localName}
                      displayName={pub.quoteOn.by.metadata?.displayName}
                      namespace={pub.quoteOn.by.handle.namespace}
                      id={pub.quoteOn}
                      createdAt={pub.quoteOn.createdAt}
                    />
                    <div className="flex-1 flex" ><Link href={`/p/${pub.quoteOn.id}`} className="flex-1"></Link></div>
                  </div>

                  <Link href={`/p/${pub.quoteOn.id}`} passHref>
                    <UsersPosAtext content={pub.quoteOn.metadata.content} />
                    <Meide pub={pub.quoteOn.metadata.asset} />
                  </Link>
                </div>
              </div>
            )}
          </>






          {pub.__typename === "Mirror" ? (<><InteractCard dataname={pub.mirrorOn} /></>
          ) : (<InteractCard dataname={pub} />)}

        </div >
      ))}

      {
        hasMore && (
          <div className="flex justify-center my-4 bg-base-100">
            <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
          </div>
        )
      }

    </div >
  )
}