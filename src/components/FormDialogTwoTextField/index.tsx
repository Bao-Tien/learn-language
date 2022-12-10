import React, { SetStateAction } from 'react'
import { useFetch } from '~root/hooks/useFetch'
import { FormDialogComponent } from '../FormDialog'
import { TextFieldComponent } from '../TextField'
import axios from 'axios'
import { IWord } from '~root/screens/YourLibraryScreen'
import RoundedLoading from '../RoundedLoading/RoundedLoading'

interface IGetUploadUrlResponse {
  uploadUrl: string
  imageUrl: string
}

interface IFormDialogTwoTextFieldComponentProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  nameSubmitBtn: string
  getFolderDetails: () => void
  folderId?: number
  formType: 'edit-word' | 'create-word'
  word?: IWord
}

interface IUploadedUrls {
  frontImageUrl: undefined | string
  backImageUrl: undefined | string
}

export function FormDialogTwoTextFieldComponent(props: IFormDialogTwoTextFieldComponentProps) {
  const [resGetUploadUrl, runGetUploadUrl] = useFetch<IGetUploadUrlResponse>()
  const [uploadedUrls, setUploadedUrls] = React.useState<IUploadedUrls>({
    frontImageUrl: undefined,
    backImageUrl: undefined,
  })

  const [textFieldValueWordFront, setTextFieldValueWordFront] = React.useState('')
  const [textFieldValueWordBack, setTextFieldValueWordBack] = React.useState('')
  const [resCreateWord, runCreateWord] = useFetch<boolean>()
  const [resUpdateWord, runUpdateWord] = useFetch<boolean>()
  const [isUploadingFrontImage, setIsUploadingFrontImage] = React.useState(false)
  const [isUploadingBackImage, setIsUploadingBackImage] = React.useState(false)

  const handleCreateWord = () => {
    runCreateWord({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/createWord',
      method: 'POST',
      body: {
        front: textFieldValueWordFront,
        back: textFieldValueWordBack,
        frontImageUrl: uploadedUrls.frontImageUrl,
        backImageUrl: uploadedUrls.backImageUrl,
        folderId: props.folderId,
      },
      callBackOnSuccess: () => {
        props.getFolderDetails()
        props.setOpen(false)
      },
    })
  }
  const handleUpdateWord = () => {
    runUpdateWord({
      url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/updateWord',
      method: 'POST',
      body: {
        id: props.word?.id,
        front: textFieldValueWordFront,
        frontImageUrl: uploadedUrls.frontImageUrl,
        backImageUrl: uploadedUrls.backImageUrl,
        back: textFieldValueWordBack,
      },
      callBackOnSuccess: () => {
        props.getFolderDetails()
        props.setOpen(false)
      },
    })
  }

  const uploadImage = React.useCallback(
    (selectedImage: File, imagePosition: 'back' | 'front') => {
      if (selectedImage) {
        if (imagePosition === 'front') {
          setIsUploadingFrontImage(true)
        }
        if (imagePosition === 'back') {
          setIsUploadingBackImage(true)
        }
        runGetUploadUrl({
          url: 'https://vqqzt9nxi7.execute-api.ap-southeast-1.amazonaws.com/dev/getUploadUrl',
          method: 'POST',
          body: { contentType: selectedImage?.type },
          callBackOnSuccess: async (data) => {
            const uploadResult = await axios.put(data.uploadUrl, selectedImage, {
              headers: { 'Content-Type': selectedImage.type },
            })
            if (uploadResult.status === 200) {
              setUploadedUrls((prev) => {
                const newState = { ...prev }
                switch (imagePosition) {
                  case 'front': {
                    newState.frontImageUrl = data.imageUrl
                    break
                  }
                  case 'back': {
                    newState.backImageUrl = data.imageUrl
                    break
                  }
                }
                return newState
              })
            }
            if (imagePosition === 'front') {
              setIsUploadingFrontImage(false)
            }
            if (imagePosition === 'back') {
              setIsUploadingBackImage(false)
            }
          },
        })
      }
    },
    [runGetUploadUrl, setUploadedUrls],
  )

  const getHandleBtnClick = () => {
    switch (props.formType) {
      case 'create-word':
        return handleCreateWord
      case 'edit-word':
        return handleUpdateWord
      default:
        return () => {}
    }
  }

  const getRes = () => {
    switch (props.formType) {
      case 'create-word':
        return resCreateWord
      case 'edit-word':
        return resUpdateWord
      default:
        return {
          data: undefined,
          isLoading: false,
          error: '',
        }
    }
  }

  React.useEffect(() => {
    if (props.open === true) {
      if (props.formType === 'create-word') {
        setTextFieldValueWordBack('')
        setTextFieldValueWordFront('')
      }
      if (props.formType === 'edit-word' && props.word) {
        setTextFieldValueWordBack(props.word.back)
        setTextFieldValueWordFront(props.word.front)
      }
      setUploadedUrls({ frontImageUrl: undefined, backImageUrl: undefined })
    }
  }, [props.open, props.formType])

  const frontImageUrl = uploadedUrls.frontImageUrl ?? props.word?.frontImageUrl
  const backImageUrl = uploadedUrls.backImageUrl ?? props.word?.backImageUrl

  return (
    <FormDialogComponent
      open={props.open}
      setOpen={props.setOpen}
      handleBtnClick={getHandleBtnClick()}
      title={props.title}
      nameSubmitBtn={props.nameSubmitBtn}
      res={getRes()}
    >
      <TextFieldComponent
        label='Front'
        value={textFieldValueWordFront}
        setValue={setTextFieldValueWordFront}
      />
      <div className='my-4 grid grid-cols-2'>
        <div className=' col-span-1'>
          <label htmlFor='img'>Select image for front:</label>
          <input
            type='file'
            accept='image/*'
            onChange={(event) => {
              if (event.target.files) {
                uploadImage(event.target.files[0], 'front')
              }
            }}
          />
        </div>
        <div className='col-span-1 flex justify-center relative'>
          {frontImageUrl && !isUploadingFrontImage && (
            <img src={frontImageUrl} className='h-[8rem]' />
          )}
          {isUploadingFrontImage && <RoundedLoading expandToFullParent />}
        </div>
      </div>
      <TextFieldComponent
        label='Back'
        value={textFieldValueWordBack}
        setValue={setTextFieldValueWordBack}
      />
      <div className='my-4 grid grid-cols-2'>
        <div className=' col-span-1'>
          <label htmlFor='img'>Select image for back:</label>
          <input
            type='file'
            accept='image/*'
            onChange={(event) => {
              if (event.target.files) {
                uploadImage(event.target.files[0], 'back')
              }
            }}
          />
        </div>
        <div className='col-span-1 flex justify-center relative'>
          {backImageUrl && !isUploadingBackImage && <img src={backImageUrl} className='h-[8rem]' />}
          {isUploadingBackImage && <RoundedLoading expandToFullParent />}
        </div>
      </div>
    </FormDialogComponent>
  )
}
