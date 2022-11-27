import Button from '@mui/material/Button'
import { SetStateAction } from 'react'
import { FormDialogComponent } from '../FormDialog'
import { TextFieldComponent } from '../TextField'

interface IFormDialogTwoTextFieldComponentProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleBtnClick: () => void
  title: string
  nameSubmitBtn: string
  res?: {
    data?: boolean | undefined
    isLoading: boolean
    error: string
  }
  labelOne: string
  valueOne?: string
  setValueOne:
    | React.Dispatch<SetStateAction<string | undefined>>
    | React.Dispatch<SetStateAction<string>>
  labelTwo: string
  valueTwo?: string
  setValueTwo:
    | React.Dispatch<SetStateAction<string | undefined>>
    | React.Dispatch<SetStateAction<string>>
}

export function FormDialogTwoTextFieldComponent(props: IFormDialogTwoTextFieldComponentProps) {
  return (
    <FormDialogComponent
      open={props.open}
      setOpen={props.setOpen}
      handleBtnClick={props.handleBtnClick}
      title={props.title}
      nameSubmitBtn={props.nameSubmitBtn}
      res={props.res}
    >
      <TextFieldComponent
        label={props.labelOne}
        value={props.valueOne}
        setValue={props.setValueOne}
      />
      <div className='my-4'>
        <label htmlFor='img'>Select image for front:</label>
        <input type='file' id='img' name='img' accept='image/*' />
      </div>
      <TextFieldComponent
        label={props.labelTwo}
        value={props.valueTwo}
        setValue={props.setValueTwo}
      />

      <div className='my-4'>
        <label htmlFor='img'>Select image for back:</label>
        <input type='file' id='img' name='img' accept='image/*' />
      </div>
    </FormDialogComponent>
  )
}
