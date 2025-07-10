import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { InventoryItem, Category, ItemStatus } from '../types';
import { apiService } from '../services/api';
import { Header } from './Header';
import { SearchAndFilter } from './SearchAndFilter';
import { ItemCard } from './ItemCard';
import { AddItemModal } from './AddItemModal';
import { EditItemModal } from './EditItemModal';
import './InventoryApp.css';

export const InventoryApp: React.FC = () => {
  const { user, isLoading, login } = useAuth();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<ItemStatus | 'All'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, selectedCategory, selectedStatus]);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await apiService.getInventoryItems();
      setItems(data);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedStatus !== 'All') {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }

    setFilteredItems(filtered);
  };

  const handleAddItem = async (itemData: Omit<InventoryItem, 'id' | 'lastUpdated' | 'userId'>) => {
    try {
      const newItem = await apiService.createItem(itemData);
      setItems(prev => [...prev, newItem]);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateItem = async (id: string, updates: Partial<InventoryItem>) => {
    try {
      const updatedItem = await apiService.updateItem(id, updates);
      setItems(prev => prev.map(item => item.id === id ? updatedItem : item));
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await apiService.deleteItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="login-screen">
        <div className="login-content">
          <h1>🏚️ Cabin Inventory</h1>
          <p>Track and manage your cabin supplies with ease</p>
          <button onClick={login} className="login-button">
            Sign In to Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="inventory-app">
      <Header 
        user={user} 
        onAddItem={() => setShowAddModal(true)}
      />
      
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        itemCount={filteredItems.length}
      />

      <div className="items-container">
        {loading ? (
          <div className="loading">Loading items...</div>
        ) : filteredItems.length === 0 ? (
          <div className="empty-state">
            <h3>No items found</h3>
            <p>Add your first inventory item to get started!</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="add-first-item-btn"
            >
              Add Item
            </button>
          </div>
        ) : (
          <div className="items-grid">
            {filteredItems.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={setEditingItem}
                onDelete={handleDeleteItem}
                onQuickUpdate={handleUpdateItem}
              />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddItem}
        />
      )}

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={handleUpdateItem}
        />
      )}
    </div>
  );
};
