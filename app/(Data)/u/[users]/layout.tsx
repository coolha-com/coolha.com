'use client'



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
        <div>

      
                {children}
     

        </div>
    )
}


