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
        axios.get(`http://localhost:8000/api/gamepost/${id}` , {withCredentials:true})
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
        axios.put(`http://localhost:8000/api/gamepost/${id}`, {title: gameTitle, genre: gameGenre, description: gameDescription}, {withCredentials:true})
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
        <div className='backgroundedit'>
        <h1 className='p-3 '>Edit The Game Post</h1>
        <form onSubmit={handleSubmit} className='w-25 mx-auto'>
            <div className="mt-4 ">
                {Errors.title? <p className="alert alert-danger p-1">{Errors.title.message}</p> : null}
                <label className="form-label  h4  ">Game Title: </label>
                    <input
                    className="form-control mb-5"
                        type="text"
                        id="title"
                        value={gameTitle}
                        onChange={(e) => setGameTitle(e.target.value)}
                    />
            </div>
            <div>
            {Errors.genre? <p className="alert alert-danger p-1">{Errors.genre.message}</p> : null}
                <label className="form-label  h4  ">Genre: </label>
                    <input
                    className="form-control mb-5"
                        type="text"
                        id="genre"
                        value={gameGenre}
                        onChange={(e) => setGameGenre(e.target.value)}
                    />
            </div>
            <div>
            {Errors.description? <p className="alert alert-danger p-1">{Errors.description.message}</p > : null}
                <label className="form-label  h4 ">Description: </label>
                    <textarea
                    className="form-control mb-5"
                        type="text"
                        id="description"
                        value={gameDescription}
                        onChange={(e) => setGameDescription(e.target.value)}
                    />
            </div>
            <button className="btn btn-outline-warning border-3 mt-2 mb-4  buttonlink">Submit</button>
        </form>
    </div>
    )
}
export default EditPost;