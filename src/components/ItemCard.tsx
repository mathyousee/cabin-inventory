import React, { useState } from 'react';
import { InventoryItem, ItemStatus } from '../types';
import './ItemCard.css';

interface ItemCardProps {
  item: InventoryItem;
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
  onQuickUpdate: (id: string, updates: Partial<InventoryItem>) => void;
}

const statusOptions: ItemStatus[] = ['Enough', 'Low', 'Buy', 'Bring', 'Packed'];

export const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete, onQuickUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity !== item.quantity) {
      setIsUpdating(true);
      try {
        await onQuickUpdate(item.id, { quantity: newQuantity });
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleStatusChange = async (newStatus: ItemStatus) => {
    if (newStatus !== item.status) {
      setIsUpdating(true);
      try {
        await onQuickUpdate(item.id, { status: newStatus });
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Pantry': '#28a745',
      'Fresh Food': '#17a2b8',
      'Household': '#6f42c1',
      'Personal Care': '#e83e8c',
      'Outdoor': '#fd7e14',
      'Other': '#6c757d'
    };
    return colors[category] || colors.Other;
  };

  return (
    <div className={`item-card ${isUpdating ? 'updating' : ''}`}>
      <div className="item-header">
        <div className="item-title-section">
          <h3 className="item-name">{item.name}</h3>
          <span 
            className="category-badge" 
            style={{ backgroundColor: getCategoryColor(item.category) }}
          >
            {item.category}
          </span>
        </div>
        <button 
          onClick={() => onDelete(item.id)} 
          className="delete-btn"
          title="Delete item"
        >
          🗑️
        </button>
      </div>

      <div className="item-content">
        <div className="quantity-section">
          <label className="quantity-label">
            Quantity: {item.quantity} {item.unit || 'items'}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            className="quantity-slider"
            disabled={isUpdating}
          />
          <div className="quantity-input-container">
            <input
              type="number"
              min="0"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="quantity-input"
              disabled={isUpdating}
            />
          </div>
        </div>

        <div className="status-section">
          <label className="status-label">Status:</label>
          <select
            value={item.status}
            onChange={(e) => handleStatusChange(e.target.value as ItemStatus)}
            className={`status-select status-${item.status.toLowerCase()}`}
            disabled={isUpdating}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {item.notes && (
          <div className="notes-section">
            <p className="notes-text">{item.notes}</p>
          </div>
        )}

        {item.location && (
          <div className="location-section">
            <span className="location-text">📍 {item.location}</span>
          </div>
        )}
      </div>

      <div className="item-footer">
        <span className="last-updated">Updated {formatLastUpdated(item.lastUpdated)}</span>
        <button onClick={() => onEdit(item)} className="edit-btn">
          Edit
        </button>
      </div>
    </div>
  );
};
