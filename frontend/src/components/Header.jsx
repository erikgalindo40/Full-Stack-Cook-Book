import { useLocation, useNavigate } from 'react-router-dom'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.removeItem('user')
    navigate('/Login')
  }

  return (
    <header className='header'>
    My Cook Book
    {location.pathname==='/Dashboard/'&&
      <div>
      <button onClick={onLogout} className='logout-button'>Logout</button>
      </div>
    }
    </header>
  )
}

export default Header