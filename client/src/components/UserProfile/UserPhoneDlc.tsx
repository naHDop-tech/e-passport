import { ChangeEvent, useState } from 'react'
import { useMutation } from '@apollo/client'

import { IUserProfile } from '@root/interfaces/user'
import { useUserInfo } from '@hooks/useUserInfo'
import { useToast } from '@hooks/useToast'
import { ToastType } from '@components/Toast/Toast'
import { UPDATE_USER_PHONE } from '@gql/mutations/update-user-phone'

import { UserPhone } from './ui/phone/UserPhone'
import { useUserPhoneValidator } from '@root/hooks/validation/userUserPhoneValidator'
import { useIsFieldWasTouched } from '@hooks/useIsFieldWasTouched'

export function UserPhoneDlc() {
  const { user, fetchUserInfo } = useUserInfo()
  const [userPhone, setUserPhone] = useState<Partial<IUserProfile['phone']>>({
    number: user.phone?.number,
    countryCode: user.phone?.countryCode
  })
  const errors = useUserPhoneValidator(userPhone)
  const toast = useToast()

  const shortCurrentUserField = {
    number: user.phone?.number,
    countryCode: user.phone?.countryCode,
  }

  const isFieldWasTouched = useIsFieldWasTouched(shortCurrentUserField, userPhone);
  const isButtonDisabled = !!Object.keys(errors as Object).length || !isFieldWasTouched;

  const [updateUserPhoneFx] = useMutation(UPDATE_USER_PHONE)

  const saveHandler = async () => {
    try {
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
        [e.target.id]: e.target.value,
      }
    })
  }

  if (user.isDraft) {
    return null
  }

  return (
    <UserPhone
    isButtonDisabled={isButtonDisabled}
      errors={errors}
      changedUserFiled={userPhone}
      onChange={changeHandler}
      onSave={saveHandler}
    />
  )
}
