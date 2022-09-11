import { MetaMaskInpageProvider } from '@metamask/providers'
import { Contract, providers } from 'ethers'

export interface IWeb3Props {
  eth: MetaMaskInpageProvider | null
  provider: providers.Web3Provider | null
  contract: Contract | null
}

type Web3StateLoadable = {
  isLoading: boolean
}

export type Web3State = IWeb3Props & Web3StateLoadable
