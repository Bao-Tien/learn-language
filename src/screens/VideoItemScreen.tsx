import React from 'react'
import YouTubePlayer from 'react-player/youtube'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { useFetch } from '~root/hooks/useFetch'
import { IGetVideoInfoResponse } from '~interfaces/GetVideoInfoResponse.interface'
import RoundedLoading from '~root/components/RoundedLoading/RoundedLoading'
import { CaptionCardComponent } from '~root/components/CaptionCard'
import * as IconsTi from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import { OnProgressProps } from 'react-player/base'

const SDiv_VideoContainer = styled.div`
  div {
    width: 100% !important;
  }
  border-radius: 0.5rem;
  overflow: hidden;
`

export interface IVideoPlayerState {
  isPlaying: boolean
  playedSeconds: number
}

const DEFAULT_VIDEO_PLAYER_STATE = { isPlaying: false, playedSeconds: 0 }

export const VideoItemScreen = () => {
  //const [isPlaying, setIsPlaying] = React.useState(false)
  const [searchParams] = useSearchParams()
  const videoId = searchParams.get('v') ?? ''
  const [res, run] = useFetch<IGetVideoInfoResponse>()
  const [videoState, setVideoState] = React.useState<IVideoPlayerState>(DEFAULT_VIDEO_PLAYER_STATE)
  const navigate = useNavigate()
  const videoPlayerRef = React.useRef<YouTubePlayer>(null)

  React.useEffect(() => {
    if (videoId && videoId.length > 0) {
      run({
        url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/getVideoInfo',
        method: 'POST',
        body: { videoId },
      })
    }
  }, [run, videoId])

  const handleOnProgress = (state: OnProgressProps) => {
    setVideoState((prev) => ({ ...prev, playedSeconds: state.playedSeconds }))
  }

  return (
    <div className='fixed grid grid-cols-4 bg-system-videoItem py-10'>
      <div className='m-10 col-span-2'>
        <SDiv_VideoContainer className='relative'>
          <YouTubePlayer
            ref={videoPlayerRef}
            controls={true}
            onProgress={handleOnProgress}
            progressInterval={300}
            playing={videoState.isPlaying}
            url={`https://www.youtube.com/watch?v=${videoId}`}
          />
          <div
            onClick={() =>
              setVideoState((prevState) => ({ ...prevState, isPlaying: !prevState.isPlaying }))
            }
            className='absolute top-0 left-0 w-full h-full bg-transparent'
          ></div>
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

      <div className='col-span-2'>
        <div className='absolute top-5 right-10 cursor-pointer hover:text-white'>
          <IconsTi.TiDeleteOutline size={50} onClick={() => navigate(-1)}></IconsTi.TiDeleteOutline>
        </div>
        <div className='mt-10'>
          <CaptionCardComponent
            videoState={videoState}
            setVideoState={setVideoState}
            videoUrl={videoId}
            videoPlayerRefCurrent={videoPlayerRef.current}
          />
        </div>
      </div>
    </div>
  )
}
