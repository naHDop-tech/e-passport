import { ChangeEvent } from 'react'

import { IAddress } from '@root/interfaces/user'

import s from './UserAddressStyle.module.css'
const styles = s as UserAddressStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'
import { Button } from '@root/components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { NumberInput } from '@components/Inputs/NumberInput'

const commonStyle = cs as ICommonStyle

interface UserAddressStyle {
  MainInfoBox: string
  FormBox: string
  MainInfo: string
}

export interface IUserAddressProps {
  onSave: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void

  changedUserFiled: Partial<IAddress>
  errors?: Partial<Record<FormFiledIds, string>>
}

export enum FormFiledIds {
  Country = 'country',
  City = 'city',
  Line1 = 'line1',
  Line2 = 'line2',
  Zip = 'zip'
}

export function UserAddress(props: IUserAddressProps) {
  const { errors, changedUserFiled, onSave, onChange } = props

  return (
      <div className={styles.FormBox}>
        <h1>Edit Address</h1>

        <div className={commonStyle.Margin24} />
          <TextInput
            label='Country'
            placeholder='i.e. "United States"'
            value={changedUserFiled.country}
            id={FormFiledIds.Country}
            onChange={onChange}
            errorText={errors?.[FormFiledIds.Country]}
          />
          <div className={commonStyle.Margin24} />
          <TextInput
            label='City'
            placeholder='i.e. "Denver"'
            value={changedUserFiled.city}
            id={FormFiledIds.City}
            onChange={onChange}
            errorText={errors?.[FormFiledIds.City]}
          />
          <div className={commonStyle.Margin24} />
          <TextInput
            label='Line 1'
            placeholder='i.e. "Saint st."'
            value={changedUserFiled.line1}
            id={FormFiledIds.Line1}
            onChange={onChange}
            errorText={errors?.[FormFiledIds.Line1]}
          />
          <div className={commonStyle.Margin24} />
          <TextInput
            label='Line 2'
            placeholder='i.e. "123-2"'
            value={changedUserFiled.line2}
            id={FormFiledIds.Line2}
            onChange={onChange}
            errorText={errors?.[FormFiledIds.Line2]}
          />
          <div className={commonStyle.Margin24} />
          <NumberInput
            label='Zip'
            placeholder='i.e. "23465"'
            value={changedUserFiled.zip}
            id={FormFiledIds.Zip}
            onChange={onChange}
            errorText={errors?.[FormFiledIds.Zip]}
          />
        <div className={commonStyle.Margin32} />
        <Button disabled={!!Object.keys(errors as Object).length} style={{ float: 'right' }} title='Save Address' onClick={onSave} />
        <div className={commonStyle.ClearFix} />
      </div>
  )
}
