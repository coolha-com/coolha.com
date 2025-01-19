'use client'
import Sidebar from "@/components/header/Sidebar"
import LayoutUse from "@/components/lnes/Data/u/LayoutUse"


/* export async function generateMetadata({ params }: any) {
    const users = params.users
    const handle = `lens/${users}`;
    const { data: profileByHandle } = useProfile({ forHandle: handle });

    return {
        title: profileByHandle?.handle?.localName,
        description: `${profileByHandle?.metadata?.bio},${profileByHandle?.metadata?.displayName},${profileByHandle?.handle?.linkedTo},${profileByHandle?.ownedBy.address}`,
        openGraph: {
            images: ['/logo/icon144.png',],
        },

        twitter: {
            card: 'summary_large_image',
            title: `Coolha: ${profileByHandle?.handle?.localName} `,
            description: 'Web3 Content social',
            images: ['https://coolha.com/favicon.ico'],
          },
    }
} */
export default function layout({ children, params: { users } }) {

    return (
        <div className='bg-base-200 min-h-dvh  flex'>

            <div className="md:w-20 xl:w-56">
                <Sidebar />
            </div>

            <div className='flex-1'>
                <LayoutUse users={users}>
                    {children}
                </LayoutUse>
            </div>

            <div className="lg:w-20 xl:w-56" />

        </div>


    )
}


