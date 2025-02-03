import { Profile, useBlockProfiles, useUnblockProfiles } from '@lens-protocol/react-web';

export function UnblockButton({ profile }: { profile: Profile }) {
  const { execute, loading } = useUnblockProfiles();

  const unblock = async () => {
    if (profile?.operations?.isBlockedByMe?.isFinalisedOnchain === false) {
      window.alert(
        '在链上完成待处理操作之前，您无法取消屏蔽此配置文件',
      );
      return;
    }
    const result = await execute({ profiles: [profile] });

    if (result.isFailure()) {
      window.alert(result.error.message);
      return;
    }

    const completion = await result.value.waitForCompletion();

    if (completion.isFailure()) {
      window.alert(completion.error.message);
      return;
    }

    window.alert(`成功取消屏蔽${profile?.handle}`);
  };

  if (!profile?.operations?.isBlockedByMe?.value) {
    return <p className=' btn btn-outline btn-sm btn-disabled'>未被屏蔽</p>;
  }

  if (!profile?.operations?.canUnblock) {
    return <p className=' btn btn-outline btn-sm btn-disabled'>无法取消屏蔽</p>;
  }

  return (
    <button onClick={unblock} disabled={loading} className='btn  btn-outline btn-sm'>
      {loading && <span className="loading loading-spinner"></span>} 取消屏蔽
    </button>
  );
}