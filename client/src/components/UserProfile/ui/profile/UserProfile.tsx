import { ChangeEvent } from 'react'

import { Avatar, AvatarSizeType } from '@components/Header/components/CustomerInfo/Avatar'
import { TextInput } from '@components/Inputs/TextInput'
import { ImageUploader } from '@components/ImageUploader'

import s from './UserProfileStyle.module.css'
const styles = s as UserProfileStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'
import { Button } from '@root/components/Button'
import { IUserProfile } from '@root/interfaces/user'

const commonStyle = cs as ICommonStyle

interface UserProfileStyle {
  MainInfoBox: string
  FormBox: string
  MainInfo: string
}

export interface IUserProfileProps {
  onSave: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSetImage: (e: File) => void

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
  const { user, errors, changedUserFiled, onSave, onChange, onSetImage } = props
  console.log(errors);
  
  return (
    <div>
      {
        !user.isDraft && <div className={styles.MainInfoBox}>
          <div className={commonStyle.PositionRelative}>
            <Avatar
              isSrcAllowed={!!user.photo?.encoding}
              imgSrc={user.photo?.encoding}
              size={AvatarSizeType.Medium}
            />
            <ImageUploader setImage={onSetImage} />
          </div>
          <div className={styles.MainInfo}>
            <p>{`${user.firstName} ${user.lastName}`}</p>
            <p>{user.email}</p>
          </div>
        </div>
      }
      <div className={commonStyle.Margin64}/>

      <div className={styles.FormBox}>
        <h1>Edit profile</h1>

        <div className={commonStyle.Margin24} />

        <TextInput
          label='First name'
          placeholder='i.e. "John"'
          value={changedUserFiled.firstName}
          id={FormFiledIds.FirstName}
          onChange={onChange}
          errorText={errors?.[FormFiledIds.FirstName]}
        />
        <div className={commonStyle.Margin24} />
        <TextInput
          label='Last name'
          placeholder='i.e. "Doe"'
          value={changedUserFiled.lastName}
          id={FormFiledIds.LastName}
          onChange={onChange}
          errorText={errors?.[FormFiledIds.LastName]}
        />
        <div className={commonStyle.Margin24} />
        <TextInput
          type="date"
          label='Birth date'
          value={changedUserFiled.birthDate}
          id={FormFiledIds.BirthDate}
          onChange={onChange}
          errorText={errors?.[FormFiledIds.BirthDate]}
        />
        <div className={commonStyle.Margin24} />

        {/* TODO: SELECTOR */}
        <TextInput
          label='Country resident'
          placeholder='i.e. "England"'
          value={changedUserFiled.countryResident}
          id={FormFiledIds.CountryResident}
          onChange={onChange}
          errorText={errors?.[FormFiledIds.CountryResident]}
        />

        <div className={commonStyle.Margin32} />
        <Button disabled={!!Object.keys(errors as Object).length} style={{ float: 'right' }} title='Save profile' onClick={onSave} />
        <div className={commonStyle.ClearFix} />
      </div>
    </div>
  )
}
