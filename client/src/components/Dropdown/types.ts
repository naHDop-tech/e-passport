import { HTMLAttributes, SVGAttributes, FC } from 'react'

export type SvgComponent = FC<SVGAttributes<SVGElement>>

interface IGenericDropdownItemProps<T> {
  title?: string
  icon?: SvgComponent
}

export type GenericDropdownItemProps<T> =
  IGenericDropdownItemProps<T> & HTMLAttributes<HTMLDivElement>