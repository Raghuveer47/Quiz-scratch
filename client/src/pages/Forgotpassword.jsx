import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Forgotpassword() {
    const navigate = useNavigate();
    const [email, setemail] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/forgot', { email }).then((res) => {
            return navigate('/otp');
        }).catch(err => console.log(err));
    }
    return (
        <div className='login'>
            <h2>Forgot Password</h2>
            <form onSubmit={submitHandler} className="loginform">
                <label htmlFor="email">Email:
                    <input type="text" onChange={(e) => setemail(e.target.value)} required autoComplete='off' />
                </label>
                <input className='logmainbtn' type="submit" value="Send otp" />
            </form>
            <div>
                Back to <span><Link to='/login'>Login ?</Link></span>
            </div>
        </div>
    )
}