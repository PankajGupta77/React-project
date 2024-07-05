import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './singup.css';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://courses-api-deployed-9k4x.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const { _id } = data.user;
        localStorage.setItem('email', email);
        localStorage.setItem('_id', _id);
        onLogin();
        navigate('/');
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <div className='div-center'>
    <div className="card">
      <h2>Login Form</h2>
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
        <button type="submit" className="processpayment">Login</button>
      </form>
      <a href="#" className="fp">Forgot password?</a>
      <div className="footer_card">
        <p>Not a member?</p>
        <a href="/signup">Signup now</a>
      </div>
    </div>
    </div>
    </>
  );
};

export default LoginForm;
