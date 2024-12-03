'use client'
import { profileId, useLogin, useProfilesManaged } from "@lens-protocol/react-web";



export default function LoginForm({ wallet, onSuccess }: { wallet: string; onSuccess?: () => void }) {
  const { execute: login, loading: isLoginPending } = useLogin();
  const { data: profiles, error, loading } = useProfilesManaged({ for: wallet, includeOwned: true });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const id = profileId(formData.get("id") as string);

    const result = await login({
      address: wallet,
      profileId: id,
    });

    if (result.isSuccess()) {
      console.info(`欢迎 ${String(result.value?.handle?.fullHandle ?? result.value?.id)}`);
      window.location.reload();
      return onSuccess?.();
    }

    window.alert(result.error.message);
  };

  if (loading) {
    return <p className="mb-4 text-base text-gray-500">正在加载Lens配置文件...</p>
  }

  if (error) {
    return <>{error?.message ?? "Unknown error"}</>;
  }

  if (profiles.length === 0) {
    return <div className="mb-4 text-base text-gray-500">
      <p>在此钱包中未找到Lens配置文件!</p>
    </div>;
  }

  return (
    <form onSubmit={onSubmit} className="">

      <fieldset className="flex flex-col md:flex-row  place-items-center justify-between">


        <div className="my-4 space-y-2">
          {profiles.map((profile, idx) => (
            <label
              key={profile.id}
              className=" btn dark:hover:bg-[var(--button-bg)] "
            >
              <input
                disabled={isLoginPending}
                type="radio"
                defaultChecked={idx === 0}
                name="id"
                value={profile.id}
                className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-green-500 checked:ring-green-500"
              />
              <div className="w-8 rounded-full ">
                {profile?.metadata?.picture?.__typename === 'ImageSet' && (
                  <img
                    src={profile?.metadata?.picture?.optimized?.uri}
                    className="rounded-full"
                    alt="picture Set"
                  />
                )}
                {profile?.metadata?.picture?.__typename === 'NftImage' && (
                  <img
                    src={profile?.metadata?.picture?.image?.optimized?.uri}
                    className="rounded-full"
                    alt="picture NFT"
                  />
                )}
              </div>
              <span className="  text-sm font-semibold">
                {profile.handle?.localName ?  `@${profile.handle?.localName}` : profile.id}
              </span>
            </label>
          ))}
        </div>

        <div className="">
          <button className='btn btn-primary' disabled={isLoginPending} type="submit"  >
            {isLoginPending ? "钱包正在签名..." : "签名登录 Lens"}
          </button>
        </div>

      </fieldset>
    </form>
  );
}
