import React from 'react';
import Users from '../../components/Dashboard/Users';
import Posts from '../../components/Dashboard/Posts';
import './dashboard.css';
import useAuth from '../../config/hooks/auth';

function Dashboard() {
  const { user } = useAuth();

  if (user && user.isAdmin) {
    return (
      <div>
        <h1>Backoffice Dashboard</h1>
        <div className="dashboard-container">
          <div className="users-container">
            <h2>Manage Users</h2>
            <Users />
          </div>
          <div className="posts-container">
            <h2>Manage Posts</h2>
            <Posts />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Unauthorized Access</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }
}

export default Dashboard;
