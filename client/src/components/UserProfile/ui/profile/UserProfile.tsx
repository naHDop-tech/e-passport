import { ChangeEvent } from 'react'

import { Avatar, AvatarSizeType } from '@components/Header/components/CustomerInfo/Avatar'
import { TextInput } from '@components/Inputs/TextInput'
import { ImageUploader } from '@components/ImageUploader'

import s from './UserProfileStyle.module.css'
const styles = s as UserProfileStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'
import { Button } from '@root/components/Button'
import {IFullUserInfo, IUserProfileStore} from "@components/UserProfile/store/interface";
import {NumberInput} from "@components/Inputs/NumberInput";

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

  isButtonDisabled: boolean

  changedUserFiled: Partial<IUserProfileStore>

  user: Partial<IFullUserInfo>
  errors?: Partial<Record<FormFiledIds, string>>
}

export enum FormFiledIds {
  FirstName = 'first_name',
  LastName = 'last_name',
  BirthDate = 'birth_date',
  Nationality = 'nationality',
  Sex = 'sex',
}

export function UserProfile(props: IUserProfileProps) {
  const { user, errors, changedUserFiled, onSave, onChange, onSetImage, isButtonDisabled } = props

  return (
    <div>
      {
        user.role?.role_class !== "Draft" && <div className={styles.MainInfoBox}>
          <div className={commonStyle.PositionRelative}>
            <Avatar
              isSrcAllowed={!!user.photo?.external_id}
              imgSrc={user.photo?.url}
              size={AvatarSizeType.Medium}
            />
            <ImageUploader setImage={onSetImage} />
          </div>
          <div className={styles.MainInfo}>
            <p>{`${user.first_name} ${user.last_name}`}</p>
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
          value={changedUserFiled.first_name}
          id={FormFiledIds.FirstName}
          onChange={onChange}
          errorText={errors?.[FormFiledIds.FirstName]}
        />
        <div className={commonStyle.Margin24} />
        <TextInput
          label='Last name'
          placeholder='i.e. "Doe"'
          value={changedUserFiled.last_name}
          id={FormFiledIds.LastName}
          onChange={onChange}
          errorText={errors?.[FormFiledIds.LastName]}
        />
        <div className={commonStyle.Margin24} />
        <TextInput
          type="date"
          label='Birth date'
          value={changedUserFiled.birth_date}
          id={FormFiledIds.BirthDate}
          onChange={onChange}
          errorText={errors?.[FormFiledIds.BirthDate]}
        />
        <div className={commonStyle.Margin24} />

        {/* TODO: SELECTOR */}
        <NumberInput
            label='Country resident'
            placeholder='i.e. "England"'
            value={changedUserFiled.nationality}
            id={FormFiledIds.Nationality}
            onChange={onChange}
            errorText={errors?.[FormFiledIds.Nationality]}
        />
        <div className={commonStyle.Margin24} />
        {/*<TextInput*/}
        {/*  label='Country resident'*/}
        {/*  placeholder='i.e. "England"'*/}
        {/*  value={changedUserFiled.nationality}*/}
        {/*  id={FormFiledIds.Nationality}*/}
        {/*  onChange={onChange}*/}
        {/*  errorText={errors?.[FormFiledIds.Nationality]}*/}
        {/*/>*/}
        {/*<div className={commonStyle.Margin24} />*/}

        {/* TODO: SELECTOR */}
        <TextInput
            label='Sex'
            placeholder='i.e. "Male"'
            value={changedUserFiled.sex}
            id={FormFiledIds.Sex}
            onChange={onChange}
            errorText={errors?.[FormFiledIds.Sex]}
        />

        <div className={commonStyle.Margin32} />
        <Button disabled={isButtonDisabled} style={{ float: 'right' }} title='Save profile' onClick={onSave} />
        <div className={commonStyle.ClearFix} />
      </div>
    </div>
  )
}
