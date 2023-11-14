import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState({
        email:'',
        password:''
    })
    const [loginErrors, setLoginErrors] = useState({})

    const onChangeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/loginUser', userLogin, {withCredentials:true})
            .then((res) => {
                navigate('/dashboard')
            })
            .catch((err) => {
                setLoginErrors(err.response.data)
            })
    }
return (
    <div >
        <h1 >Login to Share That Game</h1>
        <form   onSubmit={submitHandler} >
            <label >Email:</label>
            <input type="text" name="email" className='form-control' onChange={onChangeHandler} value={userLogin.email} />
            {
                    loginErrors.message ?
                    <p className="alert alert-danger p-1">{loginErrors.message}</p>
                    :
                    null
                }
            <label >Password:</label>
            <input type="password" name="password" className='form-control' onChange={onChangeHandler} value={userLogin.password} />
            {
                    loginErrors.message ?
                    <p className="alert alert-danger p-1">{loginErrors.message}</p>
                    :
                    null
                }
            <button className='btn btn-primary mt-3'>Login</button>
            <br />
            <Link to={'/'} className='btn btn-primary mt-2'>Register</Link>
            

        </form>
    </div>
)
}

export default Login