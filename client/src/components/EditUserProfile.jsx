import { useState } from 'react'
import styles from '../components/css/Profile.module.css'
import defaultImg from '../components/images/default.png'
import { useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
const EditUserProfile = () => {
    const [image, setImage]= useState();
    const [userInfo, setUserInfo] = useState({});
    const [userDescription, setUserDescription] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/getoneuser/${id}`)
        .then(res => {
            console.log(res.data)
            setUserInfo(res.data)
        })
        .catch()
    },[id])

    const handleUpload =(e) => {
        const file = e.target.files[0];
        const formdata = new FormData();
        setImage(URL.createObjectURL(file));
        formdata.append('file', file);
        axios.post('url', formdata,{
            headers: {
                "Content-Type" : "multipart/form-data"
            },
        })
        .then(res => {
            console.log(res)
            setImage(URL.createObjectURL(file))
        })
        .catch(err => {
            console.log(err)
        })
    }
    const handleEdit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/editoneuser/${id}`, 
        {userName: userInfo.userName, email: userInfo.email ,profilePicture: image})
        .then(res=> {
            console.log(res)
            setImage(image);
        })
        .catch(err=> {
            console.log(err)
        })
    }
    const submitHandler =(e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/editoneuser/${id}`,
        {description: userDescription})
        .then(res=>{
            console.log(res)
            navigate(`/profile/${id}`)
        })
        .catch(err=>{
            console.log(err)
        })
    }


    return (
        <div className={styles.backgroundProfile}>
            <div className={styles.card1}>
                <div className={styles.profileStats}>
                    <div className={styles.profileIcon}>
                        {userInfo.profilePicture
                        ?   <img className={styles.imageSize} src ={userInfo.profilePicture}></img>    
                        :   <img className={styles.imageSize} src = {defaultImg}></img>
                        }
                        
                        <input 
                            type="file" 
                            onChange={handleUpload}
                            className={styles.uploadBtn}
                        />
                        <button className={styles.choosebtn} onClick={handleEdit}>Choose Photo</button>
                        {image
                        ? <img className={styles.imageSize} src ={image}></img>  
                        : null
                        }
                        
                        <h3>{userInfo.userName}</h3>
                    </div>
                    <div className={styles.profileBottom}>
                    </div>
                </div>
                <div className={styles.profileInfo}>
                    <form onSubmit={submitHandler}>
                        <label className={styles.descriptionLabel}>Description: </label>
                            <textarea 
                                className={styles.descriptionText}
                                value={userDescription}
                                type="text"
                                onChange={(e)=> setUserDescription(e.target.value)}
                                />
                        <button className={styles.editBtn}>Edit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditUserProfile;