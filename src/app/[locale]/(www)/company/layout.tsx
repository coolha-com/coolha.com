
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('company')
    const companyTitle = t('title')

    return {
        title: {
            template: `%s | ${companyTitle}`,
            default: companyTitle,
        },
        description: "Coolha Limited,酷哈有限公司,关于酷哈有限公司,区块链,Web3,市场营销策划,NFT品牌营销,让数据信息可拥有、可信任、有价值,Dapp开发,网站开发,去中心化应用开发,智能合约开发,酷哈,Coolha,酷哈web3，，web3营销策划,Coolha Limited, coolha.com Coolha.com,labs.coolha.com,",
    }
}

export default function layout({ children }: any) {
    return (
        <div className=" bg-base-100 pt-20">
            {children}
        </div>
    )
}
