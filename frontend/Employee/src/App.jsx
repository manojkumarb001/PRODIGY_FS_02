import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './assets/Register';
import Dashboard from './assets/Dashboard';
import Home from './assets/Home';
import EditUser from './assets/EditUser';
import AdminLogin from './assets/AdminLogin';
import CreateAccount from './assets/CreateAccount';
import EmployeeLogin from './assets/EmployeeLogin';
import AdminHomePage from './assets/AdminHomePage';

import EmployeeHomePage from './assets/EmployeeHomePage';
import ProfilePage from './assets/ProfilePage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/create-account" element={<CreateAccount />} />

        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/admin-homepage" element={<AdminHomePage />} />
        <Route path="/employee-homepage" element={<EmployeeHomePage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </div>
  );
}

export default App;
