import { useMemo } from 'react'
import Joi from 'joi'

import { FormFiledIds } from '@root/components/UserProfile/ui/phone/UserPhone'
import { IUserProfile } from '@root/interfaces/user'

type ValidatorReturnType = Partial<Record<FormFiledIds, string>>

export function useUserPhoneValidator(form: Partial<IUserProfile>): ValidatorReturnType {
  const schema = Joi.object({
    [FormFiledIds.Phone]: Joi.string().length(10).pattern(/^[0-9]+$/),
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
