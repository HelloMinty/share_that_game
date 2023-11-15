import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import './App.css'
import Register from './components/Register';
import Logout from './components/Logout';
import Login from './components/Login';
import Dashboard from './components/Dashboard'
import { useState } from 'react';
import GameForm from './components/GameForm';
import EditPost from './components/EditPost';
import GamePostDetails from './components/GamePostDetails';


function App() {
  const [loggedUserId, setLoggedUserId] = useState("")

  return (
    <BrowserRouter>
    <div className='APP '>
        <Routes>
          <Route index element={<  Register/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/login" element={<Login
          loggedUserId={loggedUserId} setLoggedUserId={setLoggedUserId}
          />} />
          <Route path="/dashboard" element={<Dashboard
          loggedUserId={loggedUserId} setLoggedUserId={setLoggedUserId}
          />} />
          <Route path="/gameform" element={<GameForm
          loggedUserId={loggedUserId} setLoggedUserId={setLoggedUserId}
          />} />
          <Route path="/edit/:id" element={<EditPost/>} />
          <Route path="/details/:id" element={<GamePostDetails/>} />
        </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
