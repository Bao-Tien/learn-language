import { Link } from 'react-router-dom'

export function HeaderComponent() {
  return (
    <div className='absolute top-0 left-0 w-screen h-9 bg-red-200 '>
      <div>This is Header Component</div>
      <Link to='/login'> Login </Link>
      <Link to='/'> Home </Link>
      <Link to='/news'> News </Link>
      <Link to='/listening'>Listening</Link>
      <Link to='/game'> Game </Link>
      <Link to='/dictionary'> Dictionary </Link>
      <Link to='/study-document'> Study-document </Link>
      <Link to='/academic-performence'> Academic-performence </Link>
    </div>
  )
}
