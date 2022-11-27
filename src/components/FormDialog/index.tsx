import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import RoundedLoading from '../RoundedLoading/RoundedLoading'

interface IFormDialogComponentProps {
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
  children: JSX.Element | JSX.Element[]
}

export function FormDialogComponent(props: IFormDialogComponentProps) {
  const handleCloseFormDialog = () => {
    props.setOpen(false)
  }

  return (
    <Dialog open={props.open} onClose={handleCloseFormDialog}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button onClick={handleCloseFormDialog}>Cancel</Button>
        {props.res?.isLoading ? (
          <RoundedLoading />
        ) : (
          <Button onClick={props.handleBtnClick}>{props.nameSubmitBtn}</Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
