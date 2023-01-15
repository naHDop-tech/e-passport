import { useMemo } from 'react'
import Joi from 'joi'

import { FormFiledIds } from '@components/Passport/PassportView/PassportForm/PassportForm'
import { IPassport } from '@root/interfaces/user'

type ValidatorReturnType = Partial<Record<FormFiledIds, string>>

export function useUserPassportValidator(form: Partial<IPassport & { publicKey: string }>): ValidatorReturnType {
    const schema = Joi.object({
        [FormFiledIds.PublicKey]: Joi.string(),
        [FormFiledIds.PlaceOfBirth]: Joi.string(),
    })

    const errorData: ValidatorReturnType = useMemo(() => {
        const validationResult = schema.validate(form, { abortEarly: false })

        if (validationResult?.error?.details.length) {
            for (const error of validationResult?.error?.details) {
                return {
                    [error.path[0]]: error.message
                }
            }
        }
        return {}
    }, [form])

    return errorData
}
