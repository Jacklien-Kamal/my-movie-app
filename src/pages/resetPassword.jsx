import React, { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../auth/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset password link sent to your email!"); // Show success toast
    } catch (error) {
      toast.error("Error sending reset email: " + error.message); // Show error toast
    }
  };

  return (
    <div className='container col-6 border p-4 bg-dark rounded-4'>
      <h1 className='text-light'>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
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
        <button type="submit" className="btn next-btn me-5">Send Reset Link</button>
      </form>
      <ToastContainer /> {/* Render ToastContainer */}
    </div>
  );
};

export default ResetPassword;
