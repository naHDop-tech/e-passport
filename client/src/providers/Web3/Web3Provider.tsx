import { PropsWithChildren, useReducer, useEffect } from 'react'

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
      dispatchWeb3State({ type: Actions.SetEth, payload: window.ethereum })
      dispatchWeb3State({ type: Actions.SetLoading, payload: false })
    })()
  }, [])

  return (
    <Web3Context.Provider value={web3Api}>
      {children}
    </Web3Context.Provider>
  )
}
