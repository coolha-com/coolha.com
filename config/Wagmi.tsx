
import { cookieStorage, createStorage, http } from 'wagmi'
import { mainnet, polygon, zksync } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'


export const projectId = process.env.REOWN_ID || 'ee0baf74aec8f889780d2859302173aa';

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [polygon, mainnet,zksync]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks,
  transports: {
    [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    [zksync.id]: http(`https://zksync-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    
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


