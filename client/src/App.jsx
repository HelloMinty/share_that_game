
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import './App.css'


import Register from './components/Register';
import Logout from './components/Logout';
import Login from './components/Login';
import Dashboard from './components/Dashboard'


function App() {

  return (
    <BrowserRouter>
    <div className='APP'>
        <Routes>
          <Route index element={<  Register/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />

        </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
