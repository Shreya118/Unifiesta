import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';
import whiteLogo from '../components/whitelogo.png'; // Replace with correct path

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <div className="header-wrapper">
        <img src={whiteLogo} alt="UNIFIESTA Logo" className="popup-logo" />
      </div>

      <h1 className="main-title"><b>UNIFIESTA</b></h1>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/logo.png" alt="Logo" className="nav-logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-btn" to="/">Home</Link>
              </li>
              {user && user.role === 'admin' && (
                <li className="nav-item">
                  <Link className="nav-btn" to="/admin">Admin</Link>
                </li>
              )}
              {user && user.role !== 'admin' && (
                <li className="nav-item">
                  <Link className="nav-btn" to="/dashboard">Dashboard</Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav">
              {user ? (
                <li className="nav-item">
                  <button className="nav-btn" onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-btn" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-btn" to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
