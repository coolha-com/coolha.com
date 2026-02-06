import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, polygon, base, arbitrum, optimism, lens, } from '@reown/appkit/networks'


// Get projectId from https://dashboard.reown.com
export const projectId = process.env.NEXT_PUBLIC_REOWN_ID || ''

if (!projectId) {
    throw new Error('Project ID is not defined')
}
export const networks = [mainnet, polygon, base, arbitrum, optimism, lens, ]
//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: false,
    projectId,
    networks,
    transports: {
        [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
        [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
        [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
        [optimism.id]: http(`https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
        [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),



    },
})

export const config = wagmiAdapter.wagmiConfig
