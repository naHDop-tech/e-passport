import { useMemo } from 'react'
import Joi from 'joi'

import { FormFiledIds } from '@components/UserProfile/ui/UserProfile'
import { IUserProfile } from '@root/interfaces/user'

type ValidatorReturnType = Partial<Record<FormFiledIds, string>>

export function useUserProfileValidator(form: Partial<IUserProfile>): ValidatorReturnType {
  const schema = Joi.object({
    [FormFiledIds.FirstName]: Joi.string().min(5).max(20),
    [FormFiledIds.LastName]: Joi.string().min(5).max(30),
    [FormFiledIds.BirthDate]: Joi.date().iso(),
    [FormFiledIds.CountryResident]: Joi.string()
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