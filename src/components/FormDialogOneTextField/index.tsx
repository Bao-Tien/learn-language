import { SetStateAction } from 'react'
import { FormDialogComponent } from '../FormDialog'
import { TextFieldComponent } from '../TextField'

interface IFormDialogOneTextFieldComponentProps {
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
  label: string
  value?: string
  setValue:
    | React.Dispatch<SetStateAction<string | undefined>>
    | React.Dispatch<SetStateAction<string>>
}

export function FormDialogOneTextFieldComponent(props: IFormDialogOneTextFieldComponentProps) {
  return (
    <FormDialogComponent
      open={props.open}
      setOpen={props.setOpen}
      handleBtnClick={props.handleBtnClick}
      title={props.title}
      nameSubmitBtn={props.nameSubmitBtn}
      res={props.res}
    >
      <TextFieldComponent label={props.label} value={props.value} setValue={props.setValue} />
    </FormDialogComponent>
  )
}
