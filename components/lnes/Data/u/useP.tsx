'use client'
import { useProfile } from '@lens-protocol/react-web'

export function useP({users}) {
    const namespace = users.split('.')[1];
    users = users.split('.')[0];
    const { data: profile, loading } = useProfile({
        forHandle: `${namespace}/${users}`
    });
    return { profile, loading };
}
