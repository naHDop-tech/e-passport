import { useCallback } from 'react'
import Joi from 'joi'

import { IResetPasswordData } from '@root/interfaces/user'

export function useResetPasswordValidation(signInForm: IResetPasswordData) {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net', 'us', 'de', 'ua', 'eu', 'ca', 'ru', 'ua']
        }
      }),
  })

  return useCallback(() => {
    try {
      return schema.validate(signInForm, { abortEarly: false })
    } catch (err: any) {
      throw new Error(err.message)
    }
  }, [signInForm])
}
