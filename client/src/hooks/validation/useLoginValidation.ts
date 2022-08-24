import Joi from 'joi'

export function useLoginValidation() {
  const schema = Joi.object({
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'))
      .error(new Error('Week password')),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net', 'us', 'de', 'ua', 'eu', 'ca', 'ru', 'ua']
        }
      })
      .error(new Error('Bad email format'))
  })

  return (loginForm: { email: string, password: string }) => {
    try {
      const data = schema.validate(loginForm, { abortEarly: false })
      return data
    } catch (err: any) {
      throw new Error(err.message)
    }
  }
}
