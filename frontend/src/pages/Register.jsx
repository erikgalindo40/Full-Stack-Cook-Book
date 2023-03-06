import { Link, useLocation } from 'react-router-dom'

function Register() {
  return (
    <main className='register-main'>
      <form className='register-form form'>
        <h1>Welcome In!</h1>
        <label htmlFor="fullname"></label>
        <input type="text" name='fullname' id='fullname' placeholder='Full Name'/>
        <label htmlFor="email"></label>
        <input type="text" name='email' id='email' placeholder='Email'/>
        <label htmlFor="password"></label>
        <input type="password" name='password' id='password' placeholder='Password'/>
        <label htmlFor="password2"></label>
        <input type="password" name='password2' id='password2' placeholder='Confirm Password'/>
      <p>Have an account? <Link to={'/Login/'} className='form-link'>Login</Link></p>
      <button className='form-button'>Register</button>
      </form>
    </main>
  )
}

export default Register