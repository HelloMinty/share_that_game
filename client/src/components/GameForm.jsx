import { useState } from "react";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";


const GameForm = (props) => {
    const [gameTitle, setGameTitle] = useState("");
    const [gameGenre, setGameGenre] = useState("");
    const [gameDescription, setGameDescription] = useState("");
    const [gamepostedBy, setGamePostedBy] = useState("");
    const {loggedUserId, setLoggedUserId} = props;

    const [Errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit =(e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/gamepost", 
        {title: gameTitle, 
            genre: gameGenre, 
            description: gameDescription,
            postedBy: loggedUserId

        })
        .then(res => {
            console.log(res)
            setGamePostedBy(loggedUserId)
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
            <h1>This is the gameform</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {Errors.title? <p>{Errors.title.message}</p> : null}
                    <label>Game Title: </label>
                        <input
                            type="text"
                            value={gameTitle}
                            onChange={(e) => setGameTitle(e.target.value)}
                        />
                </div>
                <div>
                {Errors.genre? <p>{Errors.genre.message}</p> : null}
                    <label>Genre: </label>
                        <input
                            type="text"
                            value={gameGenre}
                            onChange={(e) => setGameGenre(e.target.value)}
                        />
                </div>
                <div>
                {Errors.description? <p>{Errors.description.message}</p> : null}
                    <label>Description: </label>
                        <input
                            type="text"
                            value={gameDescription}
                            onChange={(e) => setGameDescription(e.target.value)}
                        />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}
export default GameForm;