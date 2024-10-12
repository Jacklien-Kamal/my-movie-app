// src/components/SignUpForm.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../auth/firebase'; // Ensure db is imported for Firestore
import { collection, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Fixed the navigate hook

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add the new user to Firestore 'users' collection
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user' // You can adjust the role field as needed
      });

      toast.success("User signed up successfully!"); // Show success message
      console.log("User signed up and added to Firestore successfully");

      navigate('/'); // Redirect to home or another page after signup
    } catch (err) {
      setError(err.message);
      toast.error(err.message); // Show error message
      console.error("Error signing up:", err);
    }
  };

  return (
    <div className='container col-6 border p-4 bg-dark rounded-4 signup'>
      <h1 className='text-light'>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-danger">Sign Up</button>
      </form>
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default SignUpForm;
