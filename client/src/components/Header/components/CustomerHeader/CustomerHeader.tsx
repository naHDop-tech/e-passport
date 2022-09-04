import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Search } from '@components/Header/components/Search'
import { CustomerInfo } from '@components/Header/components/CustomerInfo'
import { FilterButton } from '@components/Header/components/FilterButton'
import { Dropdown } from '@components/Dropdown'

import { GenericDropdownItemProps } from '@components/Dropdown/types'
import { USER_MENU } from '@components/Header/components/CustomerHeader/constant'

import s from './CustomerHeaderStyle.module.css'
const styles = s as unknown as ICustomerHeaderStyle

interface ICustomerHeaderStyle {
  GridBox: string
  SearchBox: string
  FilterBox: string
  UserCardBox: string
}

function Component(props: GenericDropdownItemProps) {
  const { title, onClick } = props
  return (
    <div style={{ cursor: 'pointer' }} onClick={onClick}>
      <p>{title}</p>
    </div>
  )
}

export interface ICustomerHeaderProps {
  isDropdownOpen: boolean,
  onDropdownClick: () => void
  onDropdownSelect: (data: GenericDropdownItemProps) => void
}

export function CustomerHeader(props: ICustomerHeaderProps) {
  const { isDropdownOpen, onDropdownClick, onDropdownSelect } = props

  return (
    <div className={styles.GridBox}>
      <div className={styles.SearchBox}>
        <Search />
      </div>
      <div className={styles.FilterBox}>
        <FilterButton />
      </div>
      <div className={styles.UserCardBox}>
        <Dropdown
          isOpen={isDropdownOpen}
          component={Component}
          content={USER_MENU}
          onClick={onDropdownClick}
          onSelect={onDropdownSelect}
        >
          <CustomerInfo />
        </Dropdown>
      </div>
    </div>
  )
}
