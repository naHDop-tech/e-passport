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
}

export interface IUserPhoneProps {
  onSave: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void

  changedUserFiled: Partial<IUserProfile>

  user: Partial<IUserProfile>
  errors?: Partial<Record<FormFiledIds, string>>
}

export enum FormFiledIds {
  Phone = 'phone',
}

export function UserPhone(props: IUserPhoneProps) {
  const { errors, changedUserFiled, onSave, onChange } = props

  return (
    <div>
      <div className={styles.FormBox}>
        <h1>Edit phone</h1>

        <div className={commonStyle.Margin24} />

        <NumberInput
          label='Phone'
          placeholder='i.e. "5462192"'
          value={changedUserFiled.phone?.number}
          id={FormFiledIds.Phone}
          onChange={onChange}
          errorText={errors?.[FormFiledIds.Phone]}
        />

        <div className={commonStyle.Margin32} />
        <Button style={{ float: 'right' }} title='Save phone' onClick={onSave} />
        <div className={commonStyle.ClearFix} />
      </div>
    </div>
  )
}
