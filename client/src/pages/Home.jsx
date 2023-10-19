import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const [data, setdata] = useState({});
    useEffect(() => {
        axios.get('http://localhost:5000/api/user/profile', { headers: { 'x-token': `${localStorage.getItem('token')}` } }).then((res) => {
            setdata(res.data)
        }).catch(err => console.log(err));
    });
    const logout = () => {
        localStorage.removeItem('token');
        return navigate('/login');
    }
    return (
        <div className='home'>
            {data != {} &&
                <div>
                    <img src="" alt="left" />
                    <div>Hi, {data.fname}</div>
                    <div>Welcome aboard</div>
                    <div>College: none</div>
                    <div>Branch: none</div>
                    <div>Year of Passing: none</div>
                    <div>
                        <button>Profile</button>
                        <button onClick={logout}>Logout</button>
                    </div>
                    <img src="" alt="right" />
                </div>
            }
            <div>
                <div>view my tests & products</div>
                <button>View now</button>
            </div>
        </div>
    )
}
