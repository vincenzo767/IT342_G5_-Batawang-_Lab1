import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthResponse, setLoading, setError } from '../store/authSlice';
import authAPI from '../services/authAPI';
import { RootState } from '../store';
import '../styles/Auth.css';

const LoginPage: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    dispatch(setLoading(true));

    try {
      const response = await authAPI.login({
        emailOrUsername,
        password,
      });

      dispatch(setAuthResponse({
        token: response.data.token,
        user: {
          id: response.data.id,
          email: response.data.email,
          username: response.data.username,
          fullName: response.data.fullName,
          profileImageUrl: response.data.profileImageUrl,
          emailVerified: response.data.emailVerified,
        }
      }));

      navigate('/dashboard');
    } catch (err: any) {
      const message = err.response?.data?.message
        || (err.request ? 'Cannot reach backend API. Start backend server on http://localhost:8080.' : 'Login failed. Please check your credentials.');
      setLocalError(message);
      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Enter your credentials to access your kitchen</p>

        {localError && <div className="auth-error">{localError}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="emailOrUsername">Email or Username</label>
            <input
              id="emailOrUsername"
              type="text"
              placeholder="your-email@example.com or username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
