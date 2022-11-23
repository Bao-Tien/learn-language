import { ButtonComponent } from '~root/components/Button'
import { FolderCardComponent } from '~root/components/FolderCard'
import * as Icons from 'react-icons/hi'
import { useFetch } from '~root/hooks/useFetch'
import React from 'react'
import { FormDialogComponent } from '~root/components/FormDialog'
import RoundedLoading from '~root/components/RoundedLoading/RoundedLoading'

export interface IWord {
  id: 'number'
  front: 'string'
  back: 'string'
  folderId: 'number'
}
export interface IFolder {
  id: number
  name: string
  words?: IWord[]
}

interface IGetFoldersResponse {
  allFolders: IFolder[]
}

export function YourLibraryScreen() {
  const [open, setOpen] = React.useState(false)
  const [textFieldValue, setTextFieldValue] = React.useState('')
  const [resGetFolders, runGetFolders] = useFetch<IGetFoldersResponse>()
  const [resCreate, runCreate] = useFetch<boolean>()

  const getAllFolders = React.useCallback(() => {
    runGetFolders({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/getFolders',
      method: 'GET',
    })
  }, [runGetFolders])

  React.useEffect(() => {
    getAllFolders()
  }, [getAllFolders])

  const handleCreateBtnClick = () => {
    runCreate({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/createFolder',
      method: 'POST',
      body: { name: textFieldValue },
      callBackOnSuccess: () => {
        getAllFolders()
        setOpen(false)
      },
    })
  }

  return (
    <div className='px-16 py-8 flex flex-col gap-3'>
      <div className='flex justify-end' onClick={() => setOpen(true)}>
        <ButtonComponent icon={<Icons.HiOutlineFolderAdd size={24} />} text='Create folder' />
      </div>
      <FormDialogComponent
        open={open}
        setOpen={setOpen}
        textFieldValue={textFieldValue}
        setTextFieldValue={setTextFieldValue}
        handleBtnClick={handleCreateBtnClick}
        title='Create a new folder'
        lableTextField='Enter a title'
        nameSubmitBtn='Create Folder'
        res={resCreate}
      />
      {resGetFolders.isLoading && <RoundedLoading expandToFullParent />}
      <div className='grid lg:grid-cols-3 gap-5 md:grid-cols-2 ms:grid-cols-1'>
        {resGetFolders.data?.allFolders.map((folder) => {
          return (
            <FolderCardComponent folder={folder} key={folder.id} getAllFolders={getAllFolders} />
          )
        })}
      </div>
    </div>
  )
}
