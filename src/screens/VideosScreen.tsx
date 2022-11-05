import React from 'react'
import { VideoCardComponent } from '~root/components/VideoCard'
import { useFetch } from '~hooks/useFetch'
import { IGetVideosResponse } from '~interfaces/GetVideosResponse.interface'
import { SearchInputContext } from '~root/contexts/SearchInputContext'

export function VideosScreen() {
  const { searchInput } = React.useContext(SearchInputContext)
  const [res, run] = useFetch<IGetVideosResponse>()

  React.useEffect(() => {
    run({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/getVideos',
      method: 'POST',
      body: { text: searchInput },
    })
  }, [run, searchInput])

  return (
    <div className='grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-4'>
      {res.data?.result.map((video, index) => {
        return <VideoCardComponent video={video} key={index} />
      })}
    </div>
  )
}
