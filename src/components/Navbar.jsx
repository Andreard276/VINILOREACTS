import React from 'react';

export default function Navbar({ currentPage, onNavigate, user, onLogout }) {
  const pages = ['Dashboard', 'Productos', 'Admin', 'Perfil'];
  
  if (user?.role !== 'admin') {
    pages.splice(2, 1); // Remove Admin tab for non-admin users
  }

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <h1 className="navbar-brand">ViniloStore</h1>
        
        <div className="nav-tabs">
          {pages.map((page) => (
            <button
              key={page}
              className={`nav-tab ${currentPage === page ? 'active' : ''}`}
              onClick={() => onNavigate(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <div className="nav-user">
          <span className="user-name">{user?.name}</span>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
