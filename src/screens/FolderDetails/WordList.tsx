import { WordComponent } from '~root/components/Word'
import { IWord } from '../YourLibraryScreen'

interface IFolderDetails__WordList {
  words: IWord[]
  getFolderDetails: () => void
}

export default function FolderDetails__WordList(props: IFolderDetails__WordList) {
  return (
    <div className='flex flex-col gap-2'>
      {props.words?.map((word) => {
        return <WordComponent key={word.id} word={word} getFolderDetails={props.getFolderDetails} />
      })}
    </div>
  )
}
