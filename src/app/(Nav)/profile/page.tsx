'use client'

import Link from 'next/link';
import { useTranslations } from 'next-intl'
import { IoWalletOutline, IoCartOutline, IoRibbonOutline, IoStorefrontOutline, IoMegaphoneOutline, IoBulbOutline, IoStatsChartOutline, IoGiftOutline, IoMicOutline } from "react-icons/io5";
import { RxBookmark, RxBackpack } from "react-icons/rx";
import { FaRobot } from "react-icons/fa6";
import { Card } from "@/components/ui/card";
import { RiAdvertisementLine, RiVerifiedBadgeLine, RiWallet3Line } from 'react-icons/ri';

export default function page() {
   // 如果已登录并获取到 Profile 数据
   return (
      <div className="mx-auto max-w-3xl px-2 md:px-0">
         <ProfileCard />
      </div>
   );
}

// 可复用的网格区块组件
interface GridItem {
   label: string;
   href: string;
   icon: React.ComponentType<{ size: number, className?: string }>;
}

interface GridSectionProps {
   data: GridItem[];
   openInNewTab?: boolean;
}

function GridSection({ data, openInNewTab = false }: GridSectionProps) {
   return (
      <Card className='m-2 md:m-4 rounded-3xl overflow-hidden'>
         <div className='flex-row grid grid-cols-4 justify-items-stretch p-3'>
            {data.map((item, index) => (
               <Link
                  href={item.href || ''}
                  prefetch={false}
                  key={index}
                  target={openInNewTab ? '_blank' : undefined}
                  className='grid justify-items-center hover:bg-muted rounded-2xl p-2 my-2 md:p-3 transition-colors'
               >
                  <item.icon size={24} className="text-foreground" />
                  <p className='text-[0.65rem] xs:text-xs md:text-sm text-center mt-2 font-medium text-muted-foreground'>
                     {item.label}
                  </p>
               </Link>
            ))}
         </div>
      </Card>
   );
}

function ProfileCard() {
   const t = useTranslations('profile');

   // 数据配置
   const sections = [
      {
         data: [
            { label: t('wallet'), href: '/wallet', icon: RiWallet3Line },
            { label: t('orders'), href: '/order', icon: IoCartOutline },
            { label: t('membership'), href: '/vip', icon: RiVerifiedBadgeLine },
            { label: t('bookmarks'), href: '/bookmarks', icon: RxBookmark },
         ],
         openInNewTab: false
      },
      {
         data: [
            { label: t('business'), href: '/business', icon: RxBackpack },
            { label: t('store'), href: '/shop', icon: IoStorefrontOutline },
            { label: t('promotion'), href: ' ', icon: RiAdvertisementLine },
            { label: t('ai_agent'), href: ' ', icon: FaRobot },
         ],
         openInNewTab: true
      },
      {
         data: [
            { label: t('creator_center'), href: '/creator', icon: IoBulbOutline },
            { label: t('analytics'), href: '/analytics', icon: IoStatsChartOutline },
            { label: t('achievements'), href: '/grade', icon: IoRibbonOutline },
            { label: t('test_rewards'), href: '/mintNFT', icon: IoGiftOutline },
            { label: t('invite_users'), href: '/invite', icon: IoMegaphoneOutline },
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
