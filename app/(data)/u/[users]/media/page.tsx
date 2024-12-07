'use client'

import PUBmedia from "@/components/lnes/Data/u/list/PUBmedia"
import { useProfile } from "@lens-protocol/react-web";

export default function page({ params: { users }, }) {
  let { data: profile, loading } = useProfile({
    forHandle: `lens/${users}`
  });
  return (
    <div className="lg:min-w-3xl mx-auto ">
      <PUBmedia profile={profile} />
    </div>
  )
}