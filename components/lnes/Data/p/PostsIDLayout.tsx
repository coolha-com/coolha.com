// @ts-nocheck
'use client'
import { useInfiniteScroll } from "@/components/lnes/Data/u/hook/useInfiniteScroll";
import Avatarimg from "@/components/lnes/PostsCard/Avatarimg";
import AvatarName from "@/components/lnes/PostsCard/AvatarName";
import InteractCard from "@/components/lnes/PostsCard/InteractCard";
import Meide from "@/components/lnes/PostsCard/Meide";
import Menu from "@/components/lnes/PostsCard/Menu/Menu";
import { UsersPosAtext } from "@/components/lnes/PostsCard/PosAtext";
import { usePublication, usePublications, publicationId } from "@lens-protocol/react-web";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine, RiMore2Fill } from "react-icons/ri";

//https://www.lens.xyz/docs/primitives/publications/common-scenarios
export default function PostsIDLayout({ children, params }) {
  const router = useRouter();

  const { data: pub } = usePublication({
    forId: params.postsid,
    suspense: true,
  });
  if (!pub) return <div>未找到帖子</div>;
  return (
    <div className="flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-dvw ">
      <div className='  lg:min-w-3xl mx-auto max-w-3xl '>

        {/* 导航栏 */}
        <div className="navbar py-0 bg-base-100">
          <div className=" navbar-start">
            <button className="btn btn-square btn-ghost" onClick={() => router.back()} >
              <RiArrowLeftLine size={24} />
            </button>
          </div>
          <div className=" navbar-center">帖子详情</div>
          <div className=" navbar-end">
            {/*           <button className="btn btn-square btn-ghost">
            <RiMore2Fill size={24} />
          </button> */}
          </div>
        </div>


        {/* 主帖 */}
        <div key={pub.id} className="w-dvw md:max-w-3xl md:p-4 pb-2 pt-0 bg-base-100">

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
            <div className='bg-base-100'>

              <UsersPosAtext content={pub.metadata.content} />
              <Meide pub={pub.metadata?.asset} />
            </div>
          </>)}

          {/* 如果是引用类型的帖子，显示引用的内容 */}
          {
            pub.__typename === "Quote" && (
              <div className="p-6 pl-0">
                <div className="p-4 py-2 border rounded-2xl ">

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

                  <Link href={`/p/${pub.quoteOn.id}`} passHref>
                    <UsersPosAtext content={pub.quoteOn?.metadata?.content} />
                    <Meide pub={pub.quoteOn.metadata.asset} />
                  </Link>
                </div>
              </div>
            )
          }

          <InteractCard dataname={pub} />
        </div>






        {children}
      </div>
    </div>
  )
}