import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [register, setregister] = useState({ fname: '', username: '', email: '', password: '', });
    const changeHandler = (e) => {
        setregister({ ...register, [e.target.name]: e.target.value });
    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/register', register).then((res) => {
            return navigate('/login');
        }).catch(err => console.log(err));
    }
    return (
        <div className='register'>
            <h2>Register</h2>
            <form onSubmit={submitHandler} className="loginform">
                <label htmlFor="email">Full Name:
                    <input type="text" name='fname' onChange={changeHandler} required autoComplete='off' />
                </label>
                <label htmlFor="password">Username:
                    <input type="text" name='username' onChange={changeHandler} required />
                </label>
                <label htmlFor="password">Email:
                    <input type="text" name='email' onChange={changeHandler} required />
                </label>
                <label htmlFor="password">Password:
                    <input type="text" name='password' onChange={changeHandler} required />
                </label>
                <input className='logmainbtn' type="submit" value="Register" />
            </form>
            <div>
                already have an account <span><Link className='regisli' to='/login'>Login ?</Link></span>
            </div>
        </div>
    )
}
