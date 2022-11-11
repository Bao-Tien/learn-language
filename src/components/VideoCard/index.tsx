import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { IYoutubeVideo } from '~interfaces/GetVideosResponse.interface'

interface IVideoCardComponentProps {
  video: IYoutubeVideo
}

const SDiv_Title_Container = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
`

export function VideoCardComponent(props: IVideoCardComponentProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({
      pathname: '/watch',
      search: `v=${props.video.id}&ab_channel=${props.video.channel.name}`,
    })
  }

  return (
    <div className='flex flex-col w-full cursor-pointer' onClick={handleClick}>
      <div className='relative w-full rounded-system-default overflow-hidden'>
        <img src={props.video.thumbnails[0].url} alt={props.video.title} className=''></img>
        <div className='absolute top-0 left-0 w-full h-full hover:bg-system-shaded-alpha-40'></div>
      </div>
      <div className='flex gap-2 mt-2'>
        <div className='w-10 h-10 '>
          <img
            src={props.video.channel.thumbnails[0].url}
            alt={props.video.channel.name}
            className='rounded-system-circle w-10 h-10'
          ></img>
        </div>
        <div className='flex-1'>
          <SDiv_Title_Container>{props.video.title}</SDiv_Title_Container>
          <div className='text-xs mt-1'>{props.video.channel.name}</div>
          <div className='flex gap-1 text-xs'>
            <span>{props.video.publishedTime}</span>
            <span>•</span>
            <span>{props.video.viewCount.short}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
