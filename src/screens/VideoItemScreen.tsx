import React from 'react'
import YouTubePlayer from 'react-player/youtube'
import { useSearchParams } from 'react-router-dom'
import { CaptionCardComponent } from '~root/components/CaptionCard'
import * as IconsTi from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import { VideoListeningComponent } from '~root/components/VideoListening'

export interface IVideoPlayerState {
  isPlaying: boolean
  playedSeconds: number
}

const DEFAULT_VIDEO_PLAYER_STATE = { isPlaying: false, playedSeconds: 0 }

export const VideoItemScreen = () => {
  const [videoState, setVideoState] = React.useState<IVideoPlayerState>(DEFAULT_VIDEO_PLAYER_STATE)
  const navigate = useNavigate()
  const videoPlayerRef = React.useRef<YouTubePlayer>(null)

  const [searchParams] = useSearchParams()
  const videoId = searchParams.get('v') ?? ''

  return (
    <div className='relative h-full w-full'>
      {/* Btn Delete */}
      <div className='absolute top-5 right-10 cursor-pointer hover:text-white'>
        <IconsTi.TiDeleteOutline size={50} onClick={() => navigate(-1)}></IconsTi.TiDeleteOutline>
      </div>

      {/* Video */}
      <div className='grid grid-cols-2 bg-system-videoItem py-10'>
        <div className='m-10 col-span-1'>
          <VideoListeningComponent
            videoId={videoId}
            videoPlayerRef={videoPlayerRef}
            videoState={videoState}
            setVideoState={setVideoState}
          />
        </div>

        {/* Caption */}
        <div className='mt-20 col-span-1'>
          <CaptionCardComponent
            videoState={videoState}
            setVideoState={setVideoState}
            videoId={videoId}
            videoPlayerRefCurrent={videoPlayerRef.current}
          />
        </div>
      </div>
    </div>
  )
}
