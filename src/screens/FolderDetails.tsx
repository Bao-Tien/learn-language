import { useParams } from 'react-router-dom'
import * as IconsFi from 'react-icons/fi'
import * as IconsAi from 'react-icons/ai'
import { IFolder } from './YourLibraryScreen'
import React from 'react'
import { useFetch } from '~hooks/useFetch'
import { WordComponent } from '~root/components/Word'
import RoundedLoading from '~root/components/RoundedLoading/RoundedLoading'
import { ButtonComponent } from '~root/components/Button'
import { FormDialogOneTextFieldComponent } from '~root/components/FormDialogOneTextField'
import { FormDialogTwoTextFieldComponent } from '~root/components/FormDialogTwoTextField'

interface IGetFolderDetailsResponse {
  data: IFolder
}

export function FolderDetails() {
  const { id } = useParams()
  const numberId = Number(id)
  const [openEditFolderForm, setOpenEditFolderForm] = React.useState(false)
  const [openCreateWordForm, setOpenCreateWordForm] = React.useState(false)
  const [textFieldValueWordFront, setTextFieldValueWordFront] = React.useState('')
  const [textFieldValueWordBack, setTextFieldValueWordBack] = React.useState('')

  const [resGetFolderDetails, runGetFolderDetails] = useFetch<IGetFolderDetailsResponse>()
  const [resUpdate, runUpdate] = useFetch<boolean>()

  const getFolderDetails = React.useCallback(() => {
    runGetFolderDetails({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/getFolderDetails',
      method: 'POST',
      body: { folderId: numberId },
    })
  }, [runGetFolderDetails, numberId])

  React.useEffect(() => {
    getFolderDetails()
  }, [getFolderDetails])
  const [textFieldValueFolderForm, setTextFieldValueFolderForm] = React.useState(
    resGetFolderDetails.data?.data.name,
  )

  const handleEditFolder = () => {
    runUpdate({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/updateFolder',
      method: 'POST',
      body: { id: numberId, name: textFieldValueFolderForm },
      callBackOnSuccess: () => {
        getFolderDetails()
        setOpenEditFolderForm(false)
      },
    })
  }

  const handleCreateWord = () => {
    runUpdate({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/createWord',
      method: 'POST',
      body: { front: textFieldValueWordFront, back: textFieldValueWordBack, folderId: numberId },
      callBackOnSuccess: () => {
        getFolderDetails()
        setOpenCreateWordForm(false)
      },
    })
  }

  return (
    <div className=''>
      {resGetFolderDetails.isLoading && <RoundedLoading expandToFullParent />}
      <div className='grid grid-flow-row gap-9 px-16 py-8 relative'>
        <div>
          <div className='text-sm flex gap-10'>
            <div className='font-semibold'>19 items</div>
            <div>
              <span className='text-system-placeholder'>created by </span>
              {/* <span className='text-system-highlight font-semibold'>{folder.owner}</span> */}
            </div>
          </div>
          <div className='flex gap-3 items-center'>
            <IconsFi.FiFolder size={50} className='text-system-placeholder'></IconsFi.FiFolder>
            <div className='text-4xl font-bold'>{resGetFolderDetails.data?.data.name}</div>
            <IconsAi.AiOutlineEdit
              size={30}
              className='cursor-pointer hover:text-system-highlight'
              onClick={() => {
                setOpenEditFolderForm(true)
                setTextFieldValueFolderForm(resGetFolderDetails.data?.data.name)
              }}
            ></IconsAi.AiOutlineEdit>
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

        {/* Show words */}
        <div className='flex flex-col gap-2'>
          {resGetFolderDetails.data?.data.words?.map((word) => {
            return <WordComponent key={word.id} word={word} getFolderDetails={getFolderDetails} />
          })}
        </div>
      </div>

      {/* Create word */}
      <div
        className='absolute bottom-16 right-16'
        onClick={() => {
          setOpenCreateWordForm(true)
          setTextFieldValueWordBack('')
          setTextFieldValueWordFront('')
        }}
      >
        <ButtonComponent text='Add item' icon={<IconsFi.FiPlusCircle size={24} />} />
      </div>

      <FormDialogTwoTextFieldComponent
        open={openCreateWordForm}
        setOpen={setOpenCreateWordForm}
        handleBtnClick={handleCreateWord}
        title='Add item'
        nameSubmitBtn='Add'
        res={resUpdate}
        labelOne='Front'
        valueOne={textFieldValueWordFront}
        setValueOne={setTextFieldValueWordFront}
        labelTwo='Back'
        valueTwo={textFieldValueWordBack}
        setValueTwo={setTextFieldValueWordBack}
      />
    </div>
  )
}
