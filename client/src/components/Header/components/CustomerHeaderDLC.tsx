import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { GenericDropdownItemProps } from '@components/Dropdown/types'
import { CustomerHeader } from '@components/Header/components/CustomerHeader/CustomerHeader'

export function CustomerHeaderDLC() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigateTo = useNavigate()

  const onDropdownItemClickHandler = (data: GenericDropdownItemProps) => {
    navigateTo(data.routePath)
  }

  return (
    <CustomerHeader
      isDropdownOpen={isDropdownOpen}
      onDropdownClick={() => setIsDropdownOpen((ps) => !ps)}
      onDropdownSelect={onDropdownItemClickHandler}
    />
  )
}
