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
  const [image, setImage] = useState<File>()
  const [imageSrc, setImageSrc] = useState<string>()
  const { user, fetchUserInfo } = useUserInfo()
  const [userProfileForm, setUserProfileForm] = useState<Partial<IUserProfile>>(user)
  const errors = useUserProfileValidator(userProfileForm)
  const toast = useToast()

  const [createUserFx] = useMutation(CREATE_USER)
  const [updateUserFx] = useMutation(UPDATE_USER)

  useEffect(() => {
    fetchUserInfo()
  }, [])

  useEffect(() => {
    if (image) {
      const newImage = URL.createObjectURL(image)
      setImageSrc(newImage)
    }
  }, [image])

  console.log('imageSrc', imageSrc);
  console.log('image', image);
  

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
          throw new Error(createdUser.errors[0].message)
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
          throw new Error(updatedUser.errors[0].message)
        }
      }
      fetchUserInfo()
      toast.open({ type: ToastType.Success, content: 'User profile were updated' })
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
      onSetImage={setImage}
      errors={errors}
      changedUserFiled={userProfileForm}
      onChange={changeHandler}
      onSave={saveHandler}
      user={user}
    />
  )
}
