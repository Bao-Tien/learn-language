import React from 'react'
import AuthContext from '~root/contexts/_AuthContext'

type TRequestMethod = 'GET' | 'POST' | 'PUT'

type TUseFetchReturn<T> = [
  { data?: T; isLoading: boolean; error: string },
  (params: {
    url: string
    method: TRequestMethod
    body?: any
    header?: Record<any, any>
    notStringifyBody?: boolean
    callBackOnSuccess?: (data: T) => any
    callBackOnFail?: (error: any) => any
    callBackOnFinish?: () => any
  }) => void,
]

export function useFetch<ResponseType = any>(): TUseFetchReturn<ResponseType> {
  const [data, setData] = React.useState<ResponseType>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const { userData } = React.useContext(AuthContext)

  const run = React.useCallback(
    (params: {
      url: string
      method: TRequestMethod
      body?: any
      header?: Record<any, any>
      notStringifyBody?: boolean
      callBackOnSuccess?: (data: ResponseType) => any
      callBackOnFail?: (error: any) => any
      callBackOnFinish?: () => any
    }) => {
      setIsLoading(true)
      const headers: Record<any, any> = {
        'Content-Type': 'application/json',
        ...(params.header ?? {}),
      }
      if (userData.token && userData.token.length > 0) {
        headers['Authorization'] = userData.token
      }

      fetch(params.url, {
        method: params.method,
        headers: headers,
        body: params.notStringifyBody ? params.body : JSON.stringify(params.body),
      })
        .then(async (res) => ({
          jsonResponse: await res.json(),
          status: res.status,
          ok: res.ok,
        }))
        .then(({ jsonResponse, status, ok }) => {
          if (ok) {
            setData(jsonResponse)
            if (typeof params.callBackOnSuccess === 'function') {
              params.callBackOnSuccess(jsonResponse)
            }
          } else {
            setError(jsonResponse)
            if (typeof params.callBackOnFail === 'function') {
              params.callBackOnFail(jsonResponse)
            }
          }
        })
        .catch((err) => {
          setError(err)
          if (typeof params.callBackOnFail === 'function') {
            params.callBackOnFail(err)
          }
        })
        .finally(() => {
          setIsLoading(false)
          if (typeof params.callBackOnFinish === 'function') {
            params.callBackOnFinish()
          }
        })
    },
    [setIsLoading, setData, setError, userData],
  )

  return [{ data, isLoading, error }, run]
}
