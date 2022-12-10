import { IWord } from '~root/screens/YourLibraryScreen'
import * as Icons from 'react-icons/ai'
import { useFetch } from '~root/hooks/useFetch'
import RoundedLoading from '../RoundedLoading/RoundedLoading'
import React from 'react'
import { FormDialogTwoTextFieldComponent } from '../FormDialogTwoTextField'

interface IWordComponentProps {
  word: IWord
  getFolderDetails: () => void
}

export function WordComponent(props: IWordComponentProps) {
  const [resDeleteWord, runDeleteWord] = useFetch<boolean>()
  const [openEditWordForm, setOpenEditWordForm] = React.useState(false)

  const handleDeleteWord = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.preventDefault()
    runDeleteWord({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/deleteWord',
      method: 'POST',
      body: { wordId: props.word?.id },
      callBackOnSuccess: () => {
        props.getFolderDetails()
      },
    })
  }

  return (
    <div className='flex lg:w-3/4 h-full bg-system-card rounded-sm shadow-system-card p-4'>
      <div className='flex-1 flex'>
        <div className='w-2/5 border-r-2 border-system-card'>
          <div>{props.word?.front}</div>
          {props.word.frontImageUrl && (
            <div>
              <img src={props.word.frontImageUrl} className='max-h-[10rem]' />
            </div>
          )}
        </div>
        <div className='w-3/5 pl-8'>
          <div>{props.word?.back}</div>
          {props.word.backImageUrl && (
            <div>
              <img src={props.word.backImageUrl} className='max-h-[10rem]' />
            </div>
          )}
        </div>
      </div>
      {/* Edit Word */}
      <div className='flex gap-4'>
        <Icons.AiOutlineSound
          size={24}
          className='cursor-pointer hover:text-system-highlight'
        ></Icons.AiOutlineSound>
        <Icons.AiOutlineEdit
          size={24}
          className='cursor-pointer hover:text-system-highlight'
          onClick={() => {
            setOpenEditWordForm(true)
          }}
        ></Icons.AiOutlineEdit>

        <FormDialogTwoTextFieldComponent
          open={openEditWordForm}
          setOpen={setOpenEditWordForm}
          title='Edit item'
          nameSubmitBtn='Save'
          formType='edit-word'
          getFolderDetails={props.getFolderDetails}
          word={props.word}
        />
        {/* Delete Word */}
        {resDeleteWord.isLoading ? (
          <RoundedLoading />
        ) : (
          <Icons.AiOutlineDelete
            size={24}
            className='cursor-pointer hover:text-system-highlight'
            onClick={handleDeleteWord}
          ></Icons.AiOutlineDelete>
        )}
      </div>
    </div>
  )
}
