import React from 'react'
import { VideoCardComponent } from '~root/components/VideoCard'
import { useFetch } from '~hooks/useFetch'
import { IGetVideosResponse } from '~interfaces/GetVideosResponse.interface'

export function VideosScreen() {
  const [res, run] = useFetch<IGetVideosResponse>()

  React.useEffect(() => {
    run({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/getVideos',
      method: 'GET',
    })
  }, [run])

  return (
    <div className='grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-4'>
      {res.data?.result.map((video) => {
        return <VideoCardComponent video={video} />
      })}
    </div>
  )
}
