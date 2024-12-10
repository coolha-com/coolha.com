'use client'
import UsersPicimg from "@/components/lnes/Data/u/UsersPicimg";
import { SessionType, useProfile, useSession, useSetProfileMetadata } from "@lens-protocol/react-web";
import { MetadataAttributeType, profile as createProfileMetadata } from '@lens-protocol/metadata';
import { useEffect, useState } from "react";

// 模拟上传函数，实际开发中需要将文件上传到 IPFS 或其他服务
async function uploadJson(metadata: any): Promise<string> {
  // 假设上传成功，并返回 URI
  return new Promise((resolve) => {
    setTimeout(() => resolve('ipfs://uploaded-metadata-uri'), 1000);
  });
}

async function uploadFile(file: File): Promise<string> {
  // 模拟文件上传，返回文件的URL或IPFS链接
  return new Promise((resolve) => {
    setTimeout(() => resolve(URL.createObjectURL(file)), 1000);
  });
}

export default function page() {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  // 新增的 useState hooks 用于管理可编辑的表单输入字段
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [x, setX] = useState('');

  const { execute, loading } = useSetProfileMetadata();

  const { data } = useSession({ suspense: true });
  if (data && data.type === SessionType.Anonymous) {
    return (
      <div className="">
        <div>暂未登录账户</div>
      </div>
    );
  }
  if (data && data.type === SessionType.WithProfile) {
    const ProfileWithProfile = data.profile.handle?.fullHandle ?? data.profile.id;
    const { data: profile, loading } = useProfile({
      forHandle: ProfileWithProfile
    });

    // 填充表单的初始值

    // UseEffect to initialize form values only when profile data is available
    useEffect(() => {
      if (profile?.metadata) {
        setName(profile.metadata.displayName || '');
        setBio(profile.metadata.bio || '');
        setLocation(profile.metadata.attributes?.find(a => a.key === 'location')?.value || '');
        setWebsite(profile.metadata.attributes?.find(a => a.key === 'website')?.value || '');
        setX(profile.metadata.attributes?.find(a => a.key === 'x')?.value || '');
      }
    }, [profile]); // Only run when the profile data changes

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
      }
    };

    const updateProfileMetadata = async (e: React.FormEvent) => {
      e.preventDefault();

      // 上传头像和封面图片
      const avatarURI = avatarFile ? await uploadFile(avatarFile) : profile?.metadata?.picture?.__typename === 'ImageSet' ? profile.metadata.picture.optimized?.uri : profile?.metadata?.picture?.__typename === 'NftImage' && profile.metadata.picture.image.optimized?.uri || 'ipfs://default-avatar-uri';
      const coverURI = coverFile ? await uploadFile(coverFile) : profile?.metadata?.coverPicture?.raw?.uri || profile?.metadata?.coverPicture?.optimized?.uri || profile?.metadata?.coverPicture?.transformed?.uri || 'ipfs://default-cover-uri';

      // 生成新的元数据
      const metadata = createProfileMetadata({
        name,
        bio,
        picture: avatarURI,
        coverPicture: coverURI,
        attributes: [
          { key: 'x', type: MetadataAttributeType.STRING, value: x || '' },
          { key: 'location', type: MetadataAttributeType.STRING, value: location || '' },
          { key: 'website', type: MetadataAttributeType.STRING, value: website || '' },
        ],
      });

      // 上传 Metadata 并获取 URI
      const metadataURI = await uploadJson(metadata);

      // 更新 Profile Metadata
      const result = await execute({ metadataURI });

      if (result.isFailure()) {
        window.alert(result.error.message);
      } else {
        window.alert("配置文件元数据更新成功！");
      }
    };

    return (
      <form className="min-w-svh p-1 w-full" onSubmit={updateProfileMetadata}>

        <div className="w-full ">
          <button type="submit" disabled={loading} className="btn btn-primary btn-sm">
            {loading ? '更新中...' : '更新'}
          </button>
        </div>

        <div className="mt-3 flex flex-col">
          <b>头像</b>
          <div className="avatar">
            <div className="w-[20vh] rounded">
              {profile?.metadata?.picture ? (
                <>
                  {profile.metadata.picture.__typename === 'ImageSet' && (
                    <img
                      className="rounded-full     "
                      src={profile.metadata.picture.optimized?.uri}
                      alt="picture Set"
                    />
                  )}
                  {profile.metadata.picture.__typename === 'NftImage' && (
                    <img
                      className="rounded-full     "
                      src={profile.metadata.picture.image.optimized?.uri}
                      alt="picture NFT"
                    />
                  )}
                </>
              ) : (
                <img
                  className="rounded-full     "
                  src="/rlogo.png" // 使用默认的占位符图片
                  alt="optimized on"

                />
              )}
            </div>
          </div>
          <input type="file" placeholder="Type here" onChange={(e) => handleFileChange(e, setAvatarFile)} className="file-input file-input-bordered file-input-sm max-w-xs" />
        </div>

        <div className="mt-3 flex flex-col">
          <b>背景</b>
          <UsersPicimg profile={profile} />
          <input type="file" placeholder="Type here" onChange={(e) => handleFileChange(e, setCoverFile)} className="file-input file-input-bordered file-input-sm max-w-xs mt-1" />
        </div>

        <div className="mt-3">
          <b>Lens ID</b>
          <input type="text" value={`${profile?.id}`} className="input input-bordered w-full " disabled />
        </div>

        <div className="mt-3">
          <b>昵称</b>
          <input type="text" defaultValue={name} name="name" required placeholder='你的账户昵称' className="input input-bordered w-full " onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mt-3">
          <b>位置</b>
          <input type="text" defaultValue={location} name="location" placeholder="你的位置" className="input input-bordered w-full" onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div className="mt-3">
          <b>网站</b>
          <input type="text" defaultValue={website} name="website" placeholder="https://" className="input input-bordered w-full" onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <div className="mt-3">
          <b>X</b>
          <label className="input input-bordered flex items-center gap-2">
            <p className=" text-base-content/70">https://x.com/</p>
            <input type="text" defaultValue={x} name="x" placeholder="UsersID" className="grow" onChange={(e) => setX(e.target.value)} />
          </label>
        </div>

        <div className="mt-3">
          <b>简介</b>
          <textarea defaultValue={bio} name="bio" placeholder="简介" required rows={3} className="textarea textarea-bordered w-full " onChange={(e) => setBio(e.target.value)}></textarea>
        </div>

      </form>
    )
  }
}


