import {useState} from 'react'
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { login,signUp } from '../firebase';
import logo from '../assets/logo.png'
const Login = () => {
  const [signState,setSignState] = useState(true);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const userAuth = async(e)=>{
    e.preventDefault();
    if(signState)
      await login(email,password)
    else
      await signUp(name,email,password)
  }

  const changeSignState = (e)=>{
    e.preventDefault();
    setEmail('');
    setName('');
    setPassword('');
    setSignState(prev=>!prev);
  }
  return (
    <div className='login'>
      <Link to='/'>
        <img src={logo} alt="" className='login-logo'/>
      </Link>
      
      <div className="login-form">
        <h1>{signState?'Sign In':'Sign Up'}</h1>
        <form action="">
          {signState?<></>:<input value = {name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Your name'/>}
          
          <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password'/>
          <button onClick={userAuth} type='submit'>{signState?'Sign In':'Sign Up'}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor=''>
                Remember Me
              </label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState?<p>New to Netflix?<span onClick={changeSignState}>Sign Up now</span></p>:<p>Already have account?<span onClick={changeSignState}>Sign In now</span></p>}
          
          
        </div>
      </div>
    </div>
  )
}

export default Login