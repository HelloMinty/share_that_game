import styles from "../components/css/NavStyle.module.css"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import axios from "axios";
import logo from "../components/images/logo.jpg"
import { useParams } from "react-router-dom";

const Nav = (props) => {
    const [loggedUserInfo, setLoggedUserInfo] = useState({});
    const {loggedUserId, setLoggedUserId} = props;
    const {id}= useParams();
    const navigate = useNavigate()
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

    const logoutUser = () => {
        axios.post('http://localhost:8000/api/logoutUser', {},{withCredentials:true})
            .then((res) => {
                navigate('/')
            })
            .catch((err) => {
                navigate('/')
            })
    }


    return(
        <div>
            <nav>
                <Link className={styles.siteTitle} to ={"/dashboard"}><img className={styles.logoStyle} src={logo}></img> Share That Game</Link>
                {
                    loggedUserInfo
                    ? <h2 className={styles.welcomeStyle}>Welcome!</h2>
                    : null
                }
                
                <ul>
                    <li>
                        <Link className={styles.navLink} to={`/profile/${loggedUserId}`}>Profile</Link>
                    </li>
                    <li>
                        <Link className={styles.navLink} to={"/about"}>About</Link>
                    </li>
                    <li>
                        <Link className={styles.navLink} to={"/dashboard"}>Home</Link>
                    </li>
                        {id
                        ?   <li>
                                <button className="btn logoutlink" onClick={logoutUser}>Logout</button>
                            </li> 
                        : null
                        }
                    
                </ul>
            </nav>
        </div>
    )
}
export default Nav;