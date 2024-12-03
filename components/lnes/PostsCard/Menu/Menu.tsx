'use client'
import { RiAlertLine, RiBookmarkFill, RiBookmarkLine, RiCheckboxMultipleBlankLine, RiCopperCoinLine, RiEyeOffLine, RiMore2Fill, RiShareForwardBoxLine, RiSparkling2Line, RiThumbDownFill, RiThumbDownLine } from "react-icons/ri"
import { AnyPublication, PublicationReactionType, PublicationReportReason, SessionType, useBookmarkToggle, useLogin, useNotInterestedToggle, useReactionToggle, useReportPublication, useSession } from '@lens-protocol/react-web';
import Report from './Report'
import { useState } from "react";
import { LuCopyCheck, LuCopy } from "react-icons/lu";
import HidePub from "./HidePub";
import HideComment from "./HideComment";


export default function Menu({ pub }) {
    const { data: session } = useSession({ suspense: true });
    const isSessionWithProfile = session && session.type === SessionType.WithProfile
    return (
        <div  onClick={(e) => { e.stopPropagation(); }}>
            <div className="dropdown dropdown-end ">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle  btn-sm text-base-content/70 hover:text-base-content"><RiMore2Fill className="size-6 " /></div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1]  w-52 p-2 shadow border">
                    <li>  <RewardToggle publication={pub} /> </li>

                    {isSessionWithProfile && <>
                        <li>  <BookmarkToggle publication={pub} /> </li>
                        <li>  <DownvoteToggle publication={pub} /></li>
                        <li> <EyeOffToggle publication={pub} /> </li>
                        <li className="my-1"></li>
                    </>}

                    <li> <CheckboxMultipleBlankToggle publication={pub} /> </li>
                    <li> <ShareForwardBoxToggle publication={pub} /> </li>
                    <li className="my-1"></li>

                    {session && session.type === SessionType.Anonymous && <li><Report publication={pub} /></li>}

                    {isSessionWithProfile && session?.profile?.handle?.fullHandle !== pub.by?.handle?.fullHandle &&
                        <li><Report publication={pub} /></li>
                    }

                    {isSessionWithProfile && session?.profile?.handle?.fullHandle === pub.by?.handle?.fullHandle &&
                        <li> <HidePub publication={pub} /> </li>
                    }

                </ul>
            </div>
        </div>
    )
}

/* 打赏 */
function RewardToggle({ publication }) {

    return (
        <button className={`flex flex-row  btn-disabled text-zinc-400`}>
            <RiCopperCoinLine className="size-6" /><span>打赏</span>
        </button>
    );
}

/* 收藏 */
function BookmarkToggle({ publication }) {
    const { execute: toggle, loading } = useBookmarkToggle();
    return (
        <button onClick={() => toggle({ publication })} disabled={loading} className={`flex flex-row text-base-content `}>
            {publication?.operations?.hasBookmarked ? (
                <> <RiBookmarkFill className="size-6" /><span>取消收藏</span></>
            ) : (
                <> <RiBookmarkLine className="size-6" /><span>收藏</span></>
            )}
        </button>
    );
}

/* 差 */
function DownvoteToggle({ publication }) {
    const { execute: toggle, loading, error } = useReactionToggle();

    const toggleReaction = async () => {
        await toggle({
            reaction: PublicationReactionType.Downvote,
            publication: publication,
        });
    };



    return (
        <button
            onClick={toggleReaction}
            disabled={loading}
            className={`flex flex-row text-base-content ${publication.operations?.hasDownvote ? ' text-amber-500' : ''}`}>
            {publication.operations?.hasDownvote ? (
                <RiThumbDownFill className="size-6 " />
            ) : (
                <RiThumbDownLine className="size-6 " />
            )}

            {publication.operations?.hasDownvote ? '取消反对' : '反对'}
        </button>
    )
}

/* 兴趣 */
function EyeOffToggle({ publication }: { publication: AnyPublication }) {
    const { execute, loading } = useNotInterestedToggle();

    const toggle = async () => {
        await execute({ publication })
    };
    return (
        <button onClick={toggle} disabled={loading} className={`flex flex-row `}>
            {publication.__typename === 'Mirror' ? '' : publication.operations?.isNotInterested ?
                < ><RiEyeOffLine className="size-6" /><span>取消推荐</span></>
                :
                <><RiSparkling2Line className="size-6" /><span>推荐兴趣</span></>
            }
        </button>
    );
}

/* 复制文本 */
function CheckboxMultipleBlankToggle({ publication }) {
    const [copySuccess, setCopySuccess] = useState(false);
    const copyToClipboard = () => {
        const textToCopy = publication.metadata.content;
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 7000);
    };
    return (
        <button className={`flex flex-row`} onClick={copyToClipboard}>
            {copySuccess ? (
                <><LuCopyCheck className="size-6 text-success" /><span>复制成功</span></>
            ) : (
                <> <LuCopy className="size-6" /> <span>复制文本</span></>
            )}
        </button>
    );
}

/* 分享链接 */
function ShareForwardBoxToggle({ publication }) {
    const [copySuccess, setCopySuccess] = useState(false);
    const copyToClipboard = () => {
        const textToCopy = `https://share.lens.xyz/p/${publication.id}`;
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 7000);
    };
    return (
        <button className={`flex flex-row`} onClick={copyToClipboard}>
            {copySuccess ? (
                <><RiShareForwardBoxLine className="size-6 text-success" /><span>复制成功</span></>
            ) : (
                <>  <RiShareForwardBoxLine className="size-6" /><span>分享链接</span></>
            )}
        </button>

    );
}


export function MenuComment({ comment }) {
    const { data: session } = useSession({ suspense: true });
    const isSessionJustWallet = session && session.type === SessionType.JustWallet
    const isSessionWithProfile = session && session.type === SessionType.WithProfile
    return (
        <>
            <div className="dropdown dropdown-end " onClick={(e) => e.stopPropagation()}>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle  btn-sm text-base-content/70 hover:text-base-content"><RiMore2Fill className="size-6 " /></div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1]  w-52 p-2 shadow border">

                    {isSessionJustWallet && <li>  <RewardToggle publication={comment} /> </li>}

                    {isSessionWithProfile && <>
                        <li>  <BookmarkToggle publication={comment} /> </li>
                        <li>  <DownvoteToggle publication={comment} /></li>
                        <li> <EyeOffToggle publication={comment} /> </li>
                        <li className="my-1"></li>
                    </>}

                    <li> <CheckboxMultipleBlankToggle publication={comment} /> </li>
                    <li> <ShareForwardBoxToggle publication={comment} /> </li>
                    <li className="my-1"></li>

                    {session && session.type === SessionType.Anonymous && <li><Report publication={comment} /></li>}

                    {isSessionWithProfile && (!comment || comment.__typename !== 'Comment' || session.profile.handle?.fullHandle !==
                        comment.root.by.handle?.fullHandle) &&
                        <li><Report publication={comment} /></li>
                    }
                    {isSessionWithProfile && comment && comment.__typename === 'Comment' && session.profile.handle?.fullHandle === comment.root.by.handle?.fullHandle &&
                        <li><HideComment comment={comment} /> </li>
                    }

                </ul>
            </div>
        </>
    )
}