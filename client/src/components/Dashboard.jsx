import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios";



const Dashboard = (props) => {
    const [allGamePosts, setAllGamePosts]= useState([]);
    const [loggedUserInfo, setLoggedUserInfo] = useState({});
    const { loggedUserId, setLoggedUserId} = props;
    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getoneuser/${loggedUserId}`)
        .then(res => {
            console.log(res)
            setLoggedUserInfo(res.data)
        })
        .catch(err=> {
            console.log(err)
        })
    },[loggedUserId])

    useEffect(()=> {
        axios.get("http://localhost:8000/api/gamepost")
        .then(res => {
            console.log(res)
            setAllGamePosts(res.data)
        })
        .catch(err=> {
            console.log(err)
        })
    },[])



    return (
        <div>
            <nav>
                <h1>Share That Game</h1>
                <h3>Welcome {loggedUserInfo.userName}</h3>
                <button><Link to={"/logout"}>Logout</Link></button>
            </nav>
                <main>
                    <h2>Game Posts</h2>
                    <button><Link to={"/gameform"}>Add A Post!</Link></button>
                    <div>
                        {
                            allGamePosts.map((gamepost) => {
                                return(
                                    <div key={gamepost._id}>
                                        <p>Game Title : {gamepost.title}</p>
                                        {gamepost.postedBy == loggedUserId 
                                        ? <Link to={`/edit/${gamepost._id}`}>Edit</Link>
                                        : null}
                                        <Link to={`/details/${gamepost._id}`}> Details</Link>
                                        <br></br>
                                        <label>Comment: </label>
                                            <input

                                            />
                                            
                                        <hr></hr>
                                    </div>
                                )
                            })
                        }
                    </div>
                </main>

        </div>
    )
}

export default Dashboard;