import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './header/Home';
import About from './header/About';
import Contact from './header/Contact';
import Header from './header/Header';
import CourseDetail from './MainBody/CourseDetail';
import OrderConfirmation from './MainBody/OrderConfirmation';
import PropsDataSend from './MainBody/propsdatasend';
import LoginForm from './login-signup-folder/login';
import SignupForm from './login-signup-folder/signup';
import TermsAndConditions from './header/TermsAndConditions';
import PrivacyPolicy from './header/PrivacyPolicy';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const storedEmail = localStorage.getItem('email');
    if (auth && storedEmail) {
      setIsAuthenticated(true);
      setEmail(storedEmail);
    }
  }, []);

  const handleLogin = () => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      setIsAuthenticated(true);
    }
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('email');
    localStorage.removeItem('_id');
  };

  return (
    <Router>
      {isAuthenticated && <Header email={email} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/courselist/:name" element={isAuthenticated ? <CourseDetail /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/about" element={isAuthenticated ? <About /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/contact" element={isAuthenticated ? <Contact /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/order-confirmation" element={isAuthenticated ? <OrderConfirmation /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/Allcourses" element={isAuthenticated ? <PropsDataSend /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/terms-and-conditions" element={isAuthenticated ? <TermsAndConditions /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/Privacy-Policy" element={isAuthenticated ? <PrivacyPolicy /> : <LoginForm onLogin={handleLogin} />} />
        {/* <Route path="/terms-and-conditions" component={TermsAndConditions} /> */}
        {/* <Route path="/Privacy-Policy" component={PrivacyPolicy} /> */}
        <Route path="/signup" element={<SignupForm onSignup={handleLogin} />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
