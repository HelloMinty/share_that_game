import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import {FaSearch} from "react-icons/fa";
import styles from "../components/css/SearchBarStyle.module.css";





const Dashboard = (props) => {
    const [allGamePosts, setAllGamePosts]= useState([]);
    const [loggedUserInfo, setLoggedUserInfo] = useState({});
    const [input, setInput] = useState("");
    const [results, setResults] =useState([]);
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

    const fetchData = (value)=>{
        fetch("http://localhost:8000/api/gamepost")
        .then(res=>res.json())
        .then((json) =>{
            const results = json.filter((game)=>{
                return value && game && game.title && game.title.toLowerCase().includes(value);
            });
            console.log(results)
            setResults(results)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }


    return (
        <div className='backgrounddashboard'>
                <h1 className='p-3 '>{loggedUserInfo.userName}'s Dashboard</h1>
                <main>
                    <h2>Game Posts</h2>
                    <button className="btn btn-outline-success border-3  mt-2 mb-4 ms-1"><Link to={"/gameform"} className='buttonlink'>Add A Post!</Link></button>
                    <div>
                        {
                            allGamePosts.map((gamepost) => {
                                return(
                                    <div key={gamepost._id} className=" p-3 mb-3 mb w-25 mx-auto border border-3 border-info  text-emphasis-info rounded-4 ">
                                        <p>Game Title : {gamepost.title}</p>

                                        {gamepost.postedBy == loggedUserId 
                                        ? <Link to={`/edit/${gamepost._id}`} className='displaylink'>Edit</Link>
                                        : null}
                                        {gamepost.postedBy == loggedUserId 
                                        ? <button onClick={()=> handleDelete(gamepost._id)}>Delete</button>
                                        : null}
                                        <Link to={`/details/${gamepost._id}`}> Details</Link>

                                        <hr></hr>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.searchContainer}>
                        <div className={styles.inputWrapper}>
                            <FaSearch id= "search-icon"/>
                            <input
                                className={styles.inputSearch}
                                placeholder="Type to search..."
                                value={input}
                                onChange={(e) => handleChange(e.target.value)}
                            />
                        </div>
                    </div>
                        <div className={styles.searchDisplay}>
                            
                            {results.map((result,id)=>{
                                return(
                                    <div key={id}>
                                        <Link to={`/details/${result._id}`}className={styles.resultText}>{result.title}</Link>
                                    </div>
                                )   
                            })}
                                
                        </div>
                    
                </main>

        </div>
    )
}

export default Dashboard;