import { useState } from 'react'

import { Search } from '@components/Header/components/Search'
import { CustomerInfo } from '@components/Header/components/CustomerInfo'
import { FilterButton } from '@components/Header/components/FilterButton'
import { Dropdown } from '@components/Dropdown'

import { GenericDropdownItemProps } from '@components/Dropdown/types'

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

export function CustomerHeader() {
  // TODO: delete
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
          content={[{title: 'Settings'}, {title: 'Update'}, {title: 'Logout'}]}
          onClick={() => setIsDropdownOpen((ps) => !ps)}
          onSelect={(data) => console.log(data)}
        >
          <CustomerInfo />
        </Dropdown>
      </div>
    </div>
  )
}
