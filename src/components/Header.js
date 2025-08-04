import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useHistory, useLocation } from 'react-router-dom';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { user, logout, isAdmin } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigateTo = (path) => {
    history.push(path);
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  if (!user) {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <h1>{t('yogaBooking')}</h1>
          </div>
          <div className="navbar-language">
            <button 
              onClick={() => changeLanguage('th')}
              className={`lang-btn ${i18n.language === 'th' ? 'active' : ''}`}
            >
              ไทย
            </button>
            <button 
              onClick={() => changeLanguage('en')}
              className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1 onClick={() => navigateTo('/')}>
            {t('yogaBooking')}
          </h1>
        </div>

        <div className="navbar-desktop">
          <div className="navbar-nav">
            <button 
              onClick={() => navigateTo('/')}
              className={`nav-link ${isActivePath('/') ? 'active' : ''}`}
            >
              {t('booking', 'จองคลาส')}
            </button>
            {isAdmin() && (
              <button 
                onClick={() => navigateTo('/admin')}
                className={`nav-link ${isActivePath('/admin') ? 'active' : ''}`}
              >
                {t('adminPanel', 'จัดการระบบ')}
              </button>
            )}
          </div>

          <div className="navbar-actions">
            <div className="language-toggle">
              <button 
                onClick={() => changeLanguage('th')}
                className={`lang-btn ${i18n.language === 'th' ? 'active' : ''}`}
              >
                ไทย
              </button>
              <button 
                onClick={() => changeLanguage('en')}
                className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
              >
                EN
              </button>
            </div>

            <div className="user-menu">
              <div className="user-info">
                <span className="user-email">{user.email}</span>
                {isAdmin() && <span className="admin-badge">Admin</span>}
              </div>
              <button onClick={handleLogout} className="logout-btn">
                {t('logout')}
              </button>
            </div>
          </div>
        </div>

        <div className="navbar-mobile">
          <div className="language-toggle-mobile">
            <button 
              onClick={() => changeLanguage(i18n.language === 'th' ? 'en' : 'th')}
              className="lang-toggle-btn"
            >
              {i18n.language === 'th' ? 'EN' : 'ไทย'}
            </button>
          </div>
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-header">
              <div className="mobile-user-info">
                <span className="mobile-user-email">{user.email}</span>
                {isAdmin() && <span className="mobile-admin-badge">Admin</span>}
              </div>
            </div>
            <div className="mobile-menu-nav">
              <button 
                onClick={() => navigateTo('/')}
                className={`mobile-nav-link ${isActivePath('/') ? 'active' : ''}`}
              >
                {t('booking', 'จองคลาส')}
              </button>
              {isAdmin() && (
                <button 
                  onClick={() => navigateTo('/admin')}
                  className={`mobile-nav-link ${isActivePath('/admin') ? 'active' : ''}`}
                >
                  {t('adminPanel', 'จัดการระบบ')}
                </button>
              )}
            </div>
            <div className="mobile-menu-footer">
              <button onClick={handleLogout} className="mobile-logout-btn">
                {t('logout')}
              </button>
            </div>
          </div>
        )}
      </div>

      {user && (
        <div className="navbar-subtitle">
          <div className="navbar-container">
            <p>{t('welcomeMessage')}</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
