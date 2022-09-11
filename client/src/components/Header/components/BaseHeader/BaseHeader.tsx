import { useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';

import { Logo } from '@components/Logo'
import { Button } from '@components/Button'
import { MenuItem } from '@components/Header/components/MenuItem'
import { useActiveItem } from '@hooks/useActiveItem'
import { menuOpenStatus } from '@store/header/atoms'
import { itemsStateSelector } from '@store/menu-items/selector'

import s from './BaseHeaderStyle.module.css'
const styles = s as unknown as IEIconStyle

interface IEIconStyle {
  FlexBox: string
  LeftContent: string
  LeftText: string
  InlineMenu: string
  HamburgerMenu: string
  MenuToggle: string
  MenuButton: string
  CollapsedContentBox: string
}

export function BaseHeader() {
  const [isCheckboxActive, setIsCheckboxActive] = useRecoilState(menuOpenStatus)
  const { items, itemId } = useRecoilValue(itemsStateSelector)

  const onSelectItem = useActiveItem()

  const menuList = useMemo(() => {
    return items.header.map((item) => {
      if (item.Id === 4) {
        return <Button key={item.Id} onClick={() => onSelectItem(item)} title={item.Title as string} />
      }

      return (
        <MenuItem
          key={item.Id}
          onClick={() => onSelectItem(item)}
          isActive={item.Id === itemId}
        >
          {item.Title}
        </MenuItem>
      )
    })
  }, [itemId])

  const burgerButton = (
    <>
      <input
        className={styles.MenuToggle}
        type="checkbox"
        // workaround for no error in console
        // if you pass checked props -> onChange is needed
        onChange={() => null}
        checked={isCheckboxActive}
      />
      <div className={styles.MenuButton}></div>
    </>
  )

  return (
    <div className={styles.FlexBox}>
      <div className={styles.LeftContent} onClick={() => onSelectItem(items.header[0])}>
        <Logo />
        <div className={styles.LeftText}>Passport</div>
      </div>
      <div>
        <div className={styles.InlineMenu}>
          {menuList}
        </div>
        <div onClick={() => setIsCheckboxActive(prev => !prev)} className={styles.HamburgerMenu}>
          {burgerButton}
        </div>
        {isCheckboxActive && (
          <div className={styles.CollapsedContentBox}>
            {
              items.header.map((item) => (
                <MenuItem
                  key={item.Id}
                  onClick={() => onSelectItem(item)}
                  isActive={item.Id === itemId}
                >
                  {item.Title}
                </MenuItem>
              ))
            }
          </div>
        )}
      </div>
    </div>
  )
}
