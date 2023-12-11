import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue'
import { mainnet, arbitrum, sepolia } from 'viem/chains'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'ebad0910e18a6d765255012af2c7111f'

// 2. Create wagmiConfig
const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum, sepolia]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })
export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtAp
    nuxtApp.vueApp.use(createWeb3Modal, {})
})