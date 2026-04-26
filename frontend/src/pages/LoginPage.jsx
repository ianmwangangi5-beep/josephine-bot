import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPages.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useGoogle, setUseGoogle] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Welcome Back</h1>
        <p>Log in to Josephine Multi Market Killer</p>

        {error && <div className="error-message">{error}</div>}

        {!useGoogle ? (
          <form onSubmit={handleEmailLogin} className="auth-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        ) : (
          <button onClick={handleGoogleLogin} className="google-btn">
            <img src="/google-icon.png" alt="Google" />
            Log in with Google
          </button>
        )}

        <div className="auth-toggle">
          <button onClick={() => setUseGoogle(!useGoogle)} className="toggle-btn">
            {useGoogle ? 'Use Email' : 'Use Google'}
          </button>
        </div>

        <p className="auth-footer">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="link-btn">
            Sign Up
          </button>
        </p>
      </div>
      <footer className="page-footer">© 2026 Josephine Technologies. All Rights Reserved.</footer>
    </div>
  );
};

export default LoginPage;