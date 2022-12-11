import { Link } from 'react-router-dom'
import { INewCard } from '../NewItem'
interface INewCardComponentProps {
  new: INewCard
}

export function NewCardComponent(props: INewCardComponentProps) {
  return (
    <Link to={props.new.id}>
      <div className='flex flex-col'>
        <img src={props.new.imgUrl} className='w-full h-40' alt='imgUrl' />
        <div className='font-bold'>{props.new.title}</div>
        <div className='text-sm'>{props.new.description}</div>
      </div>
    </Link>
  )
}
