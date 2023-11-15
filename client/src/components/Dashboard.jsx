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



    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/gamepost/${id}`)
        .then(res=>{
            console.log(res)
            const filteredGamePost = allGamePosts.filter(gamepost =>{
                return gamepost._id !== id;
            });
            setAllGamePosts(filteredGamePost)
        })
    }


    return (
        <div className='backgrounddashboard'>
            <nav>
                <h1 className='p-3 '>Share That Game</h1>
                <h3 className='p-3 mb-2 '>Welcome {loggedUserInfo.userName}</h3>
                <button className="btn btn-outline-danger border-3 mt-2 mb-2 ms-1"><Link to={"/logout"} className='buttonlink'>Logout</Link></button>
            </nav>
                <main>
                    <h2>Game Posts</h2>
                    <button className="btn btn-outline-success border-3  mt-2 mb-4 ms-1"><Link to={"/gameform"} className='buttonlink'>Add A Post!</Link></button>
                    <div>
                        {
                            allGamePosts.map((gamepost) => {
                                return(
                                    <div key={gamepost._id} className=" p-3 mb-3 mb w-25 mx-auto border border-3 border-info  text-emphasis-info rounded-4 ">
                                        <p>Game Title : {gamepost.title}</p>
                                        <p>Game Description: {gamepost.description}</p>
                                        {gamepost.postedBy == loggedUserId 
                                        ? <Link to={`/edit/${gamepost._id}`} className='displaylink'>Edit</Link>
                                        : null}
<<<<<<< HEAD
                                        {gamepost.postedBy == loggedUserId 
                                        ? <button onClick={()=> handleDelete(gamepost._id)}>Delete</button>
                                        : null}
                                        <Link to={`/details/${gamepost._id}`}> Details</Link>
=======
                                        <Link to={`/details/${gamepost._id}`} className='displaylink '> Details</Link>
                                        <br></br>
                                        <label>Comment: </label>
                                            <input
>>>>>>> caf15cbb600cc8b7d7a2ec3796daa15e82106fb8

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