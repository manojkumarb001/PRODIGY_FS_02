import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('employeeEmail');
    if (email) {
      fetchProfile(email);
    } else {
      setError('No employee email found');
    }
  }, []);

  const fetchProfile = async (email) => {
    try {
      const response = await axios.get('http://localhost:5001/employee-profile', {
        params: { email }
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to fetch profile');
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {profile ? (
        <div className='profile'>
                <h3>Welcome {profile.name}</h3>

          <h4>Profile Details</h4>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Position: {profile.position}</p>
          <p>Department: {profile.department}</p>
          <p>Salary: {profile.salary}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default ProfilePage;
