import { useStore } from "effector-react";
import { ChangeEvent, useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useSetRecoilState } from 'recoil'

import { toBase64 } from '@root/utils/files'
import { IUserProfile } from '@root/interfaces/user'

import { CREATE_USER } from '@gql/mutations/new-user'
import { UPDATE_USER } from '@gql/mutations/update-user'
import { UPLOAD_USER_IMAGE } from '@gql/mutations/upload-user-image'
import { UPDATE_USER_PASSPORT } from "@gql/mutations/update-user-passport";

import { useUserProfileValidator } from '@hooks/validation/useUserProfileValidator'
import { useToast } from '@hooks/useToast'
import { useUserInfo } from '@hooks/useUserInfo'
import { useIsFieldWasTouched } from '@hooks/useIsFieldWasTouched'

import { ToastType } from '@components/Toast/Toast'
import { UserProfile } from '@components/UserProfile'
import { token } from '@store/auth/atoms'
import {
  userInfoDomain,
  userPhotoStoreDomain,
  userProfileStoreDomain
} from "@components/UserProfile/store";

export function UserProfileDlc() {
  const userProfile = useStore(userInfoDomain.store.$userInfo)
  // const userProfileResponse = useStore(userInfoDomain.store.$userInfoResponse)
  // const userProfileStore = useStore(userProfileStoreDomain.store.$userProfileStore)
  // const userProfileResponseStore = useStore(userProfileStoreDomain.store.$userProfileResponseStore)
  // const userPhotoStore = useStore(userPhotoStoreDomain.store.$fileStore)
  // const userPhotoResponseStore = useStore(userPhotoStoreDomain.store.$responseStore)

  console.log(userProfile)
  // const [image, setImage] = useState<File>()
  // const { user, fetchUserInfo } = useUserInfo()
  // const setToken = useSetRecoilState(token)
  // const [userProfileForm, setUserProfileForm] = useState<Partial<IUserProfile>>({
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  //   birthDate: user.birthDate,
  //   nationality: user.nationality,
  //   sex: user.sex,
  // })
  // const errors = useUserProfileValidator(userProfileForm)
  // const toast = useToast()
  //
  //
  // const shortCurrentUserField = {
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  //   birthDate: user.birthDate,
  //   nationality: user.nationality,
  //   sex: user.sex,
  // }
  //
  // const isFieldWasTouched = useIsFieldWasTouched<Partial<IUserProfile>>(shortCurrentUserField, userProfileForm);
  // const isButtonDisabled = !!Object.keys(errors as Object).length || !isFieldWasTouched;
  //
  // const [createUserFx, { data: userCreatedData }] = useMutation(CREATE_USER)
  // const [updateUserFx] = useMutation(UPDATE_USER)
  // // TODO: replace to backend
  // const [updateUserPassportFx] = useMutation(UPDATE_USER_PASSPORT)
  // const [uploadUserImageFx] = useMutation(UPLOAD_USER_IMAGE)
  //
  // useEffect(() => {
  //   if (userCreatedData?.createUser.token) {
  //     setToken(userCreatedData.createUser.token)
  //   }
  // }, [userCreatedData])

  // useEffect(() => {
  //   ;(async() => {
  //     if (image) {
  //       const base64 = await toBase64(image)
  //
  //       try {
  //         await uploadUserImageFx({ variables: { createPhotoInput: {
  //             filename: image.name.replaceAll(' ', ''),
  //             mimetype: image.type,
  //             encoding: base64,
  //         }}})
  //         // TODO: replace to backend
  //         if (!user.isDraft && user.passport?.type) {
  //           await updateUserPassportFx({ variables: { updatePassportInput: {}}})
  //         }
  //         await fetchUserInfo()
  //         toast.open({ type: ToastType.Success, content: 'Your photo was updated' })
  //       } catch (error: any) {
  //         toast.open({ type: ToastType.Error, content: error.message })
  //       }
  //     }
  //   })()
  // }, [image])

  // const saveHandler = async () => {
  //   try {
  //     if (user.isDraft) {
  //       const createdUser = await createUserFx({ variables: { createUserInput: {
  //         email: user.email,
  //         firstName: userProfileForm.firstName,
  //         lastName: userProfileForm.lastName,
  //         birthDate: userProfileForm.birthDate,
  //         nationality: userProfileForm.nationality,
  //         sex: userProfileForm.sex,
  //       } } })
  //
  //       if (createdUser.errors?.length) {
  //         throw new Error(createdUser.errors[0].message)
  //       }
  //     } else {
  //       const updatedUser = await updateUserFx({ variables: { updateUserInput: {
  //         email: userProfileForm.email,
  //         firstName: userProfileForm.firstName,
  //         lastName: userProfileForm.lastName,
  //         birthDate: userProfileForm.birthDate,
  //         nationality: userProfileForm.nationality,
  //         sex: userProfileForm.sex,
  //       } } })
  //
  //       if (updatedUser.errors?.length) {
  //         throw new Error(updatedUser.errors[0].message)
  //       }
  //     }
  //     // TODO: replace to backend
  //     if (!user.isDraft && user.passport?.type) {
  //       await updateUserPassportFx({ variables: { updatePassportInput: {}}})
  //     }
  //     fetchUserInfo()
  //     toast.open({ type: ToastType.Success, content: 'User profile were updated' })
  //   } catch (err: any) {
  //     toast.open({ type: ToastType.Error, content: err.message })
  //   }
  // }
  //
  // const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setUserProfileForm((prevState) => {
  //     return {
  //       ...prevState,
  //       [e.target.id]: e.target.value,
  //     }
  //   })
  // }
  return <div>User</div>
  // return (
  //   <UserProfile
  //     isButtonDisabled={isButtonDisabled}
  //     onSetImage={setImage}
  //     errors={errors}
  //     changedUserFiled={userProfileForm}
  //     onChange={changeHandler}
  //     onSave={saveHandler}
  //     user={user}
  //   />
  // )
}
