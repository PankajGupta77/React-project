import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signuplogincss.css';
import { Link } from 'react-router-dom';

const SignupForm = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   if (password !== confirmPassword) {
  //     alert('Passwords do not match');
  //     return;
  //   }
  //   try {
  //     const response = await fetch('https://courses-api-deployed-9k4x.onrender.com/api/auth/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     if (response.ok) {
  //       onSignup();
  //       navigate('/login');
  //     } else {
  //       const data = await response.json();
  //       alert(data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      setLoading(false);
      return;
    }
  
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
  
      const response = await fetch('https://courses-api-deployed-9k4x.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });
  
      clearTimeout(timeoutId);
  
      if (response.ok) {
        onSignup();
        navigate('/login');
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        alert('Request timed out. Please try again.');
      } else {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
    <div className='div-center'>
    <div className="card">
      <h2>Signup Form</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          className="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="confirm_pass"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="processpayment">Signup</button>
      </form>
      <div className="footer_card">
        <p>Existing user?</p>
        <Link to="/login">Login</Link>
      </div>
      {loading && <div className="loader"></div>}
    </div>
    </div>
    </>
  );
};

export default SignupForm;
