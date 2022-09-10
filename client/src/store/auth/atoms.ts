import { atom } from 'recoil'
import { localStorageEffect } from '@store/effect'
import * as jwt from 'jsonwebtoken';

export const token = atom<string>({
  key: 'token',
  default: 'asd',
  effects: [
    localStorageEffect('token')
  ]
})

export const userInfo = atom<Partial<IUser>>({
  key: 'userInfo',
  default: {
    id: '',
    email: 'grigory@maroo.us', // TODO: get true info
    firstName: 'Greg', // TODO: get true info
    lastName: 'Tarasoff', // TODO: get true info
    imgSrc: 'https://www.w3schools.com/howto/img_avatar.png', // TODO: get true info
  },
  effects: [
    localStorageEffect('user')
  ]
})

export const parseToken = (token: string): Partial<IUser> => {
  const jwtSecret = process.env.JWT_SECRET_KEY as string
  const verified = jwt.verify(token, jwtSecret) as Partial<IUser>;
  
  return {
    id: verified.id,
    email: verified.email,
  }
}

export interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  imgSrc: string
}