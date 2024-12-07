import React from 'react';
import { Profile, useUnfollow } from '@lens-protocol/react-web';

export default function UnFollowButton({ profile }: { profile: Profile }) {
    const { execute: unfollow, error: unfollowError, loading: unfollowLoading } = useUnfollow();

    const handleunFollow = async () => {
        if (profile.operations.canUnfollow) {
            await unfollow({ profile });
        } else {
            console.error("您无法取关此个人资料");
        }
    }

    return (
        <div>
            <button
                className={`btn btn-sm btn-outline `}
                onClick={handleunFollow}
                disabled={unfollowLoading}
            >
                 {unfollowLoading ? unfollowLoading && <span className="loading loading-spinner loading-sm"></span> : '取关'}
            </button>
        </div>
    );
}
