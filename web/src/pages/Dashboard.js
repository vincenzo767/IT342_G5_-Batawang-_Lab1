import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return user.username.charAt(0).toUpperCase();
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>🍳 SynChef Dashboard</h1>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {getInitials(user.fullName)}
          </div>
          <div className="profile-info">
            <h2>{user.fullName || user.username}</h2>
            <p>@{user.username}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-item">
            <label>User ID</label>
            <p>#{user.id}</p>
          </div>

          <div className="profile-item">
            <label>Username</label>
            <p>{user.username}</p>
          </div>

          <div className="profile-item">
            <label>Email Address</label>
            <p>{user.email}</p>
          </div>

          <div className="profile-item">
            <label>Full Name</label>
            <p>{user.fullName || 'Not provided'}</p>
          </div>

          <div className="profile-item">
            <label>Phone Number</label>
            <p>{user.phoneNumber || 'Not provided'}</p>
          </div>

          <div className="profile-item">
            <label>Member Since</label>
            <p>{formatDate(user.createdAt)}</p>
          </div>

          <div className="profile-item">
            <label>Account Status</label>
            <p>
              <span className={`status-badge ${user.isActive ? 'status-active' : 'status-inactive'}`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
