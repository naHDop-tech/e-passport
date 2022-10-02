import { ChangeEvent, useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useSetRecoilState } from 'recoil'

import { toBase64 } from '@root/utils/files'
import { IUserProfile } from '@root/interfaces/user'

import { CREATE_USER } from '@gql/mutations/new-user'
import { UPDATE_USER } from '@gql/mutations/update-user'
import { UPLOAD_USER_IMAGE } from '@gql/mutations/upload-user-image'

import { useUserProfileValidator } from '@hooks/validation/useUserProfileValidator'
import { useToast } from '@hooks/useToast'
import { useUserInfo } from '@hooks/useUserInfo'

import { ToastType } from '@components/Toast/Toast'
import { UserProfile } from '@components/UserProfile'
import { token } from '@store/auth/atoms'

export function UserProfileDlc() {
  const [image, setImage] = useState<File>()
  const { user, fetchUserInfo } = useUserInfo()
  const setToken = useSetRecoilState(token)
  const [userProfileForm, setUserProfileForm] = useState<Partial<IUserProfile>>({
    firstName: user.firstName,
    lastName: user.lastName,
    birthDate: user.birthDate,
    countryResident: user.countryResident,
  })
  const errors = useUserProfileValidator(userProfileForm)
  const toast = useToast()

  const [createUserFx, { data: userCreatedData }] = useMutation(CREATE_USER)
  const [updateUserFx] = useMutation(UPDATE_USER)
  const [uploadUserImageFx] = useMutation(UPLOAD_USER_IMAGE)
  
  useEffect(() => {
    fetchUserInfo()
  }, [])

  useEffect(() => {
    if (userCreatedData?.createUser.token) {
      setToken(userCreatedData.createUser.token)
    }
  }, [userCreatedData])

  useEffect(() => {
    ;(async() => {
      if (image) {
        const base64 = await toBase64(image)

        try {
          await uploadUserImageFx({ variables: { createPhotoInput: {
              filename: image.name.replaceAll(' ', ''),
              mimetype: image.type,
              encoding: base64,
          }}})

          await fetchUserInfo()
          toast.open({ type: ToastType.Success, content: 'Your photo was updated' })
        } catch (error: any) {
          toast.open({ type: ToastType.Error, content: error.message })
        }
      }
    })()
  }, [image])

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
        } } })

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
