import Link from "next/link";
import { FaCircleChevronLeft, FaGithub, FaSquareXTwitter, FaTelegram, FaTiktok } from 'react-icons/fa6';
import Image from "next/image"
import coolhatop应用流程 from '@/public/coolha.com/coolha.com应用流程.png'
import { RiMailFill } from "react-icons/ri";
export default function AboutPage() {
  return (
    <div className="min-h-screen text-white bg-slate-950">
      {/* Header */}
      <header className="bg-[#C0E218] shadow-md">
        <div className=" mx-auto px-4 py-4 flex justify-between items-center">
          <img src="/favicon.ico" alt="favicon" className="w-16 rounded-full font-bold " />
          <nav>
            <ul className="flex space-x-4">

              <li>
                <Link href="https://link3.to/coolha" className="text-black hover:text-gray-600" target='_blank'>
                  <FaCircleChevronLeft className="w-8 h-8" />
                </Link>
              </li>

              <li>
                <Link href="/u/coolha" className="text-black hover:text-gray-600" >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 duration-300 shrink-0" ><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2286 8.68583C17.1304 7.92987 18.1364 7.64225 19.1013 7.71497C20.1305 7.79253 21.0829 8.27728 21.7943 8.98137C22.5055 9.68551 22.9942 10.6273 23.0725 11.6438C23.1514 12.6695 22.8096 13.7438 21.9085 14.6866C21.8261 14.7734 21.7419 14.8591 21.6558 14.9437C17.5684 18.9893 12.1391 19 12.0835 19H12.0833C12.0555 19 6.60887 18.9998 2.51095 14.9433L2.51006 14.9423C2.42546 14.8581 2.34215 14.7732 2.26008 14.688L2.25943 14.6872C1.35786 13.7452 1.01574 12.6712 1.09442 11.6455C1.17238 10.6292 1.66073 9.68726 2.37184 8.98288C3.08289 8.27853 4.03523 7.79339 5.06463 7.71551C6.02943 7.6425 7.03571 7.92977 7.93793 8.68536C8.03495 7.51996 8.54038 6.61294 9.27407 5.98939C10.0566 5.32433 11.0763 5 12.0833 5C13.0903 5 14.11 5.32433 14.8924 5.98939C15.6262 6.61303 16.1317 7.52021 16.2286 8.68583ZM12.2704 18.5899L12.2702 18.5847H12.2705L12.2704 18.5899ZM11.8962 18.5899L11.896 18.5847H11.8964L11.8962 18.5899ZM15.1541 12.9723C15.0422 12.9723 15.0035 13.1321 15.0748 13.2168C15.201 13.3668 15.277 13.5598 15.277 13.7703C15.277 14.248 14.8859 14.6353 14.4033 14.6353C13.9207 14.6353 13.5294 14.248 13.5294 13.7703C13.5294 13.7448 13.4958 13.732 13.4805 13.7528C13.3427 13.9401 13.2497 14.1505 13.2114 14.3714C13.1899 14.4957 13.0878 14.5989 12.9595 14.5989H12.8886C12.7211 14.5989 12.5829 14.4644 12.6077 14.3015C12.7771 13.1854 13.8883 12.3759 15.1541 12.3759C16.4198 12.3759 17.5309 13.1854 17.7004 14.3015C17.725 14.4644 17.5869 14.5989 17.4195 14.5989C17.2519 14.5989 17.1193 14.4637 17.0828 14.3029C16.9173 13.5714 16.1493 12.9723 15.1541 12.9723ZM7.39443 13.7703C7.39443 13.7366 7.35029 13.7185 7.32951 13.7453C7.18219 13.9356 7.08181 14.1511 7.03931 14.3783C7.01423 14.5124 6.90397 14.624 6.76521 14.624H6.71321C6.54572 14.624 6.40756 14.4895 6.43225 14.3267C6.60162 13.21 7.71295 12.4011 8.97862 12.4011C10.2443 12.4011 11.3556 13.21 11.525 14.3267C11.5497 14.4895 11.4115 14.624 11.244 14.624C11.0765 14.624 10.9439 14.4889 10.9075 14.3281C10.742 13.5961 9.97402 12.9974 8.97862 12.9974C8.88814 12.9974 8.85503 13.1232 8.9156 13.1893C9.05632 13.3428 9.14207 13.5467 9.14207 13.7703C9.14207 14.248 8.75085 14.6353 8.26825 14.6353C7.78565 14.6353 7.39443 14.248 7.39443 13.7703ZM13.0554 15.8564C13.1737 15.7399 13.3567 15.6832 13.5036 15.7621C13.6506 15.8411 13.7064 16.0244 13.6005 16.152C13.2555 16.5673 12.697 16.8306 12.0809 16.8306C11.4652 16.8306 10.9055 16.5702 10.5601 16.1516C10.4545 16.0238 10.511 15.8405 10.6582 15.7621C10.8055 15.6836 10.9881 15.7411 11.1063 15.8576C11.334 16.0824 11.6796 16.2344 12.0809 16.2344C12.4813 16.2344 12.8272 16.0808 13.0554 15.8564Z"></path></svg>
                </Link>
              </li>

              <li>
                <Link href="https://x.com/coolha_com" className="text-black hover:text-gray-600" target='_blank'>
                  <FaSquareXTwitter className="w-8 h-8" />
                </Link>
              </li>

              <li>
                <Link href="https://github.com/coolha-com" className="text-black hover:text-gray-600" target='_blank'>
                  <FaGithub className="w-8 h-8" />
                </Link>
              </li>

              <li>
                <Link href="mailto:cs@coolha.com" className="text-black hover:text-gray-600" target='_blank'>
                  <RiMailFill className="w-8 h-8" />
                </Link>
              </li>

{/*               <Link href="https://mirror.xyz/0xf3d7de68985ab5e92841ce7bc335cfe0c04cab4a" className="text-black hover:text-gray-600" target='_blank' >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="duration-300 shrink-0" ><path d="M5.5 10.5C5.5 6.91015 8.41015 4 12 4C15.5899 4 18.5 6.91015 18.5 10.5V20H5.5V10.5Z"></path></svg>
              </Link > */}

            </ul>
          </nav>
        </div>
      </header>



      {/* Hero Section */}
      <section className="bg-[#C0E218] py-20">
        <div className=" mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold  mb-4 text-black">欢迎来到 coolha.com</h2>
          <p className="text-xl text-gray-800 mb-4">Coolha 是一款基于 Lens Protocol 构建的去中心化社交应用，连接创作者和用户</p>
          <p className="text-xl text-gray-800 mb-8">数据权回归用户，在 Web3 时代赋能去中心化连接</p>
          <Link href="/home" className="inline-flex items-center bg-slate-950 text-white  text-2xl px-8 py-4 rounded-full hover:bg-gray-700 transition duration-300">
            开始使用 →
          </Link>
        </div>
      </section>

      {/*       <div className=" justify-center  p-12">
        <div className="mockup-browser bg-base-300 border h-auto">
          <div className="mockup-browser-toolbar">
            <div className="input">https://coolha.com</div>
          </div>
          <div className="bg-[#111111] flex w-full h-auto"><img src="/web.png" alt="web.png" /></div>
          
        </div>

        <div className="mockup-phone ">
          <div className="camera"></div>
          <div className="display">
            <div className="artboard artboard-demo phone-1 h-auto"><img src="/app.png" alt="app.png" /></div>

          </div>
        </div>
      </div> */}

      {/* Features Section */}
      <section className="py-20">
        <div className=" mx-auto px-4">
          <h3 className="text-3xl font-bold text-center  mb-12">为什么选择 coolha.com？</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">


            <div className="bg-[#111111] p-6 rounded-lg border hover:border-primary ">
              <h4 className="text-xl font-semibold mb-2">去中心化身份</h4>
              <p className="text-white">使用区块链技术拥有和控制您的数字身份</p>
            </div>
            <div className="bg-[#111111] p-6 rounded-lg border hover:border-primary ">
              <h4 className="text-xl font-semibold  mb-2">安全消息传递</h4>
              <p className="text-white">使用 XMTP 构建安全、私密和可移植的消息传递</p>
            </div>
            <div className="bg-[#111111] p-6 rounded-lg border hover:border-primary ">
              <h4 className="text-xl font-semibold  mb-2">去中心化治理</h4>
              <p className=" text-white">用户参与共同治理,不要因为中心组织过度控制而丧失活力</p>
            </div>
            {/* <div className="bg-[#111111] m-3 p-6 rounded-lg border hover:border-primary ">
              <h4 className="text-xl font-semibold  mb-2">应用架构</h4>
              <Image
                src={coolhatop应用流程}
                alt="coolha.com应用流程.png"
                sizes="100%"
                style={{
                  width: '100%',
                  height: 'auto',
                }} />
            </div> */}


          </div>
        </div>
      </section>




      {/* Team Section (Placeholder) */}
      <section className="py-20 ">
        <div className=" mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold  mb-8">认识开发团队</h3>
          <Link href={`https://about.coolha.com`} target='_blank' className="inline-flex items-center  text-2xl px-8 py-4 rounded-full hover:border-primary hover:text-primary transition duration-300 border-2 gap-2">
            <img src="icon.png" alt="icon.png" className="w-16 mask mask-circle" />
            酷哈工作室 ↗
          </Link>
        </div>
      </section>

      <footer className="footer bg-zinc-700 text-slate-200 items-center p-4">
        <aside className="grid-flow-col items-center ">
          <p>Copyright © {new Date().getFullYear()} coolha.com All rights reserved.</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <Link href={`/fqa`} className="hover:link hover:text-primary"> 常见问题</Link>
          <Link href={`/privacy`} className="hover:link hover:text-primary"> 隐私政策</Link>
          <Link href={`/terms`} className="hover:link hover:text-primary"> 条款规则</Link>
        </nav>
      </footer>

    </div>
  )
}