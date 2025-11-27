import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Welcome = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Role: {user?.role}</p>
      <button onClick={() => navigate('/change-password')}>Change Password</button>
      {user?.role === 'Admin' && <button onClick={() => navigate('/admin')}>Admin Dashboard</button>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Welcome;