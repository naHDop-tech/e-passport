import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { userSelector } from '@store/auth/selector'
import { GenericDropdownItemProps } from '@components/Dropdown/types'
import { CustomerHeader } from '@components/Header/components/CustomerHeader/CustomerHeader'

export function CustomerHeaderDLC() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigateTo = useNavigate()
  const { user } = useRecoilValue(userSelector)

  const onDropdownItemClickHandler = (data: GenericDropdownItemProps) => {
    navigateTo(data.routePath)
  }

  return (
    <CustomerHeader
      user={user}
      isDropdownOpen={isDropdownOpen}
      onDropdownClick={() => setIsDropdownOpen((ps) => !ps)}
      onDropdownSelect={onDropdownItemClickHandler}
    />
  )
}
