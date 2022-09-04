import { HTMLAttributes, SVGAttributes, FC } from 'react'

export type SvgComponent = FC<SVGAttributes<SVGElement>>

export interface IGenericDropdownItemProps {
  title: string
  routePath: string
  icon?: SvgComponent
}

export type GenericDropdownItemProps =
  IGenericDropdownItemProps & HTMLAttributes<HTMLDivElement>