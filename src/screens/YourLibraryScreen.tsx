import { ButtonComponent } from '~root/components/Button'
import { FolderCardComponent } from '~root/components/FolderCard'
import * as Icons from 'react-icons/hi'

export interface IFolder {
  id: string
  name: string
  countSet: number
  owner: string
}

const folders: IFolder[] = [
  { id: '1', name: 'Vocabulary', countSet: 19, owner: 'BaoTien' },
  { id: '2', name: 'Grammar', countSet: 12, owner: 'BaoTien' },
  { id: '3', name: 'Idioms', countSet: 3, owner: 'BaoTien' },
]

export function YourLibraryScreen() {
  const handleAddBtnClick = () => {}
  return (
    <div className='px-16 py-8 flex flex-col gap-3'>
      <div className='flex justify-end' onClick={handleAddBtnClick}>
        <ButtonComponent icon={<Icons.HiOutlineFolderAdd size={24} />} text='Create Folder' />
      </div>
      {folders.map((folder) => {
        return <FolderCardComponent folder={folder} key={folder.id} />
      })}
    </div>
  )
}
