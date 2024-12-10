'use client'

import PosImage from "./PosImage"
import PosMusic from "./PosMusic"
import PosVideo from "./PosVideo"

export default function Meide({ pub }) {
    return (
        <div className="pt-2" >
            {pub ? (
                < >
                    {pub.image && !pub.audio && <img
                        className={`max-w-[200px] md:max-w-[400px] h-auto    sm:h-auto mb-3   rounded-2xl object-cover border-base-content/60 border-[0.5px]`}
                        alt='pub.image && !pub.audio img'
                        src={pub?.image?.optimized?.uri || pub?.image?.optimized?.raw?.uri || ''} onClick={(e) => { e.stopPropagation(); }} />}

                    {pub.audio && (
                        <div onClick={(e) => { e.stopPropagation(); }}>
                            <img
                                className={`max-w-[200px] md:max-w-[400px] h-auto    sm:h-auto mb-3  rounded-2xl object-cover border-base-content/60 border-[0.5px]`}
                                alt='audio img'
                                src={
                                    pub ?
                                        pub.cover?.optimized?.uri ?
                                            pub.cover?.optimized?.uri :
                                            pub.cover?.optimized?.raw?.uri : ''}
                                onClick={(e) => { e.stopPropagation(); }}
                            />
                            <PosMusic
                                type={pub.asset?.audio?.optimized?.mimeType}
                                src={pub.audio?.optimized?.uri}
                            />

                        </div>
                    )}

                    {pub.video && <PosVideo src={pub.video?.optimized?.uri} />}
                </>
            ) : (``)}
        </div>
    )
}
