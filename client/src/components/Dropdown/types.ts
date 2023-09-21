import { HTMLAttributes, SVGAttributes, FC } from 'react'
import { IItem } from '@store/menu-items/constants'

export type SvgComponent = FC<SVGAttributes<SVGElement>>

export interface IGenericDropdownItemProps {
  // TODO: shall be recode with more flexible props
  // title, icon, action (callback)
  title: string
  url: string
  icon?: SvgComponent
}

export type GenericDropdownItemProps =
  IGenericDropdownItemProps & HTMLAttributes<HTMLDivElement>