'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  useExplorePublications,
  ExplorePublicationType,
  LimitType,
} from '@lens-protocol/react-web'

import Avatarimg from '@/components/lnes/PostsCard/Avatarimg';
import AvatarName from '@/components/lnes/PostsCard/AvatarName';
import { PosAtext } from '@/components/lnes/PostsCard/PosAtext';
import InteractCard from '@/components/lnes/PostsCard/InteractCard';

import { useInfiniteScroll } from '@/components/lnes/DataUsers/hook/useInfiniteScroll';
import Meide from '@/components/lnes/PostsCard/Meide';
import Menu from '@/components/lnes/PostsCard/Menu/Menu';
import { useOrderBy } from './_contexts/OrderByContext';
import LoadingSpinner from '@/gui/LoadingSpinner';






export default function Page() {
  const pathname = usePathname();

  const { state, dispatch } = useOrderBy(); // 使用useOrderBy获取全局状态和dispatch函数
  const { orderBy } = state;


  let { data: publications, loading: loadingPubs, hasMore, observeRef } = useInfiniteScroll(useExplorePublications({
    limit: LimitType.Ten,
    orderBy,
    where: {
      publicationTypes: [ExplorePublicationType.Post, ExplorePublicationType.Quote],
    }
  })) as any





  publications = publications?.filter(p => {
    if (p.metadata && p.metadata.asset) {
      if (p.metadata.asset.image) return true;
      if (p.metadata.asset.video || p.metadata.asset.audio) return true; // 添加音频和视频的判断
      return false;
    }
    return true;
  });

  return (
    <>

      {/* 算法 */}



      <div className="flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-dvw">
        {loadingPubs && <LoadingSpinner /> }

        {publications?.map((pub: any) => (
          <div className=" bg-base-100  w-dvw md:max-w-3xl p-4 py-2 mt-2" key={pub.id}>
            {/* 帖子主内容 */}
            <div className=" flex ">
              <div className="flex " onClick={(e) => e.stopPropagation()}>
                <Avatarimg
                  href={pub.by && pub.by.handle ? pub.by.handle.localName : pub.by.id}
                  src={pub.by}
                />
                <AvatarName
                  localName={pub.by && pub.by.handle ? pub.by.handle.localName : pub.by.id}
                  displayName={pub.by && pub.by.metadata ? pub.by.metadata.displayName : ''}
                  namespace={pub.by && pub.by.handle ? pub.by.handle.namespace : ''}
                  id={pub}
                  createdAt={pub.createdAt}
                />
              </div>

              <div className="flex-1 flex" ><Link href={`/posts/${pub.id}`} className="flex-1"></Link></div>
              <Menu pub={pub} />

            </div>

            <div >
              <Link href={`/posts/${pub.id}`} >
                <PosAtext content={pub.metadata.content} />
                <Meide pub={pub.metadata.asset} />
              </Link>

              {/* 如果是引用类型的帖子，显示引用的内容 */}
              {pub.__typename === "Quote" && (
                <div className="pl-0 pt-2">
                  <div className="p-4 py-2 border rounded-2xl ">

                    <div className="flex" >
                      <Avatarimg src={pub.quoteOn.by} href={pub.by.handle.localName} />
                      <AvatarName
                        localName={pub.quoteOn.by.handle.localName}
                        displayName={pub.quoteOn.by.metadata?.displayName}
                        namespace={pub.quoteOn.by.handle.namespace}
                        id={pub.quoteOn}
                        createdAt={pub.quoteOn.createdAt}
                      />
                      <div className="flex-1 flex" ><Link href={`/posts/${pub.quoteOn.id}`} passHref className="flex-1"></Link></div>
                    </div>

                    <Link href={`/posts/${pub.quoteOn.id}`} passHref>
                      <PosAtext content={pub.quoteOn.metadata.content} />
                      <Meide pub={pub.quoteOn.metadata.asset} />
                    </Link>
                  </div>
                </div>
              )}

            </div>


            <InteractCard dataname={pub} />

          </div>
        ))}
        {hasMore && (
          <div className="flex justify-center my-4">
            <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
          </div>
        )}

      </div>
    </>
  )
}


