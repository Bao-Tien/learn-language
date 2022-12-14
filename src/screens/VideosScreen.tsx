import React from 'react'
import { VideoCardComponent } from '~root/components/VideoCard'
import { useFetch } from '~hooks/useFetch'
import { IGetVideosResponse } from '~interfaces/GetVideosResponse.interface'
import RoundedLoading from '~root/components/RoundedLoading/RoundedLoading'
import { useSearchParams } from 'react-router-dom'
import { HeaderComponent } from '~root/components/Header'
import classNames from 'classnames'

export function VideosScreen() {
  const headerClassNames = 'left-[4.5rem] w-[calc(100vw-4.5rem)]'
  const headerLgClassNames = 'lg:left-[15rem] lg:w-[calc(100vw-15rem)]'

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
      <div className={classNames('fixed top-0 h-16 z-10', headerClassNames, headerLgClassNames)}>
        <HeaderComponent />
      </div>

      {res.isLoading && (
        <div className='pt-20'>
          <RoundedLoading expandToFullParent />
        </div>
      )}
      {res.data && (
        <div className='py-16 grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-4 '>
          {res.data?.result.map((video, index) => {
            return <VideoCardComponent video={video} key={index} />
          })}
        </div>
      )}
      {res.error && <div>{res.error}</div>}
    </>
  )
}
