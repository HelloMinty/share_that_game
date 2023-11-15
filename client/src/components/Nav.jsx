import styles from "../components/css/NavStyle.module.css"
import { Link } from "react-router-dom";
import { useEffect, useState} from "react";
import axios from "axios";
import logo from "../components/images/logo.jpg"


const Nav = (props) => {
    const [loggedUserInfo, setLoggedUserInfo] = useState({});
    const {loggedUserId, setLoggedUserId} = props;

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


    return(
        <div>
            <nav>
                <Link className={styles.siteTitle} to ={"/dashboard"}><img className={styles.logoStyle} src={logo}></img> Share That Game</Link>
                {
                    loggedUserInfo
                    ? <h2 className={styles.welcomeStyle}>Welcome {loggedUserInfo.userName}!</h2>
                    : null
                }
                
                <ul>
                    <li>
                        <Link className={styles.navLink}to={"/dashboard"}>Button</Link>
                    </li>
                    <li>
                        <Link className={styles.navLink} to={"/about"}>About</Link>
                    </li>
                    <li>
                        <Link className={styles.navLink} to={"/dashboard"}>Home</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Nav;