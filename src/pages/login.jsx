// src/components/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../auth/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const rout=useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully!"); // Show success toast
      console.log("User logged in successfully");
      rout('/')
      // You can redirect the user or perform other actions here
    } catch (err) {
      setError(err.message);
      toast.error("Invalid username or password " ); // Show error toast
    }
  };

  return (
    <div className='container col-6  border p-4 bg-dark rounded-4 login'>
      <h1 className='text-light'>Login!</h1>
      <form onSubmit={handleLogin} >
        <div className="form-group">
          <label htmlFor="email" className='text-light'>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="form-control"
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="password" className='text-light'>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="form-control"
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn next-btn me-5">Log In</button>
        <a className="btn btn-danger" href='/signup'>Sign Up</a>
      </form>
      <ToastContainer /> {/* Render ToastContainer */}
    </div>
  );
};

export default Login;
