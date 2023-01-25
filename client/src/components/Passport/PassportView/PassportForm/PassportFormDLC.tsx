import { ChangeEvent, useState } from 'react'
import { useMutation } from '@apollo/client'

import { IPassport } from '@root/interfaces/user'
import { useUserInfo } from '@hooks/useUserInfo'
import { useToast } from '@hooks/useToast'
import { ToastType } from '@components/Toast/Toast'
import { UPDATE_USER_PASSPORT } from '@gql/mutations/update-user-passport'

import { PassportForm } from './PassportForm'
import { useUserPassportValidator } from '@root/hooks/validation/useUserPassportValidator'
import { useIsFieldWasTouched } from '@hooks/useIsFieldWasTouched'

export function PassportFormDlc() {
    const { user, fetchUserInfo } = useUserInfo()
    const [userPassport, setPassport] = useState<Partial<IPassport & { publicKey: string }>>({
        placeOfBirth: user.passport?.placeOfBirth,
        publicKey: user.passport?.fingerprint.publicKey
    })
    const errors = useUserPassportValidator(userPassport)
    const toast = useToast()

    const shortCurrentUserField = {
        placeOfBirth: user.passport?.placeOfBirth,
        publicKey: user.passport?.fingerprint.publicKey
      }
    
    const isFieldWasTouched = useIsFieldWasTouched<Partial<IPassport & { publicKey: string }>>(shortCurrentUserField, userPassport);
    const isButtonDisabled = !!Object.keys(errors as Object).length || !isFieldWasTouched;

    const [updateUserPassportFx] = useMutation(UPDATE_USER_PASSPORT)

    const saveHandler = async () => {
        try {
            await updateUserPassportFx({ variables: { updatePassportInput: {
                placeOfBirth: userPassport.placeOfBirth, publicKey: userPassport.publicKey
            }}})

            await fetchUserInfo()
            toast.open({ type: ToastType.Success, content: 'Your passport successfully changed' })
        } catch (err: any) {
            toast.open({ type: ToastType.Error, content: err.message })
        }
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassport((prevState) => {
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
        <PassportForm
            isButtonDisabled={isButtonDisabled}
            errors={errors}
            changedPassportFiled={userPassport}
            onChange={changeHandler}
            onSave={saveHandler}
        />
    )
}
