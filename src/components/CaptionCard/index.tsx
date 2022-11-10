import { useFetch } from '~root/hooks/useFetch'
import { IGetVideoCaptionResponse } from '~interfaces/GetVideoCaptionResponse.interface'
import React from 'react'
import RoundedLoading from '../RoundedLoading/RoundedLoading'
import { IVideoPlayerState } from '~root/screens/VideoItemScreen'
import classNames from 'classnames'
import YouTubePlayer from 'react-player/youtube'

interface ICaptionCardComponentProps {
  videoId?: string | ''
  videoState: IVideoPlayerState
  setVideoState: React.Dispatch<React.SetStateAction<IVideoPlayerState>>
  videoPlayerRefCurrent: YouTubePlayer | null
}

export function CaptionCardComponent(props: ICaptionCardComponentProps) {
  const [res, run] = useFetch<IGetVideoCaptionResponse>()
  const currentHighlightSentenceRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (props.videoId && props.videoId.length > 0) {
      run({
        url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/getVideoCaption',
        method: 'POST',
        body: { videoId: props.videoId },
      })
    }
  }, [run, props.videoId])

  React.useEffect(() => {
    if (currentHighlightSentenceRef.current) {
      currentHighlightSentenceRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    }
  }, [currentHighlightSentenceRef.current])

  return (
    <>
      <div className='max-h-screen overflow-auto flex flex-col gap-10'>
        {res.error && <div>{res.error}</div>}
        {res.isLoading && <RoundedLoading expandToFullParent />}
        {res.data?.segments.map((segment, index) => {
          const isHighlighted =
            Number(segment.startMs) <= props.videoState.playedSeconds * 1000 &&
            props.videoState.playedSeconds * 1000 < Number(segment.endMs)
          return (
            <div
              className={classNames(
                'relative rounded-sm font-bold text-5xl text-system-caption mr-10 cursor-pointer',
                {
                  'text-yellow-300': isHighlighted,
                },
              )}
              key={index}
              onClick={() => {
                props.videoPlayerRefCurrent?.seekTo(Number(segment.startMs) / 1000)
                props.setVideoState((prev) => ({ ...prev, isPlaying: true }))
              }}
            >
              {segment.text}
              {isHighlighted && (
                <div className='absolute top-[calc(50%+4rem)] left-0 bg-transparent w-full h-8'>
                  <div className='relative' ref={currentHighlightSentenceRef}></div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
