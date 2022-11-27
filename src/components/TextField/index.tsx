import TextField from '@mui/material/TextField'
import { SetStateAction } from 'react'

interface ITextFieldComponentProps {
  label: string
  value?: string
  setValue:
    | React.Dispatch<SetStateAction<string | undefined>>
    | React.Dispatch<SetStateAction<string>>
}

export function TextFieldComponent(props: ITextFieldComponentProps) {
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    props.setValue(e.target.value)
  }

  return (
    <TextField
      autoFocus
      margin='dense'
      id='name'
      label={props.label}
      type='text'
      fullWidth
      variant='standard'
      value={props.value}
      onChange={(e) => handleTextFieldChange(e)}
    />
  )
}
