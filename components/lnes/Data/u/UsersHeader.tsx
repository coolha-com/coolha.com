
'use client'
import { UnblockButton } from "@/app/settings/blocked/UnblockButton";
import { SessionType, useBlockProfiles, useSession, useUnblockProfiles } from "@lens-protocol/react-web";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { RiAlertLine, RiArrowLeftLine, RiCheckboxMultipleBlankLine, RiMore2Fill, RiShareForwardBoxLine, RiUserForbidLine } from "react-icons/ri";
export default function UsersHeader({ name, profile }) {
    const router = useRouter();
    const { data: session } = useSession({ suspense: true });
    //当前登入的账户
    let profileHandle;
    if (session.type === SessionType.WithProfile && session.profile?.handle?.fullHandle) {
        profileHandle = session.profile.handle.fullHandle;
    }

    const UsersID = profileHandle && profile?.handle?.fullHandle === profileHandle && profile?.handle?.fullHandle
    return (
        <div>
            {/* header */}
            <div className="navbar py-0 bg-base-100">
                <div className=" navbar-start">
                    <button className="btn btn-square btn-ghost" onClick={() => router.back()}>
                        <RiArrowLeftLine size={24} />
                    </button>
                </div>
                <div className=" navbar-center">{name}</div>
                <div className=" navbar-end">

                    {UsersID ? (
                        <div className="dropdown dropdown-end " onClick={(e) => e.stopPropagation()}>
                            <div tabIndex={0} role="button" className="btn btn-square btn-ghost ">
                                <RiMore2Fill size={24} />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1]  w-52 p-2 shadow border">
                                <li> <CheckboxMultipleBlankToggle profileS={profile} /> </li>
                                <li> <ShareForwardBoxToggle profileS={profile} /> </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="dropdown dropdown-end " onClick={(e) => e.stopPropagation()}>
                            <div tabIndex={0} role="button" className="btn btn-square btn-ghost ">
                                <RiMore2Fill size={24} />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1]  w-52 p-2 shadow border">
                                <li> <CheckboxMultipleBlankToggle profileS={profile} /> </li>
                                <li> <ShareForwardBoxToggle profileS={profile} /> </li>

                                <li className="my-1"></li>
                                {session.type === SessionType.WithProfile && <li > <BlockedProfileToggle profileS={profile} /></li>}
                                <li > <ReportProfileToggle profileS={profile} /></li>
                            </ul>
                        </div>
                    )}



                </div>
            </div>
        </div>
    )
}

/* 复制文本 */
function CheckboxMultipleBlankToggle({ profileS }) {
    const ensName = profileS?.onchainIdentity?.ens?.name;
    const ethAddress = profileS?.ownedBy?.address;
    const [copySuccess, setCopySuccess] = useState(false);

    const copyToClipboard = () => {
        const textToCopy = ensName || ethAddress;
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
                <> <LuCopy className="size-6" /> <span>复制地址</span></>
            )}
        </button>
    );
}

/* 分享链接 */
function ShareForwardBoxToggle({ profileS }) {
    const [copySuccess, setCopySuccess] = useState(false);
    const copyToClipboard = () => {
        const textToCopy = `https://share.lens.xyz/u/lens/${profileS.handle.localName}`;
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

/* 屏蔽用户 */
function BlockedProfileToggle({ profileS }) {
    const { execute: executeBlock, loading: loadingBlock } = useBlockProfiles();
    const block = async () => {
        if (profileS?.operations?.isBlockedByMe?.isFinalisedOnchain === false) {
            window.alert(
                '在链上完成待处理操作之前，您无法取消阻止此配置文件',
            );
            return;
        }
        const result = await executeBlock({ profiles: [profileS] });
        if (result.isFailure()) {
            window.alert(result.error.message);
            return;
        }
        const completion = await result.value.waitForCompletion();
        if (completion.isFailure()) {
            window.alert(completion.error.message);
            return;
        }
        window.alert('已成功屏蔽');
    };

    const { execute: executeUnblock, loading: loadingUnblock } = useUnblockProfiles();

    const unblock = async () => {
        if (profileS?.operations?.isBlockedByMe?.isFinalisedOnchain === false) {
            window.alert(
                '在链上完成待处理操作之前，您无法取消屏蔽此配置文件',
            );
            return;
        }
        const result = await executeUnblock({ profiles: [profileS] });

        if (result.isFailure()) {
            window.alert(result.error.message);
            return;
        }

        const completion = await result.value.waitForCompletion();

        if (completion.isFailure()) {
            window.alert(completion.error.message);
            return;
        }

        window.alert(`成功取消屏蔽此配置文件`);
    };

    return (
        <>
            {!profileS?.operations?.canBlock ?
                <button onClick={unblock} disabled={loadingUnblock} className='flex flex-row '>
                    <RiUserForbidLine className="size-6" /><span>取消屏蔽</span>  {loadingUnblock && <span className="loading loading-spinner"></span>}
                </button>
                :
                <button onClick={block} disabled={loadingBlock} className={`flex flex-row `}>
                    <RiUserForbidLine className="size-6" /><span>屏蔽用户</span>{loadingBlock && <span className="loading loading-spinner"></span>}
                </button>}
        </>
    );
}

/* 举报用户 */ //https://www.lens.xyz/docs/primitives/profile/reporting
function ReportProfileToggle({ profileS }) {
    return (
        <button /* onClick={} disabled={} */ className={`flex flex-row`}>
            <RiAlertLine className="size-6 text-red-600" /> <span className="text-red-600">举报用户</span>
        </button>
    );
}