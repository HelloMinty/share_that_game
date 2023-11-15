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
    // const [gamePostedBy, setGamePostedBy]= useState("");
    const [allComments, setAllComments] = useState([]);
    const [loggedUserInfo, setLoggedUserInfo] = useState({});
    const [image, setImage] = useState();
    const {id} = useParams();
    const { loggedUserId, setLoggedUserId} = props;


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
            setAllComments([...allComments, comment])
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
                    <li className={styles.titleText}>Game Title: {gamePostDetails.title}</li>
                    <li className={styles.genreText}>Genre: {gamePostDetails.genre}</li>
                    <li>Description: {gamePostDetails.description}</li>
                    <img className={styles.imageSize} src={image}></img>
                    <br></br>
                    <l1 className={styles.postedText}>Posted By: {userName}</l1>
                </ul>
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.chatFlex}>
                    <h3 className={styles.commentText}>Live Chat</h3>
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
                        <hr></hr>
                    {allComments.map((text)=>(
                        <div key={text._id} className={styles.commentContainer}>
                            <p className={styles.chatText}><span className={styles.userText}>{text.postedBy}</span>: {text.comment}</p>
                            <p><span className={styles.dateText}>@ {text.createdAt}</span></p>
                            <hr></hr>
                        </div>
                    ))}
            
            </div>
        </div>
    )
}
export default GamePostDetails;