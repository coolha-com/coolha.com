'use client'

import PUBcomments from "@/components/lnes/Data/u/list/PUBcomments";
import { useProfile } from "@lens-protocol/react-web";

export default function page({ params: { users }, }) {
  let { data: profile, loading } = useProfile({
    forHandle: `lens/${users}`
  });
  return (
    <div className="lg:min-w-3xl mx-auto">
      <PUBcomments profile={profile} />
    </div>
  )
}