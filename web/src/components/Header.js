import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo" onClick={() => navigate('/')}>
          <span className="logo-icon">🔍</span>
          <span className="logo-text">SynChef</span>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <button 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button 
            className="nav-link flavor-map"
            onClick={() => alert('Flavor Map feature coming soon!')}
          >
            🌍 Flavor Map
          </button>
        </nav>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          {isAuthenticated && user ? (
            <>
              <span className="user-name">{user.username || user.email}</span>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </button>
              <button 
                className="btn btn-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn btn-login"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button 
                className="btn btn-register"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
