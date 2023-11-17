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
// import CommentComponent from './components/CommentComponent';
import Nav from './components/Nav';
import About from './components/About';
import Profile from './components/Profile';
import EditUserProfile from './components/EditUserProfile';
import socketIO from "socket.io-client";


const socket = socketIO.connect("http://localhost:8000");
function App() {
  const [loggedUserId, setLoggedUserId] = useState("")
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  return (
    <BrowserRouter>
    <div className='APP '>
        <Nav
          loggedUserId={loggedUserId} setLoggedUserId={setLoggedUserId}
        />
        <Routes>
          <Route index element={<  Register/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/about" element={<About/>} />
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
          <Route path="/edit/user/:id" element={<EditUserProfile/>} />
          <Route path="/profile/:id" element={<Profile
          loggedUserId={loggedUserId} setLoggedUserId={setLoggedUserId}
          />} />
          <Route path="/details/:id" element={<GamePostDetails
            comment={comment} setComment={setComment}
            comments={comments} setComments={setComments}
            loggedUserId={loggedUserId} setLoggedUserId={setLoggedUserId}
            socket={socket}
          />} />
          {/* <Route path="/comment" element={<CommentComponent/>} /> */}
        </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
