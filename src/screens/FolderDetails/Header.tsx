import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as FiIcons from 'react-icons/fi'
import { FormDialogOneTextFieldComponent } from '~root/components/FormDialogOneTextField'
import { useFetch } from '~root/hooks/useFetch'
import { IGetFolderDetailsResponse } from '.'

interface IFolderDetails__Header {
  resGetFolderDetails?: IGetFolderDetailsResponse
  folderId: number
  getFolderDetails: () => void
}

export default function FolderDetails__Header(props: IFolderDetails__Header) {
  const [resUpdate, runUpdate] = useFetch<boolean>()
  const [openEditFolderForm, setOpenEditFolderForm] = React.useState(false)
  const [textFieldValueFolderForm, setTextFieldValueFolderForm] = React.useState(
    props.resGetFolderDetails?.data?.name,
  )

  const handleEditFolder = () => {
    runUpdate({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/updateFolder',
      method: 'POST',
      body: { id: props.folderId, name: textFieldValueFolderForm },
      callBackOnSuccess: () => {
        props.getFolderDetails()
        setOpenEditFolderForm(false)
      },
    })
  }

  return (
    <>
      <div>
        <div className='text-sm flex gap-10'>
          <div className='font-semibold'>19 items</div>
          <div>
            <span className='text-system-placeholder'>created by </span>
            {/* <span className='text-system-highlight font-semibold'>{folder.owner}</span> */}
          </div>
        </div>
        <div className='flex gap-3 items-center'>
          <FiIcons.FiFolder size={50} className='text-system-placeholder'></FiIcons.FiFolder>
          <div className='text-4xl font-bold'>{props.resGetFolderDetails?.data.name}</div>
          <AiIcons.AiOutlineEdit
            size={30}
            className='cursor-pointer hover:text-system-highlight'
            onClick={() => {
              setOpenEditFolderForm(true)
              setTextFieldValueFolderForm(props.resGetFolderDetails?.data.name)
            }}
          ></AiIcons.AiOutlineEdit>
        </div>
      </div>
      {/* Edit Folder */}
      <FormDialogOneTextFieldComponent
        open={openEditFolderForm}
        setOpen={setOpenEditFolderForm}
        handleBtnClick={handleEditFolder}
        title='Edit folder'
        nameSubmitBtn='Save'
        res={resUpdate}
        label='Title'
        value={textFieldValueFolderForm}
        setValue={setTextFieldValueFolderForm}
      />
    </>
  )
}
