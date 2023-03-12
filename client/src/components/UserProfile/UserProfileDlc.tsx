import { useStore } from "effector-react";
import { useEffect, ChangeEvent } from 'react'

import {useUserProfileValidator} from '@hooks/validation/useUserProfileValidator'
import {useToast} from '@hooks/useToast'
import {useIsFieldWasTouched} from '@hooks/useIsFieldWasTouched'

import {ToastType} from '@components/Toast/Toast'
import {UserProfile} from '@components/UserProfile'
import {
  countriesAndNationalitiesDomain,
  userInfoDomain,
  userPhotoStoreDomain,
  userProfileStoreDomain
} from "@components/UserProfile/store";
import {IFullUserInfo, IUserProfileStore} from "@components/UserProfile/store/interface";

export function UserProfileDlc() {
  const n = useStore(countriesAndNationalitiesDomain.store.$nationalitiesStore)
  const userProfile = useStore(userInfoDomain.store.$userInfo)
  const userProfileResponse = useStore(userInfoDomain.store.$userInfoResponse)

  const userProfileStore = useStore(userProfileStoreDomain.store.$userProfileStore)
  const userProfileResponseStore = useStore(userProfileStoreDomain.store.$userProfileResponseStore)

  const userPhotoStore = useStore(userPhotoStoreDomain.store.$fileStore)
  const userPhotoResponseStore = useStore(userPhotoStoreDomain.store.$responseStore)
  const toast = useToast()

  console.log(n)

  // TODO: to custom hook ?
  useEffect(() => {
    if (userProfileResponse.serverError) {
      toast.open({ type: ToastType.Error, content: userProfileResponse.serverError })
    }
  }, [userProfileResponse.serverError])
  useEffect(() => {
    if (
        userProfileResponse?.status === 'ok'
        && userProfile.first_name
        && userProfile.last_name
        && userProfile.nationality
        && userProfile.sex
        && userProfile.birth_date
    ) {
      const payload: IUserProfileStore = {
        firstName: userProfile.first_name,
        lastName: userProfile.last_name,
        birthDate: userProfile.birth_date,
        nationality: userProfile.nationality.code,
        sex: userProfile.sex,
      }
      userProfileStoreDomain.api.userProfileStoreApi.setDefaultValues(payload)
    }
  }, [userProfileResponse.status])

  useEffect(() => {
    if (userProfileResponseStore.serverError) {
      toast.open({ type: ToastType.Error, content: userProfileResponseStore.serverError })
    }
  }, [userProfileResponseStore.serverError])
  useEffect(() => {
    if (userProfileResponseStore?.status === 'ok') {
      toast.open({ type: ToastType.Success, content: "User profile has updated" })
    }
  }, [userProfileResponseStore.status])

  const errors = useUserProfileValidator(userProfileStore)
  const shortCurrentUserField = {
    firstName: userProfile.first_name,
    lastName: userProfile.last_name,
    birthDate: userProfile.birth_date,
    nationality: userProfile.nationality,
    sex: userProfile.sex,
  }

  const isFieldWasTouched = useIsFieldWasTouched<Partial<IFullUserInfo>>(shortCurrentUserField, userProfile);
  const isButtonDisabled = !!Object.keys(errors as Object).length || !isFieldWasTouched;
  
  useEffect(() => {
    if (userPhotoStore.file && userProfile?.photo?.photo_id) {
      userPhotoStoreDomain.event.updateUserPhotoEvent(userProfile.photo.photo_id)
    }
    if (userPhotoStore.file && !userProfile.photo?.external_id) {
      userPhotoStoreDomain.event.uploadUserPhotoEvent()
    }
  }, [userPhotoStore.file])
  useEffect(() => {
    if (userPhotoResponseStore.status === 'ok') {
      toast.open({ type: ToastType.Success, content: "User photo has updated" })
    }
  }, [userPhotoResponseStore.serverError])
  useEffect(() => {
    if (userPhotoResponseStore.serverError) {
      toast.open({ type: ToastType.Error, content: userPhotoResponseStore.serverError })
    }
  }, [userPhotoResponseStore.serverError])

  const saveHandler = () => {
    userProfileStoreDomain.event.updateUserProfileEvent()
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'firstName') {
      userProfileStoreDomain.api.userProfileStoreApi.setFirstName(e.target.value)
    }
    if (e.target.id === 'lastName') {
      userProfileStoreDomain.api.userProfileStoreApi.setLastName(e.target.value)
    }
    if (e.target.id === 'birthDate') {
      userProfileStoreDomain.api.userProfileStoreApi.setBirthDay(e.target.value)
    }
    if (e.target.id === 'nationality') {
      userProfileStoreDomain.api.userProfileStoreApi.setNationality(Number(e.target.value))
    }
    if (e.target.id === 'sex') {
      userProfileStoreDomain.api.userProfileStoreApi.setSex(e.target.value)
    }
  }

  console.log(userProfileStore)

  return (
    <UserProfile
      isButtonDisabled={isButtonDisabled}
      onSetImage={userPhotoStoreDomain.api.fileStoreApi.setFile}
      errors={errors}
      changedUserFiled={userProfileStore}
      onChange={changeHandler}
      onSave={saveHandler}
      user={userProfile}
    />
  )
}
