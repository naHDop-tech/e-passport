import { HTMLAttributes, SVGAttributes, FC } from 'react'

export type SvgComponent = FC<SVGAttributes<SVGElement>>

export interface IGenericDropdownItemProps {
  title: string
  icon?: SvgComponent
}

export type GenericDropdownItemProps =
  IGenericDropdownItemProps & HTMLAttributes<HTMLDivElement>