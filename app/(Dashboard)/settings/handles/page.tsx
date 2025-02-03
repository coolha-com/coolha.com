'use client'
import { useLinkHandle, useOwnedHandles, useUnlinkHandle, SessionType, useSession, } from '@lens-protocol/react-web';



export default function MyHandles() {
  const { data: session } = useSession({ suspense: true });
  if (session && session.type === SessionType.Anonymous) {
    return (
      <div className="">
        <div>暂未连接Lens</div>
      </div>
    );
  }
  if (session && session.type === SessionType.WithProfile) {
    const { data: OwnedHandles, loading, error, } = useOwnedHandles({
      for: session.address,
    });


    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    if (OwnedHandles.length === 0) return <div>未找到手柄</div>;

    return (
      <div>

        <div className='py-2 border rounded-2xl p-3 mb-3'>
          <b>从您的个人资料中取消链接</b>
          <p>取消关联您的用户名会将其从您的个人资料中删除，确保它不再公开显示或与您的个人资料相关联。</p>
          {OwnedHandles.map((handle) => (
            <div className='flex flex-row gap-1'>
              <p className='flex justify-center items-center min-h-full btn btn-active  btn-sm'> {handle.fullHandle} </p>
              <UnlinkHandle key={handle.id} handle={handle} />
            </div>
          ))}
        </div>

        <div className='py-2 border rounded-2xl p-3 mb-3'>
          <b>链接手柄</b>
          <p>将您的用户名链接到您的个人资料会公开展示它，让其他人可以根据您的独特在线身份轻松识别并与您联系。</p>
          {OwnedHandles.map((handle) => (
            <div className='flex flex-row gap-1'>
              <p className='flex justify-center items-center min-h-full btn btn-active  btn-sm'> {handle.fullHandle} </p>
              <LinkHandles key={handle.id} handle={handle} />
            </div>
          ))}
        </div>


      </div>
    );
  }
}

function LinkHandles({ handle }) {
  const { execute: link, loading: linking } = useLinkHandle();

  const linkHandle = async () => {
    const result = await link({ handle });
    // 检测是否发生了早期错误
    if (result.isFailure()) {
      window.alert(result.error.message);
      return;
    }

    // 可选：等待交易被挖掘和索引
    const completion = await result.value.waitForCompletion();

    // 检测是否发生了 minining/indexing 错误
    if (completion.isFailure()) {
      window.alert(completion.error.message);
      return;
    }

    window.alert(`Handle ${handle.fullHandle} linked!`);
  };
  return (
    <button className='btn btn-sm btn-primary' onClick={linkHandle} disabled={linking}>
      Link
    </button>
  )
}
function UnlinkHandle({ handle }) {
  const { execute: unlink, loading: unlinking } = useUnlinkHandle();

  const unlinkHandle = async () => {
    const result = await unlink({ handle });

    // 检测是否发生了早期错误
    if (result.isFailure()) {
      window.alert(result.error.message);
      return;
    }

    // 可选：等待交易被挖掘和索引
    const completion = await result.value.waitForCompletion();

    // 检测是否发生了 minining/indexing 错误
    if (completion.isFailure()) {
      window.alert(completion.error.message);
      return;
    }

    window.alert(`Handle ${handle.fullHandle} unlinked!`);
  };

  return (
    <>
      <button className='btn btn-sm btn-primary' onClick={unlinkHandle} disabled={unlinking}>
        Unlink
      </button>
    </>
  );
}