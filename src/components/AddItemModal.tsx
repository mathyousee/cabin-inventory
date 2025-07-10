import React, { useState } from 'react';
import { Category, ItemStatus, InventoryItem } from '../types';
import './Modal.css';

interface AddItemModalProps {
  onClose: () => void;
  onAdd: (item: Omit<InventoryItem, 'id' | 'lastUpdated' | 'userId'>) => void;
}

const categories: Category[] = ['Pantry', 'Fresh Food', 'Household', 'Personal Care', 'Outdoor', 'Other'];
const statuses: ItemStatus[] = ['Enough', 'Low', 'Buy', 'Bring', 'Packed'];

export const AddItemModal: React.FC<AddItemModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    unit: '',
    category: 'Pantry' as Category,
    status: 'Enough' as ItemStatus,
    notes: '',
    location: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      await onAdd({
        name: formData.name.trim(),
        quantity: formData.quantity,
        unit: formData.unit.trim() || undefined,
        category: formData.category,
        status: formData.status,
        notes: formData.notes.trim() || undefined,
        location: formData.location.trim() || undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Item</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="form-input"
              placeholder="Enter item name"
              required
              autoFocus
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity" className="form-label">Quantity *</label>
              <input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="unit" className="form-label">Unit</label>
              <input
                id="unit"
                type="text"
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
                className="form-input"
                placeholder="e.g., pieces, lbs, oz"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category" className="form-label">Category *</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="form-select"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status" className="form-label">Status *</label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="form-select"
                required
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="form-input"
              placeholder="e.g., Kitchen pantry, Bathroom"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes" className="form-label">Notes</label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="form-textarea"
              placeholder="Additional notes or description"
              rows={3}
            />
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              onClick={onClose} 
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting || !formData.name.trim()}
            >
              {isSubmitting ? 'Adding...' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
