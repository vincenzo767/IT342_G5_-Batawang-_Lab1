import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthResponse, setLoading, setError } from '../store/authSlice';
import authAPI from '../services/authAPI';
import { RootState } from '../store';
import '../styles/Auth.css';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });
  const [localError, setLocalError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';

    if (!formData.username) errors.username = 'Username is required';
    else if (formData.username.length < 3) errors.username = 'Username must be at least 3 characters';

    if (!formData.fullName) errors.fullName = 'Full name is required';

    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!validateForm()) {
      return;
    }

    dispatch(setLoading(true));

    try {
      const response = await authAPI.register({
        email: formData.email,
        username: formData.username,
        fullName: formData.fullName,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
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
        || (err.request ? 'Cannot reach backend API. Start backend server on http://localhost:8080.' : 'Registration failed. Please try again.');
      setLocalError(message);
      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Your Account</h1>
        <p>Join the cooking revolution with SynChef</p>

        {localError && <div className="auth-error">{localError}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {validationErrors.fullName && <span className="field-error">{validationErrors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {validationErrors.email && <span className="field-error">{validationErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="your_username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {validationErrors.username && <span className="field-error">{validationErrors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {validationErrors.password && <span className="field-error">{validationErrors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {validationErrors.confirmPassword && <span className="field-error">{validationErrors.confirmPassword}</span>}
          </div>

          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
