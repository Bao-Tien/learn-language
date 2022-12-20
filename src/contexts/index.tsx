import { AuthContextProvider } from './_AuthContext'

export const combineComponents = (...components: any) => {
  return components.reduce(
    (AccumulatedComponents: any, CurrentComponent: any) => {
      // eslint-disable-next-line react/prop-types
      return ({ children }: any) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        )
      }
    },
    ({ children }: any) => <>{children}</>, // eslint-disable-line react/jsx-no-useless-fragment
  )
}

const providers = [AuthContextProvider]

const AppContextProvider = combineComponents(...providers)

export default AppContextProvider
