
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

import Adminpage from './page/admin/adminpage';
import HomePage from './page/Home/homepage';
import LoginPage from './page/login/login';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes path="/*">
          <Route path='/admin/*' element={<Adminpage/>}/>
          <Route path='/*' element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
       
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
