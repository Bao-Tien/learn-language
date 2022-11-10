import React from 'react'
import YouTubePlayer from 'react-player/youtube'
import styled from 'styled-components'
import { useFetch } from '~root/hooks/useFetch'
import { IGetVideoInfoResponse } from '~root/interfaces/GetVideoInfoResponse.interface'
import { IVideoPlayerState } from '~root/screens/VideoItemScreen'
import RoundedLoading from '../RoundedLoading/RoundedLoading'

const SDiv_VideoContainer = styled.div`
  div {
    width: 100% !important;
  }
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
`

interface IVideoListeningComponent {
  videoId: string
  videoPlayerRef: React.RefObject<YouTubePlayer>
  videoState: IVideoPlayerState
  setVideoState: React.Dispatch<React.SetStateAction<IVideoPlayerState>>
}

export function VideoListeningComponent(props: IVideoListeningComponent) {
  const [res, run] = useFetch<IGetVideoInfoResponse>()

  React.useEffect(() => {
    if (props.videoId && props.videoId.length > 0) {
      run({
        url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/getVideoInfo',
        method: 'POST',
        body: { videoId: props.videoId },
      })
    }
  }, [run, props.videoId])

  return (
    <>
      <SDiv_VideoContainer>
        <YouTubePlayer
          ref={props.videoPlayerRef}
          controls={true}
          onProgress={(state) =>
            props.setVideoState((prev) => ({ ...prev, playedSeconds: state.playedSeconds }))
          }
          progressInterval={300}
          playing={props.videoState.isPlaying}
          url={`https://www.youtube.com/watch?v=${props.videoId}`}
        />
        <div
          onClick={() =>
            props.setVideoState((prevState) => ({ ...prevState, isPlaying: !prevState.isPlaying }))
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
    </>
  )
}
