import { useParams } from 'react-router-dom'
import { SetCardComponent } from '~root/components/SetCard'
import { IFolder } from './YourLibraryScreen'
import * as Icons from 'react-icons/fi'

export interface ISet {
  id: string
  name: string
  terms: number
  owner: string
  folderId: string
}

const sets: ISet[] = [
  { id: '1', name: 'Từ vựng TOIEC - Thẻ 1', terms: 20, owner: 'BaoTien', folderId: '1' },
  { id: '2', name: 'Từ vựng TOIEC - Thẻ 2', terms: 20, owner: 'BaoAn', folderId: '1' },
  { id: '3', name: 'Từ vựng TOIEC - Thẻ 3', terms: 20, owner: 'BaoMinh', folderId: '1' },
  { id: '4', name: 'Từ vựng IELTS - Thẻ 1', terms: 20, owner: 'BaoToan', folderId: '1' },
  { id: '5', name: 'Từ vựng IELTS - Thẻ 2', terms: 20, owner: 'BaoTam', folderId: '1' },
  { id: '6', name: 'Từ vựng IELTS - Thẻ 3', terms: 20, owner: 'BaoBao', folderId: '1' },
  { id: '7', name: 'Câu điều kiện', terms: 20, owner: 'BaoTien', folderId: '2' },
  { id: '8', name: 'Thì hiện tại đơn', terms: 20, owner: 'BaoAn', folderId: '2' },
  { id: '9', name: 'Thì hiện tại tiếp diễn', terms: 20, owner: 'BaoMinh', folderId: '2' },
  { id: '10', name: 'Thì quá khứ đơn', terms: 20, owner: 'BaoToan', folderId: '2' },
]

const folders: IFolder[] = [
  { id: '1', name: 'Vocabulary', countSet: 19, owner: 'BaoTien' },
  { id: '2', name: 'Grammar', countSet: 12, owner: 'BaoTien' },
  { id: '3', name: 'Idioms', countSet: 3, owner: 'BaoTien' },
]

export function SetsScreen() {
  const { id } = useParams()
  return (
    <div className='grid grid-flow-row gap-9 px-16 py-8'>
      <div>
        {folders.map((folder) => {
          return (
            id === folder.id && (
              <>
                <div className='text-sm flex gap-10'>
                  <div className='font-semibold'>{folder.countSet} sets</div>
                  <div>
                    <span className='text-system-placeholder'>created by </span>
                    <span className='text-system-highlight font-semibold'>{folder.owner}</span>
                  </div>
                </div>
                <div className='flex gap-3 items-center'>
                  <Icons.FiFolder size={50} className='text-system-placeholder'></Icons.FiFolder>
                  <div className='text-4xl font-bold'>{folder.name}</div>
                </div>
              </>
            )
          )
        })}
      </div>
      <div className='grid grid-cols-2 gap-3'>
        {sets.map((set) => {
          return id === set.folderId && <SetCardComponent key={set.id} set={set} />
        })}
      </div>
    </div>
  )
}
