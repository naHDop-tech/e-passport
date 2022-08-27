import { useCallback } from 'react'
import Joi from 'joi'

import { ISignUpFormData } from '@root/interfaces/user'

export function useSignUpValidation(signUpForm: ISignUpFormData) {
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

      repeatedPassword: Joi.ref('password')
  })

  return useCallback(() => {
    try {
      return schema.validate(signUpForm, { abortEarly: false })
    } catch (err: any) {
      throw new Error(err.message)
    }
  }, [signUpForm])
}
