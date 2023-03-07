import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  return (
    <header className='header'>
    My Cook Book
    {location.pathname==='/Dashboard/'&&
      <div>
      <button className='logout-button'>Logout</button>
      </div>
    }
    </header>
  )
}

export default Header