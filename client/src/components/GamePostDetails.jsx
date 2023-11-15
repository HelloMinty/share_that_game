import { useEffect , useState } from "react";
import { Link, useParams} from "react-router-dom";
import axios from "axios"
import CommentComponent from "./CommentComponent";
import styles from './css/CommentStyle.module.css'





const GamePostDetails = (props) => {
    const [gamePostDetails, setGamePostDetails] = useState({});
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [comment, setComment] = useState("")
    const [gamePostedBy, setGamePostedBy]= useState("");
    const [allComments, setAllComments] = useState([]);
    const [loggedUserInfo, setLoggedUserInfo] = useState({});
    const {id} = useParams();
    const { loggedUserId, setLoggedUserId} = props;


    const onChangeHandler = (e) => {
        setComment(e.target.value)
    }
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getoneuser/${loggedUserId}`)
        .then(res => {
            console.log(res.data)
            setLoggedUserInfo(res.data)
            
        })
        .catch(err=> {
            console.log(err)
        })
    },[loggedUserId])
    console.log(loggedUserId)

    const onClickHandler =(e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/gamecomments", {comment: comment, postedBy: loggedUserInfo.userName })
        .then(res => {
            // console.log(res)
            setGamePostedBy(loggedUserInfo.userName)
            setAllComments([...allComments])

        })
        .catch(err => {
            console.log(err)
        })


    }
    useEffect(()=> {
        axios.get(`http://localhost:8000/api/gamepost/${id}`)
        .then(res => {
            // console.log(res.data)
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
            // console.log(res.data.userName)
            setUserName(res.data.userName)
        })
        .catch(err => {
            console.log(err)
        })
    },[userId])
    useEffect(()=>{
        axios.get("http://localhost:8000/api/gamecomments")
        .then(res=>{
            // console.log(res.data)
            setAllComments(res.data)
        })
        .catch(err=>{
            // console.log(err)
        })
    },[])

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
            <div>

            </div>
            <div className={styles.mainContainer}>
                <div className={styles.commentFlexbox}>
                    <h3 className={styles.commentText}>Live Chat</h3>
                    <textarea 
                        value={comment}
                        className={styles.inputBox}
                        onChange={onChangeHandler}
                    />
                    <button 
                        className={styles.commentButton}
                        onClick={onClickHandler}
                        >Submit</button>
                    {allComments.map((text)=>(
                        <div key={text._id} className={styles.commentContainer}>
                            <p>{text.postedBy}: {text.comment}</p>
                            <p>@ {text.createdAt}</p>
                            <hr></hr>
                        </div>
                    ))}
            </div>
        </div>
        </div>
    )
}
export default GamePostDetails;