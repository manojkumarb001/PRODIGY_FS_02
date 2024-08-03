import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/users');
        setUsers(response.data);
      } catch (err) {
        console.log('There was an error fetching the users!', err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('There was an error deleting the user!', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleAddUser = () => {
    navigate('/register'); 
  };

  return (
    <div className='dashboard-content'>
      <div className="Dashboard">
        <h1>User Dashboard</h1>
        <div className="dashboard-actions">
          <button className="buttonStyle" onClick={handleAddUser} title="Add New Employee">
            <FaPlus /> Add Employee
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Date Registered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.position}</td>
                <td>{user.department}</td>
                <td>{user.salary}</td>
                <td>{new Date(user.date).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleEdit(user._id)} title="Edit">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(user._id)} title="Delete">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
<br />
        <div className="dashboard-actions">
          <Link to="/admin-homepage"><button className="buttonStyle">Back to HomePage</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
