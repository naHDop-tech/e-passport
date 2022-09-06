import { RouteProps } from 'react-router'

import { GuardRoute } from './GuardRoute'

export interface IGuardRouteDlcProps extends RouteProps {
  authPath?: string
}

export default function GuardRouteDlc(props: IGuardRouteDlcProps) {
  const { authPath = '/sign-in', ...rest } = props

  return (
    <GuardRoute authPath={authPath} {...rest} />
  )
}
