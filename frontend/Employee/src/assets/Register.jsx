import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    position: '',
    department: '',
    salary: ''
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/register', formData);
      if (response.data.Status === "Success") {
        alert('User registered successfully');
        navigate('/Dashboard');
      } else {
        setError(response.data.Message || 'Registration failed');
      }
    } catch (err) {
      console.log('There was an error registering the user!', err);
      setError('An error occurred during registration. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Register">
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <br />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <div>
          <label>Position:</label>
          <select name="position" value={formData.position} onChange={handleChange} required>
            <option value="">Select Position</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div>
          <label>Department:</label>
          <select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <label>Salary:</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;
