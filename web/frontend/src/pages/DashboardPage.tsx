import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBookOpen, FaUserCog, FaChartLine, FaClipboardCheck } from 'react-icons/fa';
import { RootState } from '../store';
import './LearningWorkspace.css';

const DashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const learningTracks = [
    { title: 'Knife Skills', progress: 'Beginner', lesson: 'Safe slicing and julienne basics' },
    { title: 'Flavor Pairing', progress: 'Intermediate', lesson: 'Balance acidity, sweetness, and umami' },
    { title: 'Meal Planning', progress: 'Beginner', lesson: 'Build a 3-day prep strategy' },
  ];

  return (
    <div className="workspace-page page">
      <div className="container">
        <div className="workspace-header card">
          <h1>Learning Dashboard</h1>
          <p>Welcome back, {user?.fullName || 'Chef'}! Continue your culinary learning journey.</p>
        </div>

        <div className="workspace-grid grid grid-2">
          <div className="card workspace-section">
            <h2><FaBookOpen /> Active Learning Tracks</h2>
            <ul className="workspace-list">
              {learningTracks.map((track) => (
                <li key={track.title}>
                  <strong>{track.title}</strong>
                  <span>{track.progress} • {track.lesson}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card workspace-section">
            <h2><FaChartLine /> Weekly Goals</h2>
            <ul className="workspace-list">
              <li><strong>2 new recipes</strong><span>Explore one cuisine you have never cooked before</span></li>
              <li><strong>3 practice sessions</strong><span>Complete prep, cook, and plating flow</span></li>
              <li><strong>1 reflection note</strong><span>Document what worked and what to improve</span></li>
            </ul>
          </div>

          <div className="card workspace-section">
            <h2><FaClipboardCheck /> Quick Actions</h2>
            <div className="workspace-actions">
              <Link to="/" className="btn btn-primary">Browse Recipes</Link>
              <Link to="/flavor-map" className="btn btn-secondary">Open Flavor Map</Link>
              <Link to="/profile" className="btn btn-secondary">View Profile</Link>
              <Link to="/settings" className="btn btn-secondary">Learning Settings</Link>
            </div>
          </div>

          <div className="card workspace-section">
            <h2><FaUserCog /> Account Snapshot</h2>
            <ul className="workspace-list">
              <li><strong>Email</strong><span>{user?.email || 'Not available'}</span></li>
              <li><strong>Username</strong><span>{user?.username || 'Not available'}</span></li>
              <li><strong>Email Verified</strong><span>{user?.emailVerified ? 'Yes' : 'No'}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
