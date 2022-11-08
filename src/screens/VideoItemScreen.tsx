import React from 'react'
import ReactPlayer from 'react-player/youtube'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { useFetch } from '~root/hooks/useFetch'
import { IGetVideoInfoResponse } from '~interfaces/GetVideoInfoResponse.interface'
import RoundedLoading from '~root/components/RoundedLoading/RoundedLoading'
import { CaptionCardComponent } from '~root/components/CaptionCard'

const SDiv_VideoContainer = styled.div`
  div {
    width: 100% !important;
  }
`

export const VideoItemScreen = () => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [searchParams] = useSearchParams()
  const videoId = searchParams.get('v') ?? ''
  const [res, run] = useFetch<IGetVideoInfoResponse>()

  React.useEffect(() => {
    if (videoId && videoId.length > 0) {
      run({
        url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/getVideoInfo',
        method: 'POST',
        body: { videoId },
      })
    }
  }, [run, videoId])

  console.log(res)

  return (
    <div className='grid grid-cols-3 bg-system-videoItem py-10'>
      <div>
        <SDiv_VideoContainer>
          <ReactPlayer playing={isPlaying} url={`https://www.youtube.com/watch?v=${videoId}`} />
        </SDiv_VideoContainer>
        <div className='text-white'>
          {res.error && <div>{res.error}</div>}
          {res.isLoading && <RoundedLoading expandToFullParent />}
          {res.data && (
            <div className='px-5 py-2'>
              <div className='font-semibold text-xl'>{res.data.title}</div>
            </div>
          )}
        </div>
      </div>

      <div className='col-start-2 col-span-2'>
        <CaptionCardComponent videoUrl={res.data?.link} />
      </div>
    </div>
  )
}
