'use client'
import { formatNumberWithUnit } from "@/utils/formatNumber";
import { AnyPublication, PublicationReactionType, TriStateValue, useCreateMirror, useHidePublication, useReactionToggle } from "@lens-protocol/react-web";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiChat3Line, RiCopperCoinLine, RiHeart3Fill, RiHeart3Line, RiLoopLeftFill, RiShoppingBagLine } from "react-icons/ri";

const ButtonCSS = 'px-2 py-1.5 text-white'

/* 点赞 */
export function Upvote({ dataname }) {
  const { execute: upvotetoggle, loading, error } = useReactionToggle();

  const Upvotetoggle = async () => {
    await upvotetoggle({
      reaction: PublicationReactionType.Upvote,
      publication: dataname,
    });
  };
  if (error) {
    return <p>Error reacting to publication: {error}</p>;
  }


  return (
    <div onClick={(e) => { e.stopPropagation(); }}>
      <button onClick={Upvotetoggle} disabled={loading} className={` ${ButtonCSS}   hover:text-error `}  >

        {dataname.operations.hasUpvoted ? (
          <div className={`${dataname.operations.hasUpvoted && 'text-red-500'} p-2 bg-[#ffffff2e] rounded-full`}><RiHeart3Fill className="size-8" /></div> // 红色填充图标表示已点赞
        ) : (
          <div className="  p-2 bg-[#ffffff2e] rounded-full"><RiHeart3Line className="size-8" /></div> // 空心图标表示未点赞
        )}

        <span className=" text-center text-sm hidden xs:block">{formatNumberWithUnit(dataname.stats.upvotes)}</span>

      </button>
    </div>
  )
}

/* 评论 */
export function Comments({ dataname }) {
  const router = useRouter();
  return (
    <div className={`${ButtonCSS} text-start hover:text-white/80`}  onClick={() => router.push(`/p/${dataname.id}`)} >
      <div className="  p-2 bg-[#ffffff2e] rounded-full"><RiChat3Line className="size-8 " /></div>
      <span className="   text-center text-sm hidden xs:block">{formatNumberWithUnit(dataname.stats?.comments)}</span>
    </div>
  )
}

/* 转发 */
export function Mirrors({ dataname }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false); // 控制弹窗的显示
  const { execute: createMirror, loading: creatingMirror } = useCreateMirror();
  const { execute: hideMirror, loading: hidingMirror } = useHidePublication();
  const [isMirrored, setIsMirrored] = useState(dataname.operations.hasMirrored); // 当前转发状态


  // 如果转发，执行取消转发
  const hideMirrorToggle = async () => {
    const result = await hideMirror({ publication: dataname });
    if (result.isFailure()) {
      console.log('取消转发失败:');
      return;
    }
    console.log('取消转发成功');
    setIsMirrored(false);
  }

  // 如果未转发，执行转发
  const createMirrorToggle = async () => {
    const result = await createMirror({
      mirrorOn: dataname.id,
    });
    if (result.isFailure()) {
      console.log('转发失败:', result.error.message);
      return;
    }
    console.log('转发成功');
    setIsMirrored(true);

    // 显示成功弹窗
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  }

  return (
    <div onClick={(e) => { e.stopPropagation(); }}>

      {isMirrored ?
        <button onClick={hideMirrorToggle} disabled={hidingMirror} className={`${ButtonCSS} hover:text-green-500 text-green-500`}>
          <div className=" p-2 bg-[#ffffff2e] rounded-full"><RiLoopLeftFill className="size-8" /></div>
          <span className=" text-center text-sm hidden xs:block">
            {formatNumberWithUnit(dataname.stats.mirrors + dataname.stats.quotes)}
          </span>
        </button>
        :
        <button onClick={createMirrorToggle} disabled={creatingMirror} className={`${ButtonCSS}  hover:text-green-500`}>
          <div className="  p-2 bg-[#ffffff2e] rounded-full"><RiLoopLeftFill className="size-8" /></div>
          <span className=" text-center text-sm hidden xs:block">
            {formatNumberWithUnit(dataname.stats.mirrors + dataname.stats.quotes)}
          </span>
        </button>
      }


      {/* 成功提示弹窗 */}
      {showSuccessModal && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-100" role="alert">
          <span className="block sm:inline">{isMirrored ? '转发成功！' : '转发已取消！'}</span>
        </div>
      )}
    </div>
  );
}

/* 收集 */
export function Collects({ dataname }) {
  const canCollectValue = dataname?.operations?.canCollect;
  const isCollectibleNo = canCollectValue === 'NO';
  const isCollectibleUnknown = canCollectValue === 'UNKNOWN';
  const isCollectibleYes = canCollectValue === 'YES';

  // 根据 canCollect 的状态，决定按钮的样式和功能
  return (
    <div onClick={(e) => { e.stopPropagation(); }}>

      <button className={`${ButtonCSS} btn-disabled text-zinc-400`}/*  onClick={() => handleCollect(dataname)} */>
      <div className="  p-2 bg-[#ffffff2e] rounded-full"><RiShoppingBagLine className="size-8" /></div>
        <span className=" text-center text-sm hidden xs:block">{formatNumberWithUnit(dataname.stats?.collects)}</span>
      </button>

      {/*       {isCollectibleNo && (
        <button className={`${ButtonCSS} btn-disabled text-zinc-400`} disabled>
          <RiShoppingBagLine className="size-8" />
          <p className="text-center text-sm hidden xs:block">{formatNumberWithUnit(dataname.stats?.collects)}</p>
          <p>✕</p>
        </button>
      )}

      {isCollectibleUnknown && (
        <button className={`${ButtonCSS} btn-disabled text-zinc-400`} disabled>
          <RiShoppingBagLine className="size-8" />
          <p className="text-center text-sm hidden xs:block">{formatNumberWithUnit(dataname.stats?.collects)}</p>
          <p>?</p>
        </button>
      )}

      {isCollectibleYes && (
        <button className={`${ButtonCSS} hover:text--green-500`}>
          <RiShoppingBagLine className="size-8" />
          <p className="text-center text-sm hidden xs:block">{formatNumberWithUnit(dataname.stats?.collects)}</p>
          <p>✓</p>
        </button>
      )} */}
    </div>
  );
}