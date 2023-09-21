import { ChangeEvent, useState } from 'react'
import { useMutation } from '@apollo/client'

import { IAddress } from '@root/interfaces/user'
import { useUserInfo } from '@hooks/useUserInfo'
import { useToast } from '@hooks/useToast'
import { ToastType } from '@components/Toast/Toast'
import { UPDATE_USER_ADDRESS } from '@gql/mutations/update-user-address'

import { UserAddress } from './ui/address/UserAddress'
import { useUserAddressValidator } from '@root/hooks/validation/useUserAddressValidator'
import { useIsFieldWasTouched } from '@hooks/useIsFieldWasTouched'

export function UserAddressDlc() {
  return <div>test</div>
  // const { user, fetchUserInfo } = useUserInfo()
  // const [userAddress, setUserAddress] = useState<Partial<IAddress>>({
  //   city: user.address?.city,
  //   country: user.address?.country,
  //   line1: user.address?.line1,
  //   line2: user.address?.line2,
  //   zip: user.address?.zip,
  // })
  // const errors = useUserAddressValidator(userAddress)
  // const toast = useToast()
  //
  // const shortCurrentUserField = {
  //   city: user.address?.city,
  //   country: user.address?.country,
  //   line1: user.address?.line1,
  //   line2: user.address?.line2,
  //   zip: user.address?.zip,
  // }
  //
  // const isFieldWasTouched = useIsFieldWasTouched<Partial<IAddress>>(shortCurrentUserField, userAddress);
  // const isButtonDisabled = !!Object.keys(errors as Object).length || !isFieldWasTouched;
  //
  // const [updateUserAddressFx] = useMutation(UPDATE_USER_ADDRESS)
  //
  // const saveHandler = async () => {
  //   try {
  //     await updateUserAddressFx({ variables: { updateAddressInput: {
  //       country: userAddress.country,
  //       city: userAddress.city,
  //       line1: userAddress.line1,
  //       line2: userAddress.line2,
  //       zip: userAddress.zip,
  //     }}})
  //
  //     await fetchUserInfo()
  //     toast.open({ type: ToastType.Success, content: 'Your phone successfully changed' })
  //   } catch (err: any) {
  //     toast.open({ type: ToastType.Error, content: err.message })
  //   }
  // }
  //
  // const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setUserAddress((prevState) => {
  //     return {
  //       ...prevState,
  //       [e.target.id]: e.target.value,
  //     }
  //   })
  // }
  //
  // if (user.isDraft) {
  //   return null
  // }
  //
  // return (
  //   <UserAddress
  //     isButtonDisabled={isButtonDisabled}
  //     errors={errors}
  //     changedUserFiled={userAddress}
  //     onChange={changeHandler}
  //     onSave={saveHandler}
  //   />
  // )
}
