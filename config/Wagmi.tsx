
import { cookieStorage, createStorage, http } from 'wagmi'
import { mainnet, polygon, zksync, arbitrum, optimism, base, worldchain, blast, linea, scroll, xLayer } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'


export const projectId = process.env.NEXT_PUBLIC_REOWN_ID || '';

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [mainnet, polygon, zksync, arbitrum, optimism, base, worldchain, blast, linea, scroll, xLayer]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks,
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    [zksync.id]: http(`https://zksync-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    [optimism.id]: http(`https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    [worldchain.id]: http(`https://worldchain-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    [blast.id]: http(`https://blast-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    [linea.id]: http(`https://linea-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    [scroll.id]: http(`https://scroll-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    [xLayer.id]: http(),

  },
})

export const config = wagmiAdapter.wagmiConfig

/* export const config = createConfig({

  chains: [polygon, mainnet,],
  transports: {
    [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
  },
  
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
}) */


