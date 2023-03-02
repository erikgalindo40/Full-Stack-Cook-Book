import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  return (
    <header className='header'>
    Header
    {location.pathname==='/Dashboard/'? 
    (
      <>
      <Link to={'/Dashboard/'}>Dashboard</Link>
      <button>Logout</button>
      </>
    ):(
      <>
      <Link to={'/Register/'}>Register</Link>
      <Link to={'/Login/'}>Login</Link>
      </>
    ) }
    </header>
  )
}

export default Header