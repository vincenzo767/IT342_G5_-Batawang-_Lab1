import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHome, FaGlobeAmericas, FaUtensils, FaUser, FaSignOutAlt, FaTachometerAlt, FaCog } from 'react-icons/fa';
import { RootState } from '../store';
import { logout } from '../store/authSlice';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <FaUtensils className="brand-icon" />
          <span className="brand-name">SynChef</span>
        </Link>

        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <FaHome />
            <span>Home</span>
          </Link>
          <Link
            to="/flavor-map"
            className={`nav-link ${location.pathname === '/flavor-map' ? 'active' : ''}`}
          >
            <FaGlobeAmericas />
            <span>Flavor Map</span>
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/profile"
                className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
              >
                <FaUser />
                <span>Profile</span>
              </Link>
              <Link
                to="/settings"
                className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}
              >
                <FaCog />
                <span>Settings</span>
              </Link>
            </>
          )}
        </div>

        <div className="nav-auth">
          {isAuthenticated && user ? (
            <div className="user-menu">
              <span className="user-greeting">
                <FaUser /> {user.fullName}
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`nav-link login-btn ${location.pathname === '/login' ? 'active' : ''}`}
            >
              <FaUser />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
