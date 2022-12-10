import React from 'react'

// type lon hon interface

type TRequestMethod = 'GET' | 'POST' | 'PUT'

type TUseFetchReturn<T> = [
  { data?: T; isLoading: boolean; error: string },
  (params: {
    url: string
    method: TRequestMethod
    body?: any
    header?: HeadersInit
    notStringifyBody?: boolean
    callBackOnSuccess?: (data: T) => any
  }) => void,
]

export function useFetch<ResponseType = any>(): TUseFetchReturn<ResponseType> {
  const [data, setData] = React.useState<ResponseType>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const run = React.useCallback(
    (params: {
      url: string
      method: TRequestMethod
      body?: any
      header?: HeadersInit
      notStringifyBody?: boolean
      callBackOnSuccess?: (data: ResponseType) => any
    }) => {
      setIsLoading(true)
      fetch(params.url, {
        method: params.method,
        headers: params.header ?? {
          'Content-Type': 'application/json',
        },
        body: params.notStringifyBody ? params.body : JSON.stringify(params.body),
      })
        .then((res) => res.json())
        .then((res) => {
          setData(res)
          if (typeof params.callBackOnSuccess === 'function') {
            params.callBackOnSuccess(res)
          }
        })
        .catch((err) => {
          setError(err)
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    [setIsLoading, setData, setError],
  )

  return [{ data, isLoading, error }, run]
}
