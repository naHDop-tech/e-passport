import { PropsWithChildren, useReducer, useEffect } from 'react'
import { ethers } from 'ethers'

import { Web3Context } from './Context'
import { web3StateReducer } from './reducer/reducer'
import { Actions, defaultState } from './reducer/state'

export function Web3Provider(props: PropsWithChildren) {
  const { children } = props

  const [
    web3Api,
    dispatchWeb3State,
  ] = useReducer(web3StateReducer, defaultState)

  useEffect(() => {
    ;(() => {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        dispatchWeb3State({ type: Actions.SetProvider, payload: provider })
      })
      dispatchWeb3State({ type: Actions.SetLoading, payload: false })
      dispatchWeb3State({ type: Actions.SetEth, payload: window.ethereum })
    })()
  }, [])

  return (
    <Web3Context.Provider value={web3Api}>
      {children}
    </Web3Context.Provider>
  )
}
