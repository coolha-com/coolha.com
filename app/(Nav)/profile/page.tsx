'use client'


import Link from 'next/link';
import { useTranslations } from 'next-intl'
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


// 可复用的网格区块组件
interface GridItem {
   label: string;
   href: string;
   icon: React.ComponentType<{ size: number }>;
}

interface GridSectionProps {
   data: GridItem[];
   openInNewTab?: boolean;
}

function GridSection({ data, openInNewTab = false }: GridSectionProps) {
   return (
      <div className='bg-base-100 m-2 md:m-4 h-auto w-auto rounded-3xl'>
         <div className='flex-row grid grid-cols-4 justify-items-stretch h-auto w-auto p-3'>
            {data.map((item, index) => (
               <Link
                  href={item.href || ''}
                  prefetch={false}
                  key={index}
                  target={openInNewTab ? '_blank' : undefined}
                  className='grid justify-items-center hover:bg-base-content/10 rounded-full p-2 my-2 md:p-3 transition-colors'
               >
                  <item.icon size={24} />
                  <p className='text-[0.5rem] xs:text-xs md:text-base text-center'>
                     {item.label}
                  </p>
               </Link>
            ))}
         </div>
      </div>
   );
}

function Card() {
   const t = useTranslations('profile');

   // 数据配置
   const sections = [
      {
         data: [
            { label: t('wallet'), href: '/wallet', icon: RiWallet3Line },
            { label: t('orders'), href: '/order', icon: RiShoppingCartLine },
            { label: t('membership'), href: '/vip', icon: RiVerifiedBadgeLine },
            { label: t('bookmarks'), href: '/bookmarks', icon: RiBookmarkLine },
         ],
         openInNewTab: false
      },
      {
         data: [
            { label: t('business'), href: ' ', icon: RiBuilding2Line },
            { label: t('store'), href: ' ', icon: RiShoppingBag4Line },
            { label: t('promotion'), href: ' ', icon: RiAdvertisementLine },
            { label: t('ai_agent'), href: ' ', icon: RiAiGenerate },
         ],
         openInNewTab: true
      },
      {
         data: [
            { label: t('creator_center'), href: '/creator', icon: RiLightbulbFlashLine },
            { label: t('analytics'), href: '/analytics', icon: RiBarChart2Line },
            { label: t('achievements'), href: '/grade', icon: RiMedalLine },
            { label: t('test_rewards'), href: '/mintNFT', icon: RiGiftLine },
            { label: t('invite_users'), href: '/invite', icon: RiUserVoiceLine },
         ],
         openInNewTab: false
      }
   ];

   return (
      <>
         {sections.map((section, index) => (
            <GridSection
               key={index}
               data={section.data}
               openInNewTab={section.openInNewTab}
            />
         ))}
      </>
   );
}
