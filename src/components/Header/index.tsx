import { Link } from 'react-router-dom'

export function HeaderComponent() {
  return (
    <div>
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
