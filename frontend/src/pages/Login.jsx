import { Link } from 'react-router-dom'

function Login() {
  return (
    <main className='login-main'>
      <form className='login-form form'>
        <h1>Let's get cooking!</h1>
        <label htmlFor="email"></label>
        <input type="text" name='email' id='email' placeholder='Email'/>
        <label htmlFor="password"></label>
        <input type="password" name='password' id='name' placeholder='Password'/>
        <p>Need an account? <Link to={'/Register/'}>Sign up!</Link></p>
      </form>
    </main>
  )
}

export default Login