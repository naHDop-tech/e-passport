export interface IGenericDropdownItemProps<T> {
  onClick: (v: T) => void
  disabled?: boolean
}