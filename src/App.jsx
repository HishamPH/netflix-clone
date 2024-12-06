import { useEffect } from 'react';

import {Route,Routes, useNavigate} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login'
import Player from './pages/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';



function App() {
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        console.log('Logged in')
        navigate('/')
      }else{
        console.log('logged out');
        navigate('/login')
      }
        
    })
  },[]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/player/:id' element={<Player />}/>
      </Routes>
     
    </>
  )
}

export default App
