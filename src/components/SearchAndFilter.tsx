import React from 'react';
import { Category, ItemStatus } from '../types';
import './SearchAndFilter.css';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: Category | 'All';
  onCategoryChange: (category: Category | 'All') => void;
  selectedStatus: ItemStatus | 'All';
  onStatusChange: (status: ItemStatus | 'All') => void;
  itemCount: number;
}

const categories: (Category | 'All')[] = ['All', 'Pantry', 'Fresh Food', 'Household', 'Personal Care', 'Outdoor', 'Other'];
const statuses: (ItemStatus | 'All')[] = ['All', 'Buy', 'Bring', 'Low', 'Enough', 'Packed'];

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  itemCount,
}) => {
  return (
    <div className="search-filter">
      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          <div className="item-count">{itemCount} items</div>
        </div>
      </div>
      
      <div className="filter-sections">
        <div className="filter-section">
          <label className="filter-label">Category:</label>
          <div className="filter-tabs">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`filter-tab ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="filter-section">
          <label className="filter-label">Status:</label>
          <div className="filter-tabs">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => onStatusChange(status)}
                className={`filter-tab status-${status.toLowerCase()} ${selectedStatus === status ? 'active' : ''}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
