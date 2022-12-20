import React from 'react'
import { DEBUG_SHOW_AUTH_CONTEXT_LOG, LOCAL_STORAGE_THEME_USER_DATA_KEY } from '~root/constants'
import { IUserData } from '~root/interfaces/UserData'

export interface IAuthContext {
  userData: Partial<IUserData>
  isLoggedIn: boolean
  hasCheckedUserDataInLSFirstTime: boolean
  login: (data: IUserData) => void
  logout: () => void
}

const CONTEXT_DEFAULT_VALUE: IAuthContext = {
  userData: {},
  isLoggedIn: false,
  hasCheckedUserDataInLSFirstTime: false,
  login: () => {},
  logout: () => {},
}

const AuthContext = React.createContext<IAuthContext>(CONTEXT_DEFAULT_VALUE)

export const AuthContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [userData, setUserData] = React.useState<Partial<IUserData>>(CONTEXT_DEFAULT_VALUE.userData)
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(CONTEXT_DEFAULT_VALUE.isLoggedIn)
  const [hasCheckedUserDataInLSFirstTime, setHasCheckedUserDataInLSFirstTime] =
    React.useState<boolean>(false)

  React.useEffect(() => {
    if (userData.token) {
      if (hasCheckedUserDataInLSFirstTime) {
        localStorage.setItem(LOCAL_STORAGE_THEME_USER_DATA_KEY, JSON.stringify(userData))
      }
      setIsLoggedIn(true)
      DEBUG_SHOW_AUTH_CONTEXT_LOG && console.log('Login successfully')
      DEBUG_SHOW_AUTH_CONTEXT_LOG && console.log(userData)
    } else {
      setIsLoggedIn(false)
      if (hasCheckedUserDataInLSFirstTime) {
        localStorage.setItem(LOCAL_STORAGE_THEME_USER_DATA_KEY, JSON.stringify({}))
      }
      DEBUG_SHOW_AUTH_CONTEXT_LOG && console.log('NOT login')
    }
  }, [userData, setIsLoggedIn, hasCheckedUserDataInLSFirstTime])

  const login = React.useCallback(
    (data: IUserData) => {
      setUserData(data)
    },
    [setUserData],
  )

  const logout = React.useCallback(() => {
    setUserData({})
  }, [setUserData])

  const getAndProcessUserDataFromLocalStorage = React.useCallback(() => {
    DEBUG_SHOW_AUTH_CONTEXT_LOG && console.log('Check UserData in LS')
    const stringUserData = localStorage.getItem(LOCAL_STORAGE_THEME_USER_DATA_KEY)
    DEBUG_SHOW_AUTH_CONTEXT_LOG && console.log('stringUserData: ', stringUserData)
    if (stringUserData) {
      const userData: IUserData = JSON.parse(stringUserData)
      if (userData.id) {
        login(userData)
        setIsLoggedIn(true)
      }
    }
    setHasCheckedUserDataInLSFirstTime(true)
  }, [login, setHasCheckedUserDataInLSFirstTime])

  React.useEffect(() => {
    // Check if userData exist in LocalStorage in the first load time
    getAndProcessUserDataFromLocalStorage()
  }, [getAndProcessUserDataFromLocalStorage])

  const values: IAuthContext = React.useMemo(
    () => ({
      userData,
      isLoggedIn,
      hasCheckedUserDataInLSFirstTime,
      login,
      logout,
    }),
    [userData, isLoggedIn, hasCheckedUserDataInLSFirstTime, login, logout],
  )

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthContext
