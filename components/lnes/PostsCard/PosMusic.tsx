'use client'

export default function PosMusic({type,src}) {
    return (
        <div className="pt-2 " >
            <audio controls className={`w-full  `}>
                <source
                    type={type}
                    src={src}
                />
            </audio>

        </div>
    )
}