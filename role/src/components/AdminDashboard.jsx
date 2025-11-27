import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert("Please login first");

      const res = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users', err);
      alert('Failed to fetch users. Check backend server or token.');
    }
  };

  const createUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert("Please login first");
      if (!newUser.name || !newUser.email || !newUser.password) return alert("All fields required");

      await axios.post('http://localhost:5000/api/admin/users', newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("User created successfully!");
      setNewUser({ name: '', email: '', password: '', role: 'Student' });
      fetchUsers();
    } catch (err) {
      console.error('Error creating user', err);
      alert('Failed to create user. Check backend server or token.');
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert("Please login first");

      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user', err);
      alert('Failed to delete user. Check backend server or token.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Create User</h2>
      <input placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
      <input placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
      <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
      
      <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
        <option value="Student">Student</option>
        <option value="Admin">Admin</option>
        <option value="Teacher">Teacher</option>
      </select>
      <button onClick={createUser}>Create</button>

      <h2>All Users</h2>
      <ul>
        {users.length > 0 ? users.map(user => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.role}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        )) : <p>No users found</p>}
      </ul>
    </div>
  );
};

export default AdminDashboard;