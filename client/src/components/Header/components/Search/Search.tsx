import SearchIcon from '@static/icons/search.svg'

import s from './SearchStyle.module.css'
const styles = s as unknown as ICustomerHeaderStyle

interface ICustomerHeaderStyle {
  SearchBox: string
  SearchElement: string
}

export function Search() {
  return (
    <div className={styles.SearchBox}>
      <SearchIcon color='#92929d' />
      <input className={styles.SearchElement} placeholder='Search' />
    </div>
  )
}
