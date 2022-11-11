import React from 'react'
import { VideoCardComponent } from '~root/components/VideoCard'
import { useFetch } from '~hooks/useFetch'
import { IGetVideosResponse } from '~interfaces/GetVideosResponse.interface'
import RoundedLoading from '~root/components/RoundedLoading/RoundedLoading'
import { useSearchParams } from 'react-router-dom'

export function VideosScreen() {
  const [res, run] = useFetch<IGetVideosResponse>()

  const [searchParams] = useSearchParams()
  const searchText = searchParams.get('q') ?? 'ted'

  React.useEffect(() => {
    if (searchText && searchText.length > 0) {
      run({
        url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/getVideos',
        method: 'POST',
        body: { text: searchText },
      })
    }
  }, [run, searchText])

  return (
    <>
      {res.isLoading && <RoundedLoading expandToFullParent />}
      {res.data && (
        <div className='grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-4 '>
          {res.data?.result.map((video, index) => {
            return <VideoCardComponent video={video} key={index} />
          })}
        </div>
      )}
      {res.error && <div>{res.error}</div>}
    </>
  )
}
