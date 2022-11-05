import React from 'react'

// type lon hon interface

type TRequestMethod = 'GET' | 'POST' | 'PUT'

type TUseFetchReturn<T> = [
  { data?: T; isLoading: boolean; error: string },
  (params: { url: string; method: TRequestMethod; body: object }) => void,
]

export function useFetch<ResponseType = any>(): TUseFetchReturn<ResponseType> {
  const [data, setData] = React.useState<ResponseType>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const run = React.useCallback(
    (params: { url: string; method: TRequestMethod; body: object }) => {
      setIsLoading(true)
      fetch(params.url, {
        method: params.method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params.body),
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
