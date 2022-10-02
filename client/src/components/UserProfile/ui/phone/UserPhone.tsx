import { ChangeEvent } from 'react'

import { IUserProfile } from '@root/interfaces/user'

import s from './UserPhoneStyle.module.css'
const styles = s as UserPhoneStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'
import { Button } from '@root/components/Button'
import { NumberInput } from '@components/Inputs/NumberInput'

const commonStyle = cs as ICommonStyle

interface UserPhoneStyle {
  MainInfoBox: string
  FormBox: string
  PhoneBox: string
}

export interface IUserPhoneProps {
  onSave: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void

  changedUserFiled: Partial<IUserProfile['phone']>
  errors?: Partial<Record<FormFiledIds, string>>
}

export enum FormFiledIds {
  Number = 'number',
  CountryCode = 'countryCode'
}

export function UserPhone(props: IUserPhoneProps) {
  const { errors, changedUserFiled, onSave, onChange } = props

  return (
    <div>
      <div className={styles.FormBox}>
        <h1>Edit phone</h1>

        <div className={commonStyle.Margin24} />

        <div className={styles.PhoneBox}>
          {/* TODO: Dropdown */}
          <NumberInput
            label='Code'
            placeholder='i.e. "90"'
            value={changedUserFiled.countryCode}
            id={FormFiledIds.CountryCode}
            onChange={onChange}
            errorText={errors?.[FormFiledIds.CountryCode]}
          />
          <NumberInput
            label='Phone'
            placeholder='i.e. "5462192"'
            value={changedUserFiled.number}
            id={FormFiledIds.Number}
            onChange={onChange}
            errorText={errors?.[FormFiledIds.Number]}
          />
        </div>


        <div className={commonStyle.Margin32} />
        <Button style={{ float: 'right' }} title='Save phone' onClick={onSave} />
        <div className={commonStyle.ClearFix} />
      </div>
    </div>
  )
}
