import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPages.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    whatsappNumber: '',
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useGoogle, setUseGoogle] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.termsAccepted) {
      setError('You must accept the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        whatsappNumber: formData.whatsappNumber,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/connection');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    // Google OAuth logic
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Create Account</h1>
        <p>Join Josephine Multi Market Killer</p>

        {error && <div className="error-message">{error}</div>}

        {!useGoogle ? (
          <form onSubmit={handleEmailSignup} className="auth-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
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
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="whatsappNumber"
              placeholder="WhatsApp Number (e.g., +254713020146)"
              value={formData.whatsappNumber}
              onChange={handleChange}
              required
            />
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              I accept the Terms & Conditions
            </label>
            <button type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        ) : (
          <div className="google-signup">
            <button onClick={handleGoogleSignup} className="google-btn">
              <img src="/google-icon.png" alt="Google" />
              Sign up with Google
            </button>
          </div>
        )}

        <div className="auth-toggle">
          <button onClick={() => setUseGoogle(!useGoogle)} className="toggle-btn">
            {useGoogle ? 'Use Email' : 'Use Google'}
          </button>
        </div>

        <p className="auth-footer">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="link-btn">
            Log In
          </button>
        </p>
      </div>
      <footer className="page-footer">© 2026 Josephine Technologies. All Rights Reserved.</footer>
    </div>
  );
};

export default SignupPage;