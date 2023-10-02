import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
        if (!token) {
      console.error("JWT token missing!");
      return;
    }

    const axiosInstance = axios.create({
      baseURL: 'https://tt-front.duplessy.eu/api',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    axiosInstance.get('/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleCreateUser = () => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error("JWT token missing!");
      return;
    }

    const axiosInstance = axios.create({
      baseURL: 'https://tt-front.duplessy.eu/api',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    axiosInstance.post('/users', newUser)
      .then((response) => {
        setUsers((prevUsers) => [...prevUsers, response.data]);
        setNewUser({ username: '', email: '', password: '' });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  const handleDeleteUser = (userId) => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error("JWT token missing!");
      return;
    }

    const axiosInstance = axios.create({
      baseURL: 'https://tt-front.duplessy.eu/api',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    axiosInstance.delete(`/users/${userId}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      <table>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button className="edit-button">Edit</button>
                <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input
          placeholder='Username'
          type="text"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
      </div>
      <div>
        <input
          placeholder='Email'
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
      </div>
      <div>
        <input
          placeholder='Password'
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
      </div>
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
}

export default Users;
