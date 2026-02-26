import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './LearningWorkspace.css';

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="workspace-page page">
      <div className="container">
        <div className="workspace-header card">
          <h1>Chef Profile</h1>
          <p>Track your identity and current account details in one place.</p>
        </div>

        <div className="workspace-grid grid grid-2">
          <div className="card workspace-section">
            <h2>Personal Information</h2>
            <div className="profile-field">
              <strong>Full Name</strong>
              <span>{user?.fullName || 'Not set'}</span>
            </div>
            <div className="profile-field">
              <strong>Email</strong>
              <span>{user?.email || 'Not set'}</span>
            </div>
            <div className="profile-field">
              <strong>Username</strong>
              <span>{user?.username || 'Not set'}</span>
            </div>
          </div>

          <div className="card workspace-section">
            <h2>Learning Persona</h2>
            <div className="profile-field">
              <strong>Focus</strong>
              <span>Global home cooking</span>
            </div>
            <div className="profile-field">
              <strong>Current Level</strong>
              <span>Beginner to Intermediate</span>
            </div>
            <div className="profile-field">
              <strong>Progress Status</strong>
              <span>Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
