import { useState } from "react";
import axios from 'axios'
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect } from "react";



const EditPost = () => {
    const [gameTitle, setGameTitle] = useState("");
    const [gameGenre, setGameGenre] = useState("");
    const [gameDescription, setGameDescription] = useState("");
    const [Errors, setErrors] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/gamepost/${id}`)
        .then(res => {
            console.log(res.data)
            setGameTitle(res.data.title)
            setGameGenre(res.data.genre)
            setGameDescription(res.data.description)
        })
        .catch(err=> {
            console.log(err)
        })
    },[id])

    const handleSubmit =(e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/gamepost/${id}`, {title: gameTitle, genre: gameGenre, description: gameDescription})
        .then(res => {
            console.log(res)
            navigate("/dashboard")
        })
        .catch(err => {
            console.log(err.response.data.errors)
            setErrors(err.response.data.errors)
        })
    }

    return (
        <div>
            <Link to={"/dashboard"}>Home</Link>
            <h1>Edit A Game Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {Errors.title? <p>{Errors.title.message}</p> : null}
                    <label>Game Title: </label>
                        <input
                            type="text"
                            id="title"
                            value={gameTitle}
                            onChange={(e) => setGameTitle(e.target.value)}
                        />
                </div>
                <div>
                {Errors.genre? <p>{Errors.genre.message}</p> : null}
                    <label>Genre: </label>
                        <input
                            type="text"
                            id="genre"
                            value={gameGenre}
                            onChange={(e) => setGameGenre(e.target.value)}
                        />
                </div>
                <div>
                {Errors.description? <p>{Errors.description.message}</p> : null}
                    <label>Description: </label>
                        <textarea
                            type="text"
                            id="description"
                            value={gameDescription}
                            onChange={(e) => setGameDescription(e.target.value)}
                        />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}
export default EditPost;