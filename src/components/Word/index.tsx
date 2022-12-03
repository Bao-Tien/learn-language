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
  const [openEditWordForm, setOpenEditWordForm] = React.useState(false)
  const [resDeleteWord, runDeleteWord] = useFetch<boolean>()
  const [resUpdateWord, runUpdateWord] = useFetch<boolean>()
  const [textFieldValueWordFront, setTextFieldValueWordFront] = React.useState('')
  const [textFieldValueWordBack, setTextFieldValueWordBack] = React.useState('')
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
  const handleUpdateWord = () => {
    runUpdateWord({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/updateWord',
      method: 'POST',
      body: { id: props.word?.id, front: textFieldValueWordFront, back: textFieldValueWordBack },
      callBackOnSuccess: () => {
        props.getFolderDetails()
        setOpenEditWordForm(false)
      },
    })
  }
  return (
    <div className='flex lg:w-3/4 h-full bg-system-card rounded-sm shadow-system-card p-4'>
      <div className='flex-1 flex'>
        <div className='w-2/5 border-r-2 border-system-card'>{props.word?.front}</div>
        <div className='w-3/5 pl-8'>{props.word?.back}</div>
      </div>
      {/* Edit Word */}
      <div className='flex gap-4'>
        <Icons.AiOutlineSound
          size={24}
          className='cursor-pointer hover:text-system-highlight'
        ></Icons.AiOutlineSound>
        {resUpdateWord.isLoading ? (
          <RoundedLoading />
        ) : (
          <Icons.AiOutlineEdit
            size={24}
            className='cursor-pointer hover:text-system-highlight'
            onClick={() => {
              setOpenEditWordForm(true)
              setTextFieldValueWordFront(props.word.front)
              setTextFieldValueWordBack(props.word.back)
            }}
          ></Icons.AiOutlineEdit>
        )}
        <FormDialogTwoTextFieldComponent
          open={openEditWordForm}
          setOpen={setOpenEditWordForm}
          handleBtnClick={handleUpdateWord}
          title='Edit item'
          nameSubmitBtn='Save'
          res={resUpdateWord}
          labelOne='Front'
          valueOne={textFieldValueWordFront}
          setValueOne={setTextFieldValueWordFront}
          labelTwo='Back'
          valueTwo={textFieldValueWordBack}
          setValueTwo={setTextFieldValueWordBack}
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
