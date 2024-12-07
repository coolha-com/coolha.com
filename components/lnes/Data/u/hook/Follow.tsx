import React from 'react';
import { Profile, useFollow } from '@lens-protocol/react-web';

export default function FollowButton({ profile }: { profile: Profile }) {
    const { execute: follow, error: followError, loading: followLoading } = useFollow();

    const handleFollow = async () => {
        if (profile.operations.canFollow) {
            await follow({ profile });
        } else {
            console.error("您无法关注此个人资料");
        }
    }

    return (
        <div>
            <button
                className={`btn btn-sm btn-primary text-black`}
                onClick={handleFollow}
                disabled={followLoading}
            >
                {followLoading ? followLoading && <span className="loading loading-spinner loading-sm"></span> : '关注'}
            </button>
        </div>
    );
}
