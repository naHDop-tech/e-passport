import { useMemo } from 'react'
import Joi from 'joi'

import { FormFiledIds } from '@components/UserProfile/ui/address/UserAddress'
import { IUserProfile } from '@root/interfaces/user'

type ValidatorReturnType = Partial<Record<FormFiledIds, string>>

export function useUserAddressValidator(form: Partial<IUserProfile>): ValidatorReturnType {
  const schema = Joi.object({
    [FormFiledIds.Country]: Joi.string().min(3).max(20),
    [FormFiledIds.City]: Joi.string().min(3).max(30),
    [FormFiledIds.Line1]: Joi.string().min(3).max(30),
    [FormFiledIds.Line2]: Joi.string().min(3).max(30),
    [FormFiledIds.Zip]: Joi.string().min(5),
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
