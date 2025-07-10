import { InventoryItem } from './types';

// In-memory database for development/demo purposes
// In production, this would use Azure CosmosDB
class DatabaseService {
  private items: InventoryItem[] = [];

  constructor() {
    // Initialize with some sample data
    this.items = [
      {
        id: 'sample1',
        name: 'Canned Beans',
        quantity: 5,
        unit: 'cans',
        category: 'Pantry',
        status: 'Enough',
        notes: 'Good protein source',
        location: 'Kitchen pantry',
        lastUpdated: new Date().toISOString(),
        userId: 'demo-user'
      },
      {
        id: 'sample2',
        name: 'Toilet Paper',
        quantity: 2,
        unit: 'rolls',
        category: 'Household',
        status: 'Low',
        notes: 'Need to buy more',
        location: 'Bathroom',
        lastUpdated: new Date().toISOString(),
        userId: 'demo-user'
      }
    ];
  }

  async getItems(userId: string): Promise<InventoryItem[]> {
    return this.items.filter(item => item.userId === userId);
  }

  async createItem(item: Omit<InventoryItem, 'id' | 'lastUpdated'> & { userId: string }): Promise<InventoryItem> {
    const newItem: InventoryItem = {
      ...item,
      id: this.generateId(),
      lastUpdated: new Date().toISOString(),
    };

    this.items.push(newItem);
    return newItem;
  }

  async updateItem(id: string, userId: string, updates: Partial<InventoryItem>): Promise<InventoryItem> {
    const existingIndex = this.items.findIndex(item => item.id === id && item.userId === userId);
    
    if (existingIndex === -1) {
      throw new Error('Item not found or access denied');
    }

    const updatedItem: InventoryItem = {
      ...this.items[existingIndex],
      ...updates,
      id,
      userId,
      lastUpdated: new Date().toISOString(),
    };

    this.items[existingIndex] = updatedItem;
    return updatedItem;
  }

  async deleteItem(id: string, userId: string): Promise<void> {
    const existingIndex = this.items.findIndex(item => item.id === id && item.userId === userId);
    
    if (existingIndex === -1) {
      throw new Error('Item not found or access denied');
    }

    this.items.splice(existingIndex, 1);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }
}

export const databaseService = new DatabaseService();
