import { ChangeEvent } from 'react'

import { Avatar, AvatarSizeType } from '@components/Header/components/CustomerInfo/Avatar'
import { TextInput } from '@components/Inputs/TextInput'

import s from './UserProfileStyle.module.css'
const styles = s as UserProfileStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'
import { Button } from '@root/components/Button'
import { IUserProfile } from '@root/interfaces/user'

const commonStyle = cs as ICommonStyle

interface UserProfileStyle {
  PageBox: string
  MainInfoBox: string
  FormBox: string
  MainInfo: string
}

export interface IUserProfileProps {
  onSave: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void

  changedUserFiled: Partial<IUserProfile>

  user: Partial<IUserProfile>
  errors?: Partial<Record<FormFiledIds, string>>
}

export enum FormFiledIds {
  FirstName = 'firstName',
  LastName = 'lastName',
  BirthDate = 'birthDate',
  CountryResident = 'countryResident'
}

export function UserProfile(props: IUserProfileProps) {
  const { user, errors, changedUserFiled, onSave, onChange } = props

  return (
    <div className={styles.PageBox}>
      <h1>My Profile</h1>

      <div className={commonStyle.Margin24} />

      <div className={styles.MainInfoBox}>
        <Avatar isSrcAllowed={!!user.imgSrc} imgSrc={user.imgSrc} size={AvatarSizeType.Medium} />
        <div className={styles.MainInfo}>
          <p>{`${user.firstName} ${user.lastName}`}</p>
          <p>{user.email}</p>
        </div>
      </div>

      <div className={commonStyle.Margin64}/>

      <div className={styles.FormBox}>
        <h1>Edit profile</h1>

        <div className={commonStyle.Margin24} />

        <TextInput
          label='First name'
          placeholder='i.e. "John"'
          value={user.firstName}
          id={FormFiledIds.FirstName}
          onChange={onChange}
          errorText={errors?.[FormFiledIds.FirstName]}
        />
        <div className={commonStyle.Margin24} />
        <TextInput
          label='Last name'
          placeholder='i.e. "Doe"'
          value={user.lastName}
          id={FormFiledIds.LastName}
          onChange={onChange}
          errorText={errors?.[FormFiledIds.LastName]}
        />
        <div className={commonStyle.Margin24} />
        <TextInput
          type="date"
          label='Birth date'
          value={user.birthDate}
          id={FormFiledIds.BirthDate}
          onChange={onChange}
          errorText={errors?.[FormFiledIds.BirthDate]}
        />
        <div className={commonStyle.Margin24} />

        {/* TODO: SELECTOR */}
        <TextInput
          label='Country resident'
          placeholder='i.e. "England"'
          value={user.countryResident}
          id={FormFiledIds.CountryResident}
          onChange={onChange}
          errorText={errors?.[FormFiledIds.CountryResident]}
        />

        <div className={commonStyle.Margin32} />
        <Button style={{ float: 'right' }} title='Save changes' onClick={onSave} />
        <div className={commonStyle.ClearFix} />
      </div>
    </div>
  )
}
