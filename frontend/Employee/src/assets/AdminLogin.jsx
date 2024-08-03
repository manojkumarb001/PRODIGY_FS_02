import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/admin-login', formData);
      if (response.data.Status === "Success") {
        navigate('/admin-homepage');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error('There was an error logging in!', err);
      alert('An error occurred during login');
    }
  };

  return (
    <div className="AdminLogin">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="create-account-link">
        <p>Don't have an account?</p>
        <Link to="/create-account">
          <button className="create-account-button">Create Account
          <div className="stars">⭐</div>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AdminLogin;
