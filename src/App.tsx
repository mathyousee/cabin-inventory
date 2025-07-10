import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { InventoryApp } from './components/InventoryApp';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <InventoryApp />
      </div>
    </AuthProvider>
  );
}

export default App;
