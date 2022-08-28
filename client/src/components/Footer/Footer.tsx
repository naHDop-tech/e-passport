import { useMemo } from 'react'
import { useRecoilValue } from 'recoil';

import { Item } from '@store/header/types'
import { MenuItem } from '@components/Header/components/MenuItem'
import { headerItemsStateSelector } from '@store/header/selector'

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'

const commonStyle = cs as ICommonStyle

import s from './FooterStyle.module.css'
const styles = s as IFooterStyle

import LocationIcon from '@static/icons/location-icon.svg'
import CallIcon from '@static/icons/call-icon.svg'
import EmailIcon from '@static/icons/email-icon.svg'

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
      <div className={styles.ContactBlock}>
        <h3>Di passport</h3>
        <p className={commonStyle.TextWhiteGrey}>We give you hi end product and secure access</p>
        <div className={commonStyle.Margin12} />
        <div><EmailIcon />di-passport@gmail.com</div>
        <div><CallIcon />+1 (541) 523 34 65</div>
        <div><LocationIcon />3543 Elgin St. Celina, Delaware 1299</div>
      </div>
      <div className={styles.SiteMapBlock}>
        <h3>Sitemap</h3>
        <div className={commonStyle.Margin12} />
        {menuList}
      </div>
      <div className={styles.SocialMediaBlock}>
        <h3>Social Media</h3>
        <div className={commonStyle.Margin12} />
        <span>In</span><span>Twi</span><span>Fac</span>
      </div>
    </div>
  )
}
