// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Footer() {
  return (
    <footer className="footer">
      <nav>
        <ul>
          <li><Link to="/admin-login">Admin Login</Link></li>
          <li><Link to="/employee-login">Employee Login</Link></li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
