'use client'

import Avatar from "@/gui/flowbite/Avatar";
import { usePublications, Profile, PublicationType, LimitType, publicationId } from "@lens-protocol/react-web";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import PosImage from "../../../PostsCard/PosImage";
import AvatarName from "../../../PostsCard/AvatarName";
import InteractCard from "../../../PostsCard/InteractCard";
import { useInfiniteScroll } from "@/components/lnes/Data/u/hook/useInfiniteScroll";
import { UsersPosAtext } from "../../../PostsCard/PosAtext";
import Avatarimg from "../../../PostsCard/Avatarimg";
import Meide from "../../../PostsCard/Meide";
import Menu from "../../../PostsCard/Menu/Menu";

export default function PUBcomments({ profile }) {
  const { data, hasMore, observeRef } = useInfiniteScroll(usePublications({
    limit: LimitType.Ten,
    //orderBy: ExplorePublicationsOrderByType.LensCurated,
    where: {
      from: [profile?.id],
      publicationTypes: [PublicationType.Comment],
    },
  }))


  return (
    <>
      {data?.map((comment: any, index: number) => (
        <>

          <div key={index} className=" bg-base-100 w-dvw md:max-w-3xl mt-2 ">

            {/* 如果是引用类型的帖子，显示引用的内容 */}
            {comment.__typename === "Comment" && (
              <div className="pb-6">
                <div className="p-4 py-2  ">
                  <div className="flex" >
                    <Avatarimg src={comment.commentOn.by} href={comment.commentOn.by.handle.localName} />
                    <AvatarName
                      localName={comment.commentOn.by.handle.localName}
                      displayName={comment.commentOn.by.metadata?.displayName}
                      namespace={comment.commentOn.by.handle.namespace}
                      id={comment.commentOn}
                      createdAt={comment.commentOn.createdAt}
                    />
                    <div className="flex-1" ></div>
                    <Menu pub={comment.commentOn} />
                  </div>

                  <Link href={`/posts/${comment.commentOn.id}`} passHref>
                    <UsersPosAtext content={comment.commentOn.metadata.content} />
                    <Meide pub={comment.commentOn.metadata.asset} />
                  </Link>
                  <InteractCard dataname={comment.commentOn} />
                  <div className="h-12 w-0.5  border ml-4 absolute"></div>{/* 连线 */}
                </div>

              </div>
            )}


            {/* 用户的评论 */}
            <div className="p-4">
              <div className="p-4 py-2 border rounded-2xl ">

                {/* users */}
                <div className="flex">
                  <Avatarimg src={comment.by} href={comment.by.handle.localName} />
                  <AvatarName
                    localName={comment.by.handle.localName}
                    displayName={comment.by.metadata?.displayName}
                    namespace={comment.by.handle.namespace}
                    id={comment}
                    createdAt={comment.createdAt} />
                  <div className="flex-1" ></div>
                  <Menu pub={comment} />
                </div>

                {/* users posts data */}
                <div className=''>
                  <Link href={`/posts/${comment.id}`}>
                    {comment.metadata.content && <UsersPosAtext content={comment.metadata.content} />}
                    {comment.metadata.asset && <Meide pub={comment.metadata.asset} />}
                  </Link>
                </div>


                <InteractCard dataname={comment} />


              </div>
            </div>




          </div >




        </>
      ))}


      {
        hasMore && (
          <div className="flex justify-center my-4  bg-base-100">
            <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
          </div>
        )
      }


    </>
  );
}
