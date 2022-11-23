import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { SetStateAction } from 'react'
import RoundedLoading from '../RoundedLoading/RoundedLoading'

interface IFormDialogComponentProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  textFieldValue?: string
  setTextFieldValue:
    | React.Dispatch<SetStateAction<string | undefined>>
    | React.Dispatch<SetStateAction<string>>
  handleBtnClick: () => void
  title: string
  lableTextField: string
  nameSubmitBtn: string
  res?: {
    data?: boolean | undefined
    isLoading: boolean
    error: string
  }
}

export function FormDialogComponent(props: IFormDialogComponentProps) {
  const handleCloseFormDialog = () => {
    props.setOpen(false)
  }

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    props.setTextFieldValue(e.target.value)
  }

  return (
    <Dialog open={props.open} onClose={handleCloseFormDialog}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label={props.lableTextField}
          type='text'
          fullWidth
          variant='standard'
          value={props.textFieldValue}
          onChange={(e) => handleTextFieldChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseFormDialog}>Cancel</Button>
        {props.res?.isLoading ? (
          <RoundedLoading expandToFullParent />
        ) : (
          <Button onClick={props.handleBtnClick}>{props.nameSubmitBtn}</Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
