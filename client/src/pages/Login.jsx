import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [login, setlogin] = useState({ username: '', password: '', });
  const changeHandler = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  }
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', login).then((res) => {
      localStorage.setItem("token", res.data);
      return navigate('/');
    }).catch(err => console.log(err));
  }
  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={submitHandler} className="loginform">
        <label htmlFor="email">Username:
          <input type="text" name='username' onChange={changeHandler} required autoComplete='off' />
        </label>
        <label htmlFor="password">Password:
          <input type="text" name='password' onChange={changeHandler} required />
        </label>
        <div>
          <Link to='/forgot'>Forgot password ?</Link>
        </div>
        <input className='logmainbtn' type="submit" value="Login" />
      </form>
      <div>
        Can't have an account <span><Link to='/register'>Register ?</Link></span>
      </div>
    </div>
  )
}
