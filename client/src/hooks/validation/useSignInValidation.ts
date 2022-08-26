import { useCallback } from 'react'
import Joi from 'joi'

import { ISignInFormData } from '@root/interfaces/user'

export function useSignInValidation(signInForm: ISignInFormData) {
  const schema = Joi.object({
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{12,30}$')),
      // .error(new Error('Week password')),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net', 'us', 'de', 'ua', 'eu', 'ca', 'ru', 'ua']
        }
      }),
      // .error(new Error('Bad email format'))
  })

  return useCallback(() => {
    try {
      return schema.validate(signInForm, { abortEarly: false })
    } catch (err: any) {
      throw new Error(err.message)
    }
  }, [signInForm])
}
