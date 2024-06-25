import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './header/Home';
import About from './header/About';
import Contact from './header/Contact';
import Header from './header/Header';
import CourseDetail from './MainBody/CourseDetail';
import OrderConfirmation from './MainBody/OrderConfirmation';
import PropsDataSend from './MainBody/propsdatasend';
import signuplogin from './login-signup-folder/signup-login'
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courselist/:name" element={<CourseDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/Allcourses" element={<PropsDataSend/>} />
      </Routes>
    </Router>
  );
}

export default App;
