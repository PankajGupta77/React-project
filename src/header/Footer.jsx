import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const goToContact = () => {
    navigate('/contact');
  }
  const PrivacyPolicy=()=>{
    navigate('/Privacy-Policy');
  }
  const TermsService=()=>{
    navigate('/terms-and-conditions');
  }

  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-0">&copy; 2024 LearnXpert. All rights reserved.</p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a role="button" onClick={PrivacyPolicy} className="text-white">Privacy Policy</a>
          </li>
          <li className="list-inline-item">
            <a role="button" onClick={TermsService} className="text-white">Terms of Service</a>
          </li>
          <li className="list-inline-item">
            <a className="text-white" role="button" onClick={goToContact}>Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
