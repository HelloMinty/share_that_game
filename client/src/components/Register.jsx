import React from 'react'
import '../index.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = (props) => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        userName:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const [errors, setErrors] = useState({
    })

    const [regErrors, setRegErrors] = useState('')

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/registerUser', user, {withCredentials:true})
            .then((res) => {
                console.log(res)
                navigate('/login')
            })
            .catch((err) => {
                if (err.response.data.message === 'This email already exists, please log in'){
                    setRegErrors('This email already exists, please log in')
                }
                else{
                    setErrors(err.response.data.error.errors)
                }
                console.log(err)
            })
        }
        return (
            <div className='backgroundregister'>
            <div >
            <h1 className='p-3 '> Welcome to Share That Game!</h1>
            <h2 className='p-3 mb-2 '>A place to share your favorite games</h2> 
            <h3 className='p-3 mb-2 '>Register Here</h3> 
            </div>
            <form className='w-25 mx-auto' onSubmit={submitHandler}>
            {regErrors && (
                <div className="alert alert-danger p-1">
                        {regErrors}
                    </div>
                )}
            <div>
                <label className="form-label h5 "> Username:</label>
                <input type="text" className="form-control" value={user.userName} name='userName' onChange={changeHandler} />
                {
                    errors.userName?
                    <p className="alert alert-danger p-1">{errors.userName.message}</p>
                    :
                    null
                }
            </div>
            <div>
                <label className="form-label mt-2 h5 ">Email:</label>
                <input type="email" className="form-control" value={user.email} name='email' onChange={changeHandler} />
                {
                    errors.email ?
                    <p className="alert alert-danger p-1">{errors.email.message}</p>
                    :
                    null
                }


            </div>
            <div>
                <label className="form-label mt-2  h5 ">Password:</label>
                <input type="password" className="form-control" value={user.password} name='password' onChange={changeHandler}/>
                {
                    errors.password ?
                    <p className="alert alert-danger p-1">{errors.password.message}</p>
                    :
                    null
                }
            </div>
            <div>
                <label className="form-label mt-2  h5 ">Confirm Password:</label>
                <input type="password" className="form-control" value={user.confirmPassword} name='confirmPassword' onChange={changeHandler}/>
                {
                    errors.confirmPassword ?
                    <p className="alert alert-danger p-1">{errors.confirmPassword.message}</p>
                    :
                    null
                }
            </div>
            <br />
            <div>
            <button className='btn btn-primary'>Register</button>
            </div>
            <div >
            <Link to={'/login'} className='btn btn-primary mt-2'>Already Have An Account?</Link>
            </div>
        </form>
        </div>
        
    )
}


export default Register

