import * as Icons from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { IFolder } from '~root/screens/YourLibraryScreen'

interface IFolderCardComponentProps {
  folder: IFolder
}

export function FolderCardComponent(props: IFolderCardComponentProps) {
  return (
    <Link to={props.folder.id}>
      <div className='flex flex-col justify-center px-5 bg-system-card shadow-system-card rounded-system-default h-20 w-9/12 border-b-4 border-transparent hover:border-system-bottom '>
        <div className='font-semibold text-sm'>{props.folder.countSet} sets</div>
        <div className='flex items-center gap-3 overflow-hidden text-ellipsis'>
          <Icons.FiFolder size={24} className='text-system-disable'></Icons.FiFolder>
          <div className='text-xl font-bold'>{props.folder.name}</div>
        </div>
      </div>
    </Link>
  )
}
