import { useEffect , useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"


const GamePostDetails = () => {
    const [gamePostDetails, setGamePostDetails] = useState({});
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const {id} = useParams();
    useEffect(()=> {
        axios.get(`http://localhost:8000/api/gamepost/${id}`)
        .then(res => {
            console.log(res.data)
            setGamePostDetails(res.data)
            setUserId(res.data.postedBy)
        })
        .catch(err=> {
            console.log(err)
        })
    },[id])
    useEffect(()=> {
        axios.get(`http://localhost:8000/api/getoneuser/${userId}`)
        .then(res => {
            console.log(res.data.userName)
            setUserName(res.data.userName)
        })
        .catch(err => {
            console.log(err)
        })
    })

    return (
        <div>
            <h1>Game Post Details for the game ~{gamePostDetails.title}~</h1>
            <Link to={"/dashboard"}>Home</Link>
            <ul>
                <li>Game Title: {gamePostDetails.title}</li>
                <li>Genre: {gamePostDetails.genre}</li>
                <li>Description: {gamePostDetails.description}</li>
                <l1>postedBy: {userName}</l1>
            </ul>
        </div>
    )
}
export default GamePostDetails;