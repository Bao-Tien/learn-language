import { IWord } from '~root/screens/YourLibraryScreen'
import * as Icons from 'react-icons/ai'

interface IWordComponentProps {
  words?: IWord[]
}

export function WordsComponent(props: IWordComponentProps) {
  return (
    <div className='flex flex-col gap-2'>
      {props.words?.map((word) => (
        <div
          key={word.id}
          className='flex lg:w-3/4 h-14 bg-system-card rounded-sm shadow-system-card p-4'
        >
          <div className='flex-1 flex'>
            <div className='w-2/5 border-r-2 border-system-card'>{word.front}</div>
            <div className='w-3/5 pl-8'>{word.back}</div>
          </div>
          <div className='flex gap-4'>
            <Icons.AiOutlineSound size={24} className='cursor-pointer'></Icons.AiOutlineSound>
            <Icons.AiOutlineEdit size={24} className='cursor-pointer'></Icons.AiOutlineEdit>
          </div>
        </div>
      ))}
    </div>
  )
}
