import React from 'react'
import * as Icons from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useFetch } from '~root/hooks/useFetch'
import { IFolder } from '~root/screens/YourLibraryScreen'
import RoundedLoading from '../RoundedLoading/RoundedLoading'

interface IFolderCardComponentProps {
  folder: IFolder
  getAllFolders: () => void
}

export function FolderCardComponent(props: IFolderCardComponentProps) {
  const [res, run] = useFetch<boolean>()

  const handleDeleteFolder = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    console.log(123)
    event.preventDefault()
    run({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/deleteFolder',
      method: 'POST',
      body: { id: props.folder.id },
      callBackOnSuccess: () => {
        props.getAllFolders()
      },
    })
  }
  return (
    <Link to={props.folder.id.toString()}>
      {/* <div> */}
      <div className='relative flex flex-col justify-center px-5 bg-system-card shadow-system-card rounded-system-default h-20 w-full border-b-4 border-transparent hover:border-system-bottom'>
        <div className='text-xl font-bold'>{props.folder.name}</div>
        <div className='font-semibold text-sm text-system-disable'>19 terms</div>
        <div className='absolute right-3 bottom-3 z-10'>
          {res.isLoading ? (
            <RoundedLoading />
          ) : (
            <Icons.AiOutlineDelete size={24} onClick={handleDeleteFolder}></Icons.AiOutlineDelete>
          )}
        </div>
      </div>
      {/* </div> */}
    </Link>
  )
}
