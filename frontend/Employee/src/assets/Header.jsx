// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
function Header() {
  return (
    <div>
    <header className="header">
      <nav>
        <ul>
          <li><Link to="#home">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
    <h2 id="home">Home</h2>
    
    
    </div>
  );
}

export default Header;
