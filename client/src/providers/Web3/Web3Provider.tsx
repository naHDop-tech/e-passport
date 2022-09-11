import { PropsWithChildren, useState } from 'react'

import { Web3Context } from './Context'

export function Web3Provider(props: PropsWithChildren) {
  const { children } = props
  const [web3Api, setWeb3Api] = useState({ foo: 'foo' })

  return (
    <Web3Context.Provider value={web3Api}>
      {children}
    </Web3Context.Provider>
  )
}
