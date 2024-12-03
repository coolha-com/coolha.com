'use client'

import Image from "next/image"

export default function PosImage({ src }) {
 

    return (
        <div className="pt-2 " >
                {src && (
                  <img
                    alt="user posts img"
                    className='max-w-[200px] md:max-w-[400px] h-auto  rounded-2xl object-cover border-[0.5px] border-base-content/60'
                    src={src}
                  />
                )}
     



        </div>
    )
}