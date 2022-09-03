import { HTMLAttributes } from 'react'

interface IGenericDropdownItemProps<T> {
  disabled?: boolean
}

export type GenericDropdownItemProps<T> =
  IGenericDropdownItemProps<T> & HTMLAttributes<HTMLDivElement>