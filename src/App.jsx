
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

import Adminpage from './page/admin/adminpage';
import HomePage from './page/Home/homepage';
import LoginPage from './page/login/login';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './page/register/register';
import Testing from './Component/testing';
import { GoogleOAuthProvider } from '@react-oauth/google';
import VerifyEmail from './page/verifyEmail/verifyEmail';
import Review from './page/Home/review';


function App() {
  

  return (
    <>
    <GoogleOAuthProvider clientId="317857477878-kpbfnslu10ler5is7muma64earhftqk6.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster/>
        <Routes path="/*">
          <Route path='/admin/*' element={<Adminpage/>}/>
          <Route path='/*' element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/verify-email" element={<VerifyEmail/>}/>
          
          
          <Route path="/testing" element={<Testing/>}/>
       
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
    </>
  )
}

export default App
