import { HTMLAttributes, SVGAttributes, FC } from 'react'
import { IItem } from '@store/menu-items/constants'

export type SvgComponent = FC<SVGAttributes<SVGElement>>

export interface IGenericDropdownItemProps {
  title: string
  url: string
  icon?: SvgComponent
}

export type GenericDropdownItemProps =
  IGenericDropdownItemProps & HTMLAttributes<HTMLDivElement>