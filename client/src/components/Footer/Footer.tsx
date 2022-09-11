import { useMemo } from 'react'
import { useRecoilValue } from 'recoil';

import { IItem } from '@store/menu-items/constants'
import { MenuItem } from '@components/Header/components/MenuItem'
import { itemsStateSelector } from '@store/menu-items/selector'

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
  onNavigate: (data: IItem) => void
}

export function Footer(props: IFooterProps) {
  const { onNavigate } = props
  const { items, itemId } = useRecoilValue(itemsStateSelector)

  const menuList = useMemo(() => {
    return items.header.map((item) => {
      return (
        <MenuItem
          key={item.Id}
          onClick={() => onNavigate(item)}
          isActive={item.Id === itemId}
        >
          {item.Title}
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
