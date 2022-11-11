import * as Icons from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { ISet } from '~root/screens/SetsScreen'

interface ISetCardComponentProps {
  set: ISet
}

export function SetCardComponent(props: ISetCardComponentProps) {
  return (
    <Link to={props.set.id}>
      <div className='flex flex-col justify-center px-5 bg-system-card shadow-system-card rounded-system-default h-28 w-9/12 border-b-4 border-transparent hover:border-system-bottom'>
        <div className='text-xl font-bold'>{props.set.name}</div>
        <div className='font-semibold text-sm text-system-disable'>{props.set.terms} terms</div>
        <div className='flex items-center justify-between overflow-hidden text-ellipsis'>
          <div className='font-semibold text-sm'>{props.set.owner}</div>
          <Icons.AiOutlineDelete size={24}></Icons.AiOutlineDelete>
        </div>
      </div>
    </Link>
  )
}
