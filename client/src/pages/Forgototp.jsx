import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Forgototp() {
    const navigate = useNavigate();
    const [otp, setotp] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/forgot', { otp }).then((res) => {
            return navigate('/password');
        }).catch(err => console.log(err));
    }
    return (
        <div className='forgototp'>
            <h2>Otp</h2>
            <form onSubmit={submitHandler} className="otpform">
                <label htmlFor="email">Opt:
                    <input type="text" onChange={(e) => setotp(e.target.value)} required autoComplete='off' />
                </label>
                <input className='optsubmit' type="submit" value="Enter otp" />
            </form>
            <div>
                Want to change <span><Link to='/forgot'>Email ?</Link></span>
            </div>
        </div>
    )
}
