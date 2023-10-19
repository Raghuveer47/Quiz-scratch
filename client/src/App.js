import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
import Forgototp from './pages/Forgototp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot' element={<Forgotpassword />} />
        <Route path='/opt' element={<Forgototp />} />
      </Routes>
    </div>
  );
}

export default App;
