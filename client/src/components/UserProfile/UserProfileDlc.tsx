import { ChangeEvent, useState, useEffect } from 'react'

import { IUserProfile } from '@root/interfaces/user'
import { CREATE_USER } from '@root/gql/mutations/new-user'
import { UPDATE_USER } from '@root/gql/mutations/update-user'

import { useUserProfileValidator } from '@hooks/validation/useUserProfileValidator'
import { useToast } from '@hooks/useToast'
import { useUserInfo } from '@hooks/useUserInfo'

import { ToastType } from '@components/Toast/Toast'
import { UserProfile } from '@components/UserProfile'
import { useMutation } from '@apollo/client'

export function UserProfileDlc() {
  const { user, fetchUserInfo } = useUserInfo()
  const [userProfileForm, setUserProfileForm] = useState<Partial<IUserProfile>>(user)
  const errors = useUserProfileValidator(userProfileForm)
  const toast = useToast()

  const [createUserFx] = useMutation(CREATE_USER)
  const [updateUserFx] = useMutation(UPDATE_USER)

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const saveHandler = async () => {
    try {
      if (user.isDraft) {
        const createdUser = await createUserFx({ variables: { createUserInput: {
          email: user.email,
          firstName: userProfileForm.firstName,
          lastName: userProfileForm.lastName,
          birthDate: userProfileForm.birthDate,
          countryResident: userProfileForm.countryResident,
        } } })
        if (createdUser.errors?.length) {
          toast.open({ type: ToastType.Error, content: createdUser.errors[0].message })
        } else {
          toast.open({ type: ToastType.Success, content: 'User profile were updated' })
        }
      } else {
        const updatedUser = await updateUserFx({ variables: { updateUserInput: {
          email: userProfileForm.email,
          firstName: userProfileForm.firstName,
          lastName: userProfileForm.lastName,
          birthDate: userProfileForm.birthDate,
          countryResident: userProfileForm.countryResident,
        } }})

        if (updatedUser.errors?.length) {
          toast.open({ type: ToastType.Error, content: updatedUser.errors[0].message })
        } else {
          toast.open({ type: ToastType.Success, content: 'User profile were updated' })
        }
      }
      fetchUserInfo()
    } catch (err: any) {
      toast.open({ type: ToastType.Error, content: err.message })
    }
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserProfileForm((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      }
    })
  }

  return (
    <UserProfile
      errors={errors}
      changedUserFiled={userProfileForm}
      onChange={changeHandler}
      onSave={saveHandler}
      user={user}
    />
  )
}
