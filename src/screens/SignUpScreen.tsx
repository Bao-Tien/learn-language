import { Link } from 'react-router-dom'
import { FormSignInAndUpComponent } from '~root/components/FormSignInAndUp'
import { LeftScreenLoginComponent } from '~root/components/LeftScreenLogin'

export function SignUpScreen() {
  return (
    <div className='grid grid-flow-col grid-cols-2 w-screen h-screen text-system-base'>
      <LeftScreenLoginComponent />
      <div className='flex justify-center items-center flex-col px-48'>
        <div className='text-lg text-system-login'>BEnglish</div>
        <FormSignInAndUpComponent labelBtn='Sign up' type='signup' />
        <div>
          <div className='text-center text-system-placeholder mb-5'>_________or_________</div>
          <Link to='/login'>
            <div className='cursor-pointer hover:text-system-login'>
              Log in here if you had account
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
