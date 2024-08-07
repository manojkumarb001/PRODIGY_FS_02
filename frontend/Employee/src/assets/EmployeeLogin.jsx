import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function EmployeeLogin() {
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
      const response = await axios.post('http://localhost:5001/employee-login', formData);
      if (response.data.Status === "Success") {
        // Store the email in localStorage
        localStorage.setItem('employeeEmail', formData.email);
        // Navigate to employee homepage
        navigate('/employee-homepage');
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
      <h1>Employee Login</h1>
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
      
    </div>
  );
}

export default EmployeeLogin;
