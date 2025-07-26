'use client'
import PostsIDLayout from "@/components/lnes/Data/p/PostsIDLayout";


export default function layout({ children, params }) {

  return (
    <>
    <PostsIDLayout  params={params}>
      {children}
    </PostsIDLayout>
    </>
  )
}