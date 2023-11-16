import React from 'react'
import { useState } from 'react'
import styles from '../components/css/Profile.module.css'
import defaultImg from '../components/images/default.png'
import { useEffect } from 'react'
import { Link, useParams} from "react-router-dom";
import axios from 'axios'
const Profile = (props) => {
    const [image, setImage]= useState();
    const [userInfo, setUserInfo] = useState({});
    const{loggedUserId} = props;
    const {id} = useParams();

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/getoneuser/${id}`)
        .then(res => {
            console.log(res.data)
            setUserInfo(res.data)
        })
        .catch()
    },[id])
    return (
        <div className={styles.backgroundProfile}>
            <div className={styles.card1}>
                <div className={styles.profileStats}>
                    <div className={styles.profileIcon}>
                        {userInfo.profilePicture
                        ?   <img className={styles.imageSize} src ={userInfo.profilePicture}></img>    
                        :   <img className={styles.imageSize} src = {defaultImg}></img>
                        }

                        <h3>{userInfo.userName}</h3>
                        {loggedUserId == id
                        ? <Link to={`/edit/user/${id}`}>Edit User Profile</Link>
                        : null
                        }
                        
                    </div>
                    <div className={styles.profileBottom}>
                    </div>
                </div>
                <div className={styles.profileInfo}>
                    <p className={styles.infoStyle}>{userInfo.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile