import { useParams } from 'react-router-dom'
import { IFolder } from '../YourLibraryScreen'
import React from 'react'
import { useFetch } from '~hooks/useFetch'
import RoundedLoading from '~root/components/RoundedLoading/RoundedLoading'
import { FlipCardContainerComponent } from '~root/components/FlipCard/FlipCardContainer'
import FolderDetails__Header from './Header'
import FolderDetails__WordList from './WordList'
import FolderDetails__CreateWord from './CreateWord'

export interface IGetFolderDetailsResponse {
  data: IFolder
}

export function FolderDetails() {
  const { id } = useParams()
  const numberId = Number(id)

  const [resGetFolderDetails, runGetFolderDetails] = useFetch<IGetFolderDetailsResponse>()

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

  return (
    <div>
      {resGetFolderDetails.isLoading && (
        <div className='pt-20'>
          <RoundedLoading expandToFullParent />
        </div>
      )}
      {resGetFolderDetails.data && (
        <>
          <div className='grid grid-flow-row gap-9 px-16 py-8 relative max-w-[54rem]'>
            <FolderDetails__Header
              folderId={numberId}
              resGetFolderDetails={resGetFolderDetails.data}
              getFolderDetails={getFolderDetails}
            />
            {resGetFolderDetails.data.data.words?.length ? (
              <div className='px-16'>
                <FlipCardContainerComponent words={resGetFolderDetails.data?.data?.words ?? []} />
              </div>
            ) : undefined}

            <FolderDetails__WordList
              getFolderDetails={getFolderDetails}
              words={resGetFolderDetails.data?.data?.words ?? []}
            />
          </div>

          <FolderDetails__CreateWord folderId={numberId} getFolderDetails={getFolderDetails} />
        </>
      )}
    </div>
  )
}
