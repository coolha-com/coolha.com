'use client'


import Link from 'next/link';
import { RiBarChart2Line, RiPuzzleLine, RiVerifiedBadgeLine, RiVerifiedBadgeFill, RiMedalLine, RiUserVoiceLine, RiBookmarkLine, RiServiceLine, RiWallet3Line, RiGiftLine, RiBuilding2Line, RiShoppingCartLine, RiShoppingBag4Line, RiAdvertisementLine, RiLightbulbFlashLine, RiAiGenerate } from "react-icons/ri";
import { PiBrain } from 'react-icons/pi'

export default function page() {



   // 如果已登录并获取到 Profile 数据
   return (
      <div className="mx-auto max-w-3xl ">
{/*          <div className='rounded-3xl px-2 md:px-4'>
            <div className='rounded-3xl bg-base-100 mt-4 py-2 px-1'>
              
            </div>
         </div> */}
         <Card />
      </div>
   );
}


function Card() {
   const assetData = [
      { label: '资产', href: '/wallet', icon: RiWallet3Line, },
      { label: '订单', href: '/order', icon: RiShoppingCartLine, },
      { label: '会员', href: '/vip', icon: RiVerifiedBadgeLine, },
      { label: '书签', href: '/bookmarks', icon: RiBookmarkLine, },
   ];

   const BusData = [
      { label: '商业版', href: 'https://business.coolha.com', icon: RiBuilding2Line, },
      { label: '商店', href: 'https://business.coolha.com', icon: RiShoppingBag4Line, },
      { label: '推广', href: 'https://business.coolha.com', icon: RiAdvertisementLine, },
      { label: 'AI Agent', href: 'https://business.coolha.com', icon: RiAiGenerate, },
   ];

   const userData = [
      { label: '创作中心', href: '/creator', icon: RiLightbulbFlashLine, },
      { label: '数据分析', href: '/analytics', icon: RiBarChart2Line, },
      { label: '成就等级', href: '/grade', icon: RiMedalLine, },
      { label: '测试奖励', href: '/mintNFT', icon: RiGiftLine, },
      { label: '邀请用户', href: '/invite', icon: RiUserVoiceLine, },
   ];

   return (
      <>

         <div className='bg-base-100 m-2 md:m-4 h-auto w-auto rounded-3xl'>
            {/* <h1 className="p-2 md:p-4 text-xl font-bold">资产</h1> */}
            <div className='flex-row grid grid-cols-4 justify-items-stretch   h-auto w-auto  p-3 '>
               {assetData.map((item, index) => (
                  <Link href={item.href} prefetch={false} key={index} className=' grid justify-items-center hover:bg-base-content/10 rounded-full p-2 my-2 md:p-3'>
                     <item.icon size={24} /> <p className='text-[0.5rem] xs:text-xs  md:text-base'>{item.label}</p>
                  </Link>
               ))}
            </div>
         </div>


         <div className='bg-base-100 m-2 md:m-4 h-auto w-auto rounded-3xl'>
            <div className='flex-row  grid grid-cols-4 justify-items-stretch h-auto w-auto  p-3 '>
               {BusData.map((item, index) => (
                  <Link href={item.href ? item.href : ''} target='_blank' key={index} prefetch={false} className='  grid justify-items-center hover:bg-base-content/10  rounded-full p-2 my-2 md:p-3  '>
                     <item.icon size={24} /> <p className='text-[0.5rem] xs:text-xs md:text-base'>{item.label}</p>
                  </Link>
               ))}
            </div>
         </div>


         <div className='bg-base-100 m-2 md:m-4 h-auto w-auto rounded-3xl'>
            <div className='flex-row  grid grid-cols-4 justify-items-stretch h-auto w-auto  p-3 '>
               {userData.map((item, index) => (
                  <Link href={item.href ? item.href : ''} key={index} prefetch={false} className='  grid justify-items-center hover:bg-base-content/10  rounded-full p-2 my-2 md:p-3 '>
                     <item.icon size={24} /> <p className='text-[0.5rem] xs:text-xs md:text-base'>{item.label}</p>
                  </Link>
               ))}
            </div>
         </div>

      </>
   )
}
