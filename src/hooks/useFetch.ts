import React from 'react'

// type lon hon interface

type TRequestMethod = 'GET' | 'POST' | 'PUT'

type TUseFetchReturn<T> = [
  { data?: T; isLoading: boolean; error: string },
  (params: { url: string; method: TRequestMethod }) => void,
]

export function useFetch<ResponseType = any>(): TUseFetchReturn<ResponseType> {
  const [data, setData] = React.useState<ResponseType>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const run = React.useCallback(
    (params: { url: string; method: TRequestMethod }) => {
      setIsLoading(true)
      fetch(params.url, {
        method: params.method,
      })
        .then((res) => res.json())
        .then((res) => {
          setData(res)
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
