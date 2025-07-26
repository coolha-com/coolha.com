'use client'
import Link from "next/link";
import MediaLink from "./MediaLink";
export default function Footer() {
    return (
        <div className="">


            <div className="flex justify-center bg-base-100 border-t">
                <footer className="footer  max-w-screen-xl p-6 lg:p-8  text-base-content">
                    {/*                     <aside>
                        <Link href={`/`} className="">
                            <img src="/logo/透明LOGO白色.png" alt="/logo/透明LOGO白色.png" className="max-w-32 " />
                        </Link>
                    </aside> */}

                    <nav>
                        <h6 className="footer-title">媒体</h6>
                        <div className="grid grid-flow-row grid-cols-6 gap-4 py-2">
                            <MediaLink />
                        </div>
                    </nav>
                    <nav>
                        <h6 className="footer-title">信息</h6>
                        <Link href={`/about_us`} prefetch={false} className="link link-hover " >关于我们</Link>
                        <Link href={`https://link3.to/coolha`} className=" link link-hover  " target='_blank'>联系</Link>
                        <Link href={`https://coolha-com.larksuite.com/base/Uq2HbmW8hasT3ksO7cquMgFWs2w?table=tblTSPWUJqLQjdTI&view=vewOlmHa88`} className="link link-hover " target='_blank'>反馈</Link>
                    </nav>
                    <nav>
                        <h6 className="footer-title">资源</h6>
                        <Link href={`https://docs.coolha.com`} className="link link-hover" target='_blank'>文档</Link>
                        <Link href="https://docs.coolha.com/apps/privacy" className="link link-hover" target='_blank'>隐私</Link >
                        <Link href="https://docs.coolha.com/apps/terms" className="link link-hover" target='_blank'>条款</Link >
                    </nav>

                </footer>
            </div>

            <div className="flex justify-center bg-base-100 text-base-content border-base-300 ">
                <div className=" footer max-w-screen-xl px-6 lg:px-8 py-4">
                    <div className="place-self-start md:place-self-center text-base-content/70 flex flex-col md:flex-row gap-2">
                        <p className="flex flex-col gap-1 md:flex-row"><span> © 2025 coolha.com all rights reserved.</span></p>
                    </div>
                </div>
            </div >


        </div >
    )
}