
export const metadata = {
    title: {
        template: `%s | Coolha Labs`,
        default: `酷哈实验室 关于我们`,
    },

    description: "Coolha Labs,酷哈实验室,关于酷哈实验室,区块链,Web3,市场营销策划,NFT品牌营销,让数据信息可拥有、可信任、有价值,Dapp开发,网站开发,去中心化应用开发,智能合约开发,酷哈,Coolha,酷哈web3，，web3营销策划,Coolha Labs,coolha.com Coolha.com,labs.coolha.com,",
}

export default function layout({ children }:any) {
    return (
        <div className=" bg-base-100 pt-20">
            {children}
        </div>
    )
}