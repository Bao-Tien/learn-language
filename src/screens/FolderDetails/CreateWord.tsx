import React from 'react'
import { ButtonComponent } from '~root/components/Button'
import { FormDialogTwoTextFieldComponent } from '~root/components/FormDialogTwoTextField'
import * as IconsFi from 'react-icons/fi'

interface IFolderDetails__CreateWord {
  folderId: number
  getFolderDetails: () => void
}

export default function FolderDetails__CreateWord(props: IFolderDetails__CreateWord) {
  const [openCreateWordForm, setOpenCreateWordForm] = React.useState(false)
  return (
    <>
      <div
        className='absolute bottom-16 right-16'
        onClick={() => {
          setOpenCreateWordForm(true)
        }}
      >
        <ButtonComponent text='Add item' icon={<IconsFi.FiPlusCircle size={24} />} />
      </div>

      <FormDialogTwoTextFieldComponent
        open={openCreateWordForm}
        setOpen={setOpenCreateWordForm}
        title='Add item'
        nameSubmitBtn='Add'
        formType='create-word'
        getFolderDetails={props.getFolderDetails}
        folderId={props.folderId}
      />
    </>
  )
}
