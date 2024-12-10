'use client';

import Image from "next/image";

export default function UsersPicimg({ profile }) {
    // 从profile中提取封面图片
    const coverPicture = profile?.metadata?.coverPicture;

    // 获取图片的 uri
    let coverImageUri = coverPicture?.raw?.uri
        || coverPicture?.optimized?.uri
        || coverPicture?.transformed?.uri;

    if (coverImageUri && coverImageUri.startsWith('ipfs://')) {
        coverImageUri = coverImageUri.replace('ipfs://', 'ipfs/');
    }

    return (
        <>
            <div className='h-36  bg-base-100'>
                {profile?.metadata?.coverPicture?.__typename === "ImageSet" ?
                    (
                        <div className='bg-primary text-black'>
                            <img
                                src={coverImageUri ? `https://ipfs.io/${coverImageUri}` : ''}
                                alt={coverImageUri}
                                className='h-36 w-full object-cover'
                            />
                        </div>
                    ) : (
                        <div className='bg-primary text-base-content'>
                            <div className='h-36 w-full object-cover bg-primary text-center' >默认背景</div>
                        </div>
                    )}
            </div>
        </>
    );
}