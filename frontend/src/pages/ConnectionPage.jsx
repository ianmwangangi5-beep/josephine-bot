import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ConnectionPage.css';

const ConnectionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    appId: '',
    apiKey: '',
    isDemo: true,
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.termsAccepted) {
      setError('You must accept the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/connection/connect',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connection-container">
      <div className="connection-box">
        <h1>Connect to Deriv</h1>
        <p>Enter your Deriv API credentials to get started</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Connected successfully! Redirecting...</div>}

        <form onSubmit={handleConnect} className="connection-form">
          <div className="form-group">
            <label>Account Type</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="isDemo"
                  value="true"
                  checked={formData.isDemo === true}
                  onChange={() => setFormData((prev) => ({ ...prev, isDemo: true }))}
                />
                Demo Account
              </label>
              <label>
                <input
                  type="radio"
                  name="isDemo"
                  value="false"
                  checked={formData.isDemo === false}
                  onChange={() => setFormData((prev) => ({ ...prev, isDemo: false }))}
                />
                Real Account
              </label>
            </div>
          </div>

          <input
            type="text"
            name="appId"
            placeholder="Deriv App ID"
            value={formData.appId}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apiKey"
            placeholder="Deriv API Key"
            value={formData.apiKey}
            onChange={handleChange}
            required
          />

          <div className="terms-box">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              I accept the Terms & Conditions and acknowledge the risks
            </label>
            <button type="button" className="terms-link">View Full Terms</button>
          </div>

          <button type="submit" disabled={loading} className="connect-btn">
            {loading ? 'Connecting...' : 'Connect to Deriv'}
          </button>
        </form>
      </div>
      <footer className="page-footer">© 2026 Josephine Technologies. All Rights Reserved.</footer>
    </div>
  );
};

export default ConnectionPage;