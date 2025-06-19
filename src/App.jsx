
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

import Adminpage from './page/admin/adminpage';
import HomePage from './page/Home/homepage';
import LoginPage from './page/login/login';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './page/register/register';
import Testing from './Component/testing';


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Toaster/>
        <Routes path="/*">
          <Route path='/admin/*' element={<Adminpage/>}/>
          <Route path='/*' element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          
          <Route path="/testing" element={<Testing/>}/>
       
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
