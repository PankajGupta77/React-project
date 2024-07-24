import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ email, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="header">
      <h1 className='display-4'>Welcome to <span className='text-primary'>LearnXpert</span></h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/Allcourses">Start Learning</Link></li>
          <li className='Logout'><img className="logoutimg"src="https://cdn-icons-png.flaticon.com/512/2529/2529508.png" onClick={handleLogout} /></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
