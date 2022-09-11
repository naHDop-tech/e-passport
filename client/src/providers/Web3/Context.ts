import { createContext } from "react";
import { Web3State } from './types'
import { defaultState } from './reducer/state'

export const Web3Context = createContext<Web3State>(defaultState)