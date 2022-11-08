import { useFetch } from '~root/hooks/useFetch'
import { IGetVideoCaptionResponse } from '~interfaces/GetVideoCaptionResponse.interface'
import React from 'react'
import RoundedLoading from '../RoundedLoading/RoundedLoading'

interface ICaptionCardComponentProps {
  videoUrl?: string | ''
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

  console.log(res)

  return (
    <div className='max-h-screen overflow-auto flex flex-col gap-2'>
      {res.error && <div>{res.error}</div>}
      {res.isLoading && <RoundedLoading expandToFullParent />}
      {res.data?.segments.map((segment) => (
        <div className='rounded-sm text-4xl text-system-caption'>{segment.text}</div>
      ))}
    </div>
  )
}
