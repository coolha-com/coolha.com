'use client'

export default function page() {
    return (
        <div className="max-h-svh bg-base-200/80">


            <div className="chat chat-start ">
                <div className="chat-image avatar ml-2">
                    <div className="w-10 rounded-full bg-white">
                        <img
                            alt="lens"
                            src="/lens/Icon-T-Black_@2x.png" />
                    </div>
                </div>
                <div className="chat-header">
                    {/* <span className=" text-base-content/70">Lens</span> */}
                    <time className="text-xs opacity-50 ml-2">12:45</time>
                </div>
                <div className="chat-bubble chat-bubble-accent text-base-content">You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!</div>
                {/* <div className="chat-footer opacity-50">Delivered</div> */}
            </div>


            <div className="chat chat-end">
                <div className="chat-image avatar mr-2">
                    <div className="w-10 rounded-full">
                        <img
                            alt="coolha.to"
                            src="/coolha.top/logo.png" />
                    </div>
                </div>
                <div className="chat-header">
                    {/* <span className=" text-base-content/70">Coolha</span> */}
                    <time className="text-xs opacity-50 ml-2">12:46</time>
                </div>
                <div className="chat-bubble chat-bubble-accent text-base-content">I Love you!</div>
                {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
            </div>


        </div>
    )
}