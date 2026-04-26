import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-background"></div>
      <div className="splash-content">
        <div className="josephine-logo-container">
          <h1 className="josephine-title">JOSEPHINE</h1>
          <p className="josephine-subtitle">Multi Market Killer</p>
        </div>
        <div className="splash-spinner"></div>
      </div>
      <footer className="splash-footer">© 2026 Josephine Technologies. All Rights Reserved.</footer>
    </div>
  );
};

export default SplashScreen;