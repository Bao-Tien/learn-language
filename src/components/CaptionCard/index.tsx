import { useFetch } from '~root/hooks/useFetch'
import { IGetVideoCaptionResponse } from '~interfaces/GetVideoCaptionResponse.interface'
import React from 'react'
import RoundedLoading from '../RoundedLoading/RoundedLoading'
import { IVideoPlayerState } from '~root/screens/VideoItemScreen'
import classNames from 'classnames'
import YouTubePlayer from 'react-player/youtube'

interface ICaptionCardComponentProps {
  videoUrl?: string | ''
  videoState: IVideoPlayerState
  setVideoState: React.Dispatch<React.SetStateAction<IVideoPlayerState>>
  videoPlayerRefCurrent: YouTubePlayer | null
}

export function CaptionCardComponent(props: ICaptionCardComponentProps) {
  const [res, run] = useFetch<IGetVideoCaptionResponse>()

  React.useEffect(() => {
    console.log(props.videoUrl)
    if (props.videoUrl && props.videoUrl.length > 0) {
      run({
        url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/getVideoCaption',
        method: 'POST',
        body: { videoUrl: props.videoUrl },
      })
    }
  }, [run, props.videoUrl])

  // console.log(props.videoState)
  // console.log(res.data?.segments)

  return (
    <div className='max-h-screen overflow-auto flex flex-col gap-10'>
      {res.error && <div>{res.error}</div>}
      {res.isLoading && <RoundedLoading expandToFullParent />}
      {res.data?.segments.map((segment, index) => (
        <div
          className={classNames(
            'rounded-sm font-bold text-5xl text-system-caption mr-10 cursor-pointer',
            {
              'text-yellow-300':
                Number(segment.startMs) <= props.videoState.playedSeconds * 1000 &&
                props.videoState.playedSeconds * 1000 < Number(segment.endMs),
            },
          )}
          key={index}
          onClick={() => {
            props.videoPlayerRefCurrent?.seekTo(Number(segment.startMs) / 1000)
            props.setVideoState((prev) => ({ ...prev, isPlaying: true }))
          }}
        >
          {segment.text}
        </div>
      ))}
    </div>
  )
}
