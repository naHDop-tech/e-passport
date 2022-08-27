import { useMemo } from 'react'
import { useRecoilValue } from 'recoil';

import { Item } from '@store/header/types'
import { MenuItem } from '@components/Header/components/MenuItem'
import { headerItemsStateSelector } from '@store/header/selector'

import s from './FooterStyle.module.css'
const styles = s as IFooterStyle

interface IFooterStyle {
  Box: string
  ContactBlock: string
  SiteMapBlock: string
  SocialMediaBlock: string
}

export interface IFooterProps {
  onNavigate: (data: Item) => void
}

export function Footer(props: IFooterProps) {
  const { onNavigate } = props
  const { items, itemId } = useRecoilValue(headerItemsStateSelector)

  const menuList = useMemo(() => {
    return items.map((item) => {
      return (
        <MenuItem
          key={item.id}
          onClick={() => onNavigate(item)}
          isActive={item.id === itemId}
        >
          {item.title}
        </MenuItem>
      )
    })
  }, [itemId])

  return (
    <div className={styles.Box}>
      <div className={styles.ContactBlock}>ContactBlock</div>
      <div className={styles.SiteMapBlock}>{menuList}</div>
      <div className={styles.SocialMediaBlock}>SocialMediaBlock</div>
    </div>
  )
}
