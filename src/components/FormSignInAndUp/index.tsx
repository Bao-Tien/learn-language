import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BASE_API_URL } from '~root/constants'
import AuthContext from '~root/contexts/_AuthContext'
import { useFetch } from '~root/hooks/useFetch'
import { AuthLoginResponseFail, AuthLoginResponseSuccess } from '~root/interfaces/AuthLoginResponse'

interface IFormSignInAndUpComponentProps {
  labelBtn: string
  type: 'signin' | 'signup'
}

export function FormSignInAndUpComponent(props: IFormSignInAndUpComponentProps) {
  const { login, isLoggedIn } = React.useContext(AuthContext)
  const [isSignedUp, setIsSignedUp] = React.useState(false)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()

  const [, run] = useFetch<AuthLoginResponseSuccess>()
  const handleLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    run({
      method: 'POST',
      url: BASE_API_URL + '/auth',
      body: {
        action: 'signin',
        username,
        password,
      },
      callBackOnSuccess: (data: AuthLoginResponseSuccess) => {
        toast.success(data.message)
        login(data.userData)
      },
      callBackOnFail: (error: AuthLoginResponseFail) => {
        toast.error(error.message)
      },
    })
  }

  React.useEffect(() => {
    // Chuyen qua lai trang Home
    if (isLoggedIn === true) {
      navigate({ pathname: '/' })
    }
  }, [isLoggedIn, navigate])

  const handleSignup: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    run({
      method: 'POST',
      url: BASE_API_URL + '/auth',
      body: {
        action: 'signup',
        username,
        password,
      },
      callBackOnSuccess: (data: AuthLoginResponseSuccess) => {
        toast.success(data.message)
        setIsSignedUp(true)
      },
      callBackOnFail: (error: AuthLoginResponseFail) => {
        toast.error(error.message)
      },
    })
  }

  React.useEffect(() => {
    // Chuyen qua lai trang Home
    if (isSignedUp === true) {
      navigate({ pathname: '/login' })
    }
  }, [isSignedUp, navigate])

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    if (props.type === 'signin') {
      handleLogin(e)
    } else handleSignup(e)
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <TextField
        margin='normal'
        required
        fullWidth
        id='username'
        label='Username'
        name='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        label='Password'
        name='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className='text-center'>
        <Button type='submit'>{props.labelBtn}</Button>
      </div>
    </form>
  )
}
