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

function Component<T>(data: GenericDropdownItemProps<T>) {
  return (
    <div onClick={data.onClick}>
      <h1>Hello</h1>
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
          content={[{foo: 'foo'}]}
          onClick={() => setIsDropdownOpen((ps) => !ps)}
          onSelect={(data) => console.log(data)}
        >
          <CustomerInfo />
        </Dropdown>
      </div>
    </div>
  )
}
