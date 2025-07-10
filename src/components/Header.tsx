import React from 'react';
import { User } from '../types';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

interface HeaderProps {
  user: User;
  onAddItem: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onAddItem }) => {
  const { logout } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">🏚️ Cabin Inventory</h1>
          <span className="user-info">Welcome, {user.userDetails}</span>
        </div>
        <div className="header-right">
          <button onClick={onAddItem} className="add-item-btn">
            + Add Item
          </button>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
