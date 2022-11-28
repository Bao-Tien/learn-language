import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

interface IFormSignInAndUpComponentProps {
  labelBtn: string
}

export function FormSignInAndUpComponent(props: IFormSignInAndUpComponentProps) {
  return (
    <>
      <TextField
        margin='normal'
        required
        fullWidth
        id='username'
        label='Username'
        name='username'
      />
      <TextField
        margin='normal'
        required
        fullWidth
        id='password'
        label='Password'
        name='Password'
        type='password'
      />
      <Button>{props.labelBtn}</Button>
    </>
  )
}
