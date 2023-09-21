import { useMemo } from 'react'
import Joi from 'joi'

import { FormFiledIds } from '@components/UserProfile/ui/profile/UserProfile'
import { IUserProfileStore } from "@components/UserProfile/store/interface";

type ValidatorReturnType = Partial<Record<FormFiledIds, string>>

export function useUserProfileValidator(form: Partial<IUserProfileStore>): ValidatorReturnType {
  const now = Date.now();
  const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 21)); // 21 years old

  const schema = Joi.object({
    [FormFiledIds.FirstName]: Joi.string().min(3).max(20),
    [FormFiledIds.LastName]: Joi.string().min(3).max(30),
    [FormFiledIds.BirthDate]: Joi.date().iso().max(cutoffDate),
    [FormFiledIds.Nationality]: Joi.number(),
    [FormFiledIds.Sex]: Joi.string(),
  })

  return useMemo(() => {
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
}
