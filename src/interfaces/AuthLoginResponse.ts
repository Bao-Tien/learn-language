import { IUserData } from './UserData'

export interface AuthLoginResponseSuccess {
  message: string
  userData: IUserData
}

export interface AuthLoginResponseFail {
  message: string
}
