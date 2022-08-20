import { useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom'

import { EIcon } from '../../../EIcon'
import { withTheme } from '../../../HOC/WithTheme'
import { Button } from '../../../Button'
import { MenuItem } from '../../../Header/components/MenuItem'
import { ThemeToggle as TT } from '../../../ThemeToggle'
import { activeItemId, } from '../../../../store/header/atoms'
import { headerItemsStateSelector } from '../../../../store/header/selector'
import { Item } from '../../../../store/header/types'

import s from './BaseHeaderStyle.module.css'
const styles = s as unknown as IEIconStyle

const ThemeToggle = withTheme(TT)

interface IEIconStyle {
  FlexBox: string
  LeftContent: string
  LeftText: string
  RightContent: string
}

export function BaseHeader() {
  const [_, setActiveItem] = useRecoilState(activeItemId)
  const { items, itemId } = useRecoilValue(headerItemsStateSelector)
  const navigateTo = useNavigate()

  const onSelectItem = (item: Item) => {
    setActiveItem(item.id)
    navigateTo(item.url)
  }

  const menu = useMemo(() => {
    return items.map((item) => {
      if (item.id === 4) {
        return <Button key={item.id} onClick={() => onSelectItem(item)} title={item.title} />
      }

      return (
        <MenuItem
          key={item.id}
          onClick={() => onSelectItem(item)}
          isActive={item.id === itemId}
        >
          {item.title}
        </MenuItem>
      )
    })
  }, [itemId])

  return (
    <div className={styles.FlexBox}>
      <div className={styles.LeftContent} onClick={() => navigateTo('/')}>
        <EIcon />
        <div className={styles.LeftText}>Passport</div>
      </div>
      <div className={styles.RightContent}>
        <ThemeToggle />
        {menu}
      </div>
    </div>
  )
}
