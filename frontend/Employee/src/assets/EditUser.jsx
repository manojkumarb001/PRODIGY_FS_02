import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
  const { id } = useParams(); // Extract the id from the URL parameters
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/users/${id}`);
        setFormData(response.data);
      } catch (err) {
        console.error('There was an error fetching the user!', err);
      }
    };

    if (id) {
      fetchUser(); // Call fetchUser only if id is present
    }
  }, [id]);

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
      await axios.put(`http://localhost:5001/users/${id}`, formData);
      navigate('/dashboard'); // Redirect to dashboard after update
    } catch (error) {
      console.error('There was an error updating the user!', error);
    }
  };

  return (
    <div className="EditUser">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditUser;
