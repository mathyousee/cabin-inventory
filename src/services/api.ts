import { InventoryItem } from '../types';

const API_BASE_URL = '/api';

class ApiService {
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getInventoryItems(): Promise<InventoryItem[]> {
    return this.makeRequest<InventoryItem[]>('/inventory');
  }

  async createItem(item: Omit<InventoryItem, 'id' | 'lastUpdated' | 'userId'>): Promise<InventoryItem> {
    return this.makeRequest<InventoryItem>('/inventory', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async updateItem(id: string, item: Partial<InventoryItem>): Promise<InventoryItem> {
    return this.makeRequest<InventoryItem>(`/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    });
  }

  async deleteItem(id: string): Promise<void> {
    await this.makeRequest<void>(`/inventory/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
