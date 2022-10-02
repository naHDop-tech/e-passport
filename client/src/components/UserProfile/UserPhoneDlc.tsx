import { ChangeEvent, useState } from 'react'
import { useMutation } from '@apollo/client'

import { IUserProfile } from '@root/interfaces/user'
import { useUserInfo } from '@hooks/useUserInfo'
import { useToast } from '@hooks/useToast'
import { ToastType } from '@components/Toast/Toast'
import { UPDATE_USER_PHONE } from '@gql/mutations/update-user-phone'

import { UserPhone } from './ui/phone/UserPhone'
import { useUserPhoneValidator } from '@root/hooks/validation/userUserPhoneValidator'

export function UserPhoneDlc() {
  const { user, fetchUserInfo } = useUserInfo()
  const [userPhone, setUserPhone] = useState<Partial<IUserProfile['phone']>>({
    number: user.phone?.number,
    countryCode: user.phone?.countryCode
  })
  const errors = useUserPhoneValidator(userPhone)
  const toast = useToast()

  const [updateUserPhoneFx] = useMutation(UPDATE_USER_PHONE)

  const saveHandler = async () => {
    try {
      console.log('userPhone', userPhone);
      
      await updateUserPhoneFx({ variables: { updateUserPhoneInput: {
        countryCode: userPhone.countryCode,
        number: userPhone.number,
      }}})

      await fetchUserInfo()
      toast.open({ type: ToastType.Success, content: 'Your phone successfully changed' })
    } catch (err: any) {
      toast.open({ type: ToastType.Error, content: err.message })
    }
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPhone((prevState) => {
      return {
        ...prevState,
        [e.target.id]: Number(e.target.value),
      }
    })
  }

  if (user.isDraft) {
    return null
  }

  return (
    <UserPhone
      errors={errors}
      changedUserFiled={userPhone}
      onChange={changeHandler}
      onSave={saveHandler}
    />
  )
}
