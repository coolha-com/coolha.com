// @ts-nocheck
'use client'
import { useInfiniteScroll } from "@/components/lnes/DataUsers/hook/useInfiniteScroll";
import Avatarimg from "@/components/lnes/PostsCard/Avatarimg";
import AvatarName from "@/components/lnes/PostsCard/AvatarName";
import InteractCard from "@/components/lnes/PostsCard/InteractCard";
import Meide from "@/components/lnes/PostsCard/Meide";
import {MenuComment} from "@/components/lnes/PostsCard/Menu/Menu";
import { UsersPosAtext } from "@/components/lnes/PostsCard/PosAtext";
import { usePublications, publicationId, LimitType, HiddenCommentsType } from "@lens-protocol/react-web";
import Link from "next/link";
import { useState } from "react";

export default function page({ params }) {


  const { data: commentsData, loading, hasMore, observeRef } = useInfiniteScroll(usePublications({
    where: {
      /* publicationTypes: [PublicationType.Comment], */
      /* publicationTypes: [PublicationType.Post, PublicationType.Quote,PublicationType.Comment], */
      commentOn: {
        id: publicationId(params.postsid),
        hiddenComments: HiddenCommentsType.Hide,
      },
    },
    limit: LimitType.TwentyFive,
  }));
  const [expandedComments, setExpandedComments] = useState({});
  const toggleComment = (commentId) => {
    setExpandedComments(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    }));
  };


  if (loading) return <div>评论加载中...</div>;
  return (
    <div>

      <div className=" py-2 mt-2 ">
        <input type="text" placeholder="回复你的评论" className="input input-bordered w-full bg-base-100" />
      </div>

      {/* 评论区 */}
      <div className="my-2 border-t bg-base-100" >
        {commentsData && commentsData.length > 0 ? (commentsData.map((comment) => (

          <div key={comment.id} className="border-b p-4 py-2 ">
            <div className="flex">
              {comment.by && comment.by.handle && comment.by.metadata && (
                <div className="flex">
                  <div className="flex">
                    <Avatarimg
                      href={comment.by.handle.localName}
                      src={comment.by}
                    />
                    <AvatarName
                      localName={comment.by.handle.localName || 'unknown'}
                      displayName={comment.by.metadata.displayName || 'unknown'}
                      namespace={`lens`}
                      id={comment}
                      createdAt={comment.createdAt}
                    />
                  </div>
                  <div className="flex-1 flex" >
                    <Link href={`/posts/${comment.id}`} className="flex-1"></Link>
                  </div>
                  <MenuComment comment={comment} />
                 
                </div>
              )}
            </div>
            <div className='mt-2'>
              {comment.__typename === "Mirror" ? (<></>) : (<>
                {comment.metadata && (
                  <Link href={`/posts/${comment.id}`}>
                    <UsersPosAtext content={comment.metadata.content} />
                    <Meide pub={comment.metadata.asset} />
                  </Link>
                )}
              </>)}
            </div>
            <InteractCard dataname={comment} />


            {/* 子评论 */}
            {comment.__typename === "Mirror" ? (<></>) : (<>
              {comment.stats?.comments > 0 &&
                <button onClick={() => toggleComment(comment.id)} className="text-info">
                  {expandedComments[comment.id] ? '隐藏子评论' : `展开子评论${comment.stats?.comments}`}
                </button>
              }
            </>)}

            {/* 在这里添加子评论帖的评论内容 */}
            {expandedComments[comment.id] && (
              <div className="mt-4 pl-4">
                <ChildComments commentId={comment.id} />
              </div>
            )}


          </div>
        ))
        ) : (
          <div className="flex justify-center items-center">暂无评论</div>
        )
        }

        {
          hasMore && (
            <div className="flex justify-center my-4">
              <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
            </div>
          )
        }
      </div >
    </div >
  )
}

function ChildComments({ commentId }) {
  const { data: childCommentsData, loading: childLoading } = useInfiniteScroll(usePublications({
    where: {
      commentOn: {
        id: publicationId(commentId),
      },
    },
    limit: LimitType.TwentyFive,
  }));

  if (childLoading) return <div>加载评论中...</div>;

  return (
    <div>
      {childCommentsData && childCommentsData.length > 0 ? (
        childCommentsData.map((childComment) => (
          <div className="pb-2">
            <div key={childComment.id} className="p-4 py-2 border rounded-2xl ">

              <div className="flex">
                {childComment.by && childComment.by.handle && childComment.by.metadata && (
                  <div className=" flex">
                    <div className=" flex">
                      <Avatarimg
                        href={childComment.by.handle.localName}
                        src={childComment.by}
                      />
                      <AvatarName
                        localName={childComment.by.handle.localName || 'unknown'}
                        displayName={childComment.by.metadata.displayName || 'unknown'}
                        namespace={`lens`}
                        id={childComment}
                        createdAt={childComment.createdAt}
                      />
                    </div>
                    <div className="flex-1" ></div>
                    <MenuComment comment={childComment} />
                  </div>
                )}
              </div>

              <div className='mt-2'>
                <Link href={`/posts/${childComment.id}`}>
                  {childComment.__typename === "Mirror" ? (<></>) : (<>
                    {childComment.metadata && (
                      <>
                        <UsersPosAtext content={childComment.metadata.content} />
                        <Meide pub={childComment.metadata.asset} />
                      </>
                    )}
                  </>)}
                </Link>
              </div>

              <InteractCard dataname={childComment} />

            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center">暂无子评论</div>
      )}
    </div>
  );
}