// @ts-nocheck
'use client'
import { publicationId, usePublication, PublicationType, usePublications, LimitType, AnyPublication, Post, Quote, Mirror } from "@lens-protocol/react-web";
import Avatarimg from '@/components/lnes/PostsCard/Avatarimg';
import AvatarName from '@/components/lnes/PostsCard/AvatarName';
import { UsersPosAtext } from '@/components/lnes/PostsCard/PosAtext';
import PosImage from '@/components/lnes/PostsCard/PosImage';
import InteractCard from '@/components/lnes/PostsCard/InteractCard';

import { useInfiniteScroll } from '@/components/lnes/DataUsers/hook/useInfiniteScroll';
import Link from "next/link";
import Meide from "@/components/lnes/PostsCard/Meide";
import { useState } from "react";
import Menu from "@/components/lnes/PostsCard/Menu/Menu";
import React from "react";


export default function Posts({ params }) {
    const { data: pub } = usePublication({
        forId: params.postsid,
        suspense: true,
    });
    const { data: commentsData, loading, hasMore, observeRef } = useInfiniteScroll(usePublications({

        where: {
            /* publicationTypes: [PublicationType.Comment], */
            /* publicationTypes: [PublicationType.Post, PublicationType.Quote,PublicationType.Comment], */
            commentOn: {
                id: publicationId(params.postsid),
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


    if (loading) return <div>加载中...</div>;


    if (!pub) return <div>未找到帖子</div>;

    return (
        <div>



            {/* 主帖 */}


            <div key={pub.id} className="w-dvw lg: p-4 pt-0">

                {pub.__typename === "Mirror" ? (<></>) : (<>
                    <div className="flex">
                        <div className="flex">
                            <Avatarimg
                                href={pub.by?.handle?.localName}
                                src={pub.by}
                            />
                            <AvatarName
                                localName={pub.by?.handle?.localName}
                                displayName={pub.by?.metadata?.displayName}
                                namespace={`lens`}
                                id={pub}
                                createdAt={pub.createdAt} />

                        </div>
                        <div className="flex-1" ></div>
                        <Menu pub={pub} />
                    </div>
                    <div className=''>

                        <UsersPosAtext content={pub.metadata.content} />
                        <Meide pub={pub.metadata?.asset} />
                    </div>
                </>)}

                {/* 如果是引用类型的帖子，显示引用的内容 */}
                {
                    pub.__typename === "Quote" && (
                        <div className="p-6 pl-0">
                            <div className="p-4 border rounded-2xl ">

                                <div className="flex" >
                                    <Avatarimg src={pub.quoteOn.by} href={pub?.by?.handle?.localName} />
                                    <AvatarName
                                        localName={pub.quoteOn.by?.handle?.localName}
                                        displayName={pub.quoteOn.by.metadata?.displayName}
                                        namespace={pub.quoteOn.by.handle?.namespace}
                                        id={pub.quoteOn}
                                        createdAt={pub.quoteOn.createdAt}
                                    />
                                    <div className="flex-1" ></div>

                                </div>

                                <Link href={`/posts/${pub.quoteOn.id}`} passHref>
                                    <UsersPosAtext content={pub.quoteOn?.metadata?.content} />
                                    <Meide pub={pub.quoteOn.metadata.asset} />
                                </Link>
                            </div>
                        </div>
                    )
                }

                <InteractCard dataname={pub} />
            </div>


            <div className="px-6">
                <input type="text" placeholder="回复你的评论" className="input input-bordered w-full" />
            </div>



            {/* 评论区 */}
            <div className="my-4 border-t">
                {commentsData && commentsData.length > 0 ? (commentsData.map((comment) => (

                    <div key={comment.id} className="border-b p-4 ">
                        <Link href={`/posts/${comment.id}`}>
                            <div className="flex">
                                {comment.by && comment.by.handle && comment.by.metadata && (
                                    <>
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
                                    </>
                                )}
                            </div>
                            <div className='mt-2'>
                                {comment.__typename === "Mirror" ? (<></>) : (<>
                                    {comment.metadata && (
                                        <>
                                            <UsersPosAtext content={comment.metadata.content} />
                                            <Meide pub={comment.metadata.asset} />
                                        </>
                                    )}
                                </>)}

                            </div>
                            <InteractCard dataname={comment} />
                        </Link>


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
                )}

                {hasMore && (
                    <div className="flex justify-center my-4">
                        <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
                    </div>
                )}
            </div>

        </div>
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

    if (childLoading) return <div>加载中...</div>;

    return (
        <div>
            {childCommentsData && childCommentsData.length > 0 ? (
                childCommentsData.map((childComment) => (
                    <div className="pb-2">
                        <div key={childComment.id} className="p-4 border rounded-2xl ">

                            <div className="flex">
                                {childComment.by && childComment.by.handle && childComment.by.metadata && (
                                    <>
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
                                        <Menu pub={childComment} />
                                    </>
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

