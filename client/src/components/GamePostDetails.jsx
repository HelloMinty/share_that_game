import { useEffect , useState } from "react";
import { Link, useParams} from "react-router-dom";
import axios from "axios"
import CommentComponent from "./CommentComponent";
import styles from './css/CommentStyle.module.css';
import io from "socket.io-client";






const GamePostDetails = (props) => {
    const [gamePostDetails, setGamePostDetails] = useState({});
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [comment, setComment] = useState("")
    // const [gamePostedBy, setGamePostedBy]= useState("");
    const [allComments, setAllComments] = useState([]);
    const [loggedUserInfo, setLoggedUserInfo] = useState({});
    const [image, setImage] = useState();
    const {id} = useParams();
    const { loggedUserId, setLoggedUserId} = props;
    const [socket] = useState(() => io(":8000"));


    const onChangeHandler = (e) => {
        setComment(e.target.value)
    }
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getoneuser/${loggedUserId}`)
        .then(res => {
            // console.log(res.data)
            setLoggedUserInfo(res.data)
            
        })
        .catch(err=> {
            console.log(err)
        })
    },[loggedUserId])


    const onClickHandler =(e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/gamecomments", {comment: comment, postedBy: loggedUserInfo.userName })
        .then(res => {
            // console.log(res)
            socket.emit("message", {
                text: comment,
                socketID: socket.id,
                postedBy: loggedUserInfo.userName,
            })
            socket.on("client_messages", data => setAllComments(allComments => [data, ...allComments]))
            // setGamePostedBy(loggedUserInfo.userName)

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
            setImage(res.data.image)
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
            console.log(err)
        })
    },[])

    return (
        <div className={styles.backgrounddetails}>
            <div className={styles.infoContainer}>
                <h1>{gamePostDetails.title} Details</h1>

                <ul>
                    <p className={styles.titleText}>Game Title: {gamePostDetails.title}</p>
                    <p className={styles.genreText}>Genre: {gamePostDetails.genre}</p>
                    <p>Description: {gamePostDetails.description}</p>
                    <img className={styles.imageSize} src={image}></img>
                    <br></br>
                    <l1 className={styles.postedText}><Link to={`/profile/${userId}`}>Posted By: {userName}</Link></l1>
                </ul>
            </div>
            <div className={styles.mainContainer}>
                <h3 className={styles.commentText}>Live Chat</h3>
                    <hr></hr>
                    {allComments.map((text)=>(
                        <div key={text.socketID} className={styles.commentContainer}>
                            <p className={styles.chatText}><span className={styles.userText}>{text.postedBy}</span>: {text.text}</p>
                            <p><span className={styles.dateText}>@ {text.createdAt}</span></p>
                            <hr></hr>
                        </div>
                    ))}
                    <div className={styles.chatFlex}>
                        <h3>Message</h3>
                        <textarea 
                            value={comment}
                            className={styles.inputBox}
                            onChange={onChangeHandler}
                        />
                        <button 
                            className={styles.chatSubmit}
                            onClick={onClickHandler}
                            >Send</button>
                    </div>
            
            </div>
        </div>
    )
}
export default GamePostDetails;
