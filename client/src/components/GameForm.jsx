import { useState } from "react";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import styles from "../components/css/MainCss.module.css"


const GameForm = (props) => {
    const [gameTitle, setGameTitle] = useState("");
    const [gameGenre, setGameGenre] = useState("");
    const [gameDescription, setGameDescription] = useState("");
    const [gamepostedBy, setGamePostedBy] = useState("");
    const [image, setImage] = useState();
    const {loggedUserId, setLoggedUserId} = props;

    const [Errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit =(e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/gamepost", 
        {title: gameTitle, 
            genre: gameGenre, 
            description: gameDescription,
            postedBy: loggedUserId,
            image: image

        } , {withCredentials:true})
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
    const handleFile =(e) => {
        const file = e.target.files[0];
        const formdata = new FormData();
        setImage(URL.createObjectURL(file));
        formdata.append('file', file);
        axios.post('url', formdata,{
            headers: {
                "Content-Type" : "multipart/form-data"
            },
        })
        .then(res => setImage(URL.createObjectURL(file)))
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='backgroundform'>
            <Link to={"/dashboard"}>Home</Link>
            <h1 className='p-3 '>This is the gameform</h1>
            <form onSubmit={handleSubmit} className='w-25 mx-auto'>
                <div>
                    {Errors.title? <p className="alert alert-danger p-1">{Errors.title.message}</p> : null}
                    <label className="form-label  h4 mt-4 ">Game Title: </label>
                        <input
                        className="form-control"
                            type="text"
                            value={gameTitle}
                            onChange={(e) => setGameTitle(e.target.value)}
                        />
                </div>
                <div>
                {Errors.genre? <p className="alert alert-danger p-1">{Errors.genre.message}</p> : null}
                    <label className="form-label  h4 mt-4 ">Genre: </label>
                        <input
                        className="form-control"
                            type="text"
                            value={gameGenre}
                            onChange={(e) => setGameGenre(e.target.value)}
                        />
                </div>
                <div>
                {Errors.description? <p className="alert alert-danger p-1">{Errors.description.message}</p> : null}
                    <label className="form-label h4 mt-4">Description: </label>
                        <textarea
                        className="form-control"
                            type="text"
                            value={gameDescription}
                            onChange={(e) => setGameDescription(e.target.value)}
                        />
                </div>
                    <br/><br/>
                <div>
                    <input 
                    className="form-control"
                        type="file" 
                        onChange={handleFile}
                    />
                    <br/><br/>
                    {image
                    ?   <img className={styles.imageSize} src ={image}></img>    
                    :   null
                    }
                    
                </div>
                <button className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
    )
}
export default GameForm;