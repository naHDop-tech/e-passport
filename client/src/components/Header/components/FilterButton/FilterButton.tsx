import FilterIcon from '../../../../../static/icons/filter-icon.svg'
import s from './FilterButtonStyle.module.css'
const styles = s as unknown as IFilterButtonStyle

interface IFilterButtonStyle {
  Box: string
}

export function FilterButton() {
  return (
    <div onClick={() => console.log('Filter button clicked')} className={styles.Box}>
      <FilterIcon />
    </div>
  )
}
