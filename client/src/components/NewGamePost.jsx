import React, { useState } from "react";
import { Link, useNavigate } form "react-router-dom";
import axios from "axios";
 
const NewGameForm = ({ allPosts, setAllPosts }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const NewPostHandler = e => {
    e.preventDefault();
    const newPost = {
      title,
      genre,
      description
    }
    axios.post("http://localhost:8000/api/gameposts", newPost)
      .then(res => {
        setAllPosts([...allPosts, res.data]);
        navigate("/dashboard")
      })
      .catch(err => {
        console.log(err.response.data);
        const errArray = []
        for(const key of Object.keys(err.response.data.errors)){
          errArray.push(err.response.data.errors[key].message)
        }
        setErrors(errArray);
      });
  }
  return(
    <div className="container">
      <div className="header">
        <h1>Share That Game</h1>
        <h2>Add a Game</h2>
        <button><Link to="/dashboard">Home</Link></button>
        <button><Link to="/logout">Logout</Link></button>
      </div>
      <form onSubmit={newPostHandler}>
        <div style={{color: "red"}}>
          {
            errors.map((err, idx) => {
              return (
                <p key={idx}>{err}</p>
              )
            })    
          }
        </div>
        <label>Game Title:</label>
        <input type="text" value={title} onChange= {e => setTitle(e.target.value)}/>
        <label>Genre:</label>
        <input type="text" value={genre} onChange= {e => setGenre(e.target.value)}/>
        <label>Description:</label>
        <input type="text" value={description} onChange= {e => setDescription(e.target.value)}/>
        <button>Post</button>
      </form>
    </div>
  )
}
export default NewGamePost;
