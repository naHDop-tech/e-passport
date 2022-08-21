import { Search } from '../Search'
import { CustomerInfo } from '../CustomerInfo'
import { FilterButton } from '../FilterButton'

import s from './CustomerHeaderStyle.module.css'
const styles = s as unknown as ICustomerHeaderStyle

interface ICustomerHeaderStyle {
  GridBox: string
  SearchBox: string
  FilterBox: string
  UserCardBox: string
}

export function CustomerHeader() {
  return (
    <div className={styles.GridBox}>
      <div className={styles.SearchBox}>
        <Search />
      </div>
      <div className={styles.FilterBox}>
        <FilterButton />
      </div>
      <div className={styles.UserCardBox}>
        <CustomerInfo />
      </div>
    </div>
  )
}
