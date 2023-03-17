import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignIn from './components/Signin'
import SignUp from './components/Signup'
import Navbar from './components/Navbar'
import Forgot from './components/Forgot'
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';

const index = () => {
  return (
 
<BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/signin' element={<SignIn/>} />
    <Route path='/signup' element={<SignUp/>} />
    <Route path='/forgot' element={<Forgot/>} />


    </Routes>


  
</BrowserRouter>
   

  )
}

export default index