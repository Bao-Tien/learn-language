import { useParams } from 'react-router-dom'
import * as IconsFi from 'react-icons/fi'
import * as IconsAi from 'react-icons/ai'
import { IFolder } from './YourLibraryScreen'
import React from 'react'
import { useFetch } from '~hooks/useFetch'
import { WordsComponent } from '~root/components/Words'
import RoundedLoading from '~root/components/RoundedLoading/RoundedLoading'
import { FormDialogComponent } from '~root/components/FormDialog'

interface IGetFolderDetailsResponse {
  data: IFolder
}

export function FolderDetails() {
  const { id } = useParams()
  const numberId = Number(id)
  const [open, setOpen] = React.useState(false)

  const [resGetFolderDetails, runGetFolderDetails] = useFetch<IGetFolderDetailsResponse>()
  const [resUpdate, runUpdate] = useFetch<boolean>()

  const getFolderDetails = React.useCallback(() => {
    runGetFolderDetails({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/getFolderDetails',
      method: 'POST',
      body: { folderId: numberId },
    })
  }, [runGetFolderDetails])

  React.useEffect(() => {
    getFolderDetails()
  }, [getFolderDetails])
  const [textFieldValue, setTextFieldValue] = React.useState(resGetFolderDetails.data?.data.name)

  const handleEditFolder = () => {
    runUpdate({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/updateFolder',
      method: 'POST',
      body: { id: numberId, name: textFieldValue },
      callBackOnSuccess: () => {
        getFolderDetails()
        setOpen(false)
      },
    })
  }

  return (
    <>
      {resGetFolderDetails.isLoading && <RoundedLoading expandToFullParent />}
      <div className='grid grid-flow-row gap-9 px-16 py-8'>
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
              className='cursor-pointer'
              onClick={() => {
                setOpen(true)
                setTextFieldValue(resGetFolderDetails.data?.data.name)
              }}
            ></IconsAi.AiOutlineEdit>
          </div>
        </div>

        <FormDialogComponent
          open={open}
          setOpen={setOpen}
          textFieldValue={textFieldValue}
          setTextFieldValue={setTextFieldValue}
          handleBtnClick={handleEditFolder}
          title='Edit folder'
          lableTextField='Title'
          nameSubmitBtn='Save'
          res={resUpdate}
        />

        <WordsComponent words={resGetFolderDetails.data?.data.words} />
      </div>
    </>
  )
}
