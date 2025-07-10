export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
  category: Category;
  status: ItemStatus;
  notes?: string;
  location?: string;
  lastUpdated: string;
  userId: string;
}

export type Category = 
  | 'Pantry'
  | 'Fresh Food'
  | 'Household'
  | 'Personal Care'
  | 'Outdoor'
  | 'Other';

export type ItemStatus = 
  | 'Enough'
  | 'Low'
  | 'Buy'
  | 'Bring'
  | 'Packed';

export interface User {
  userId: string;
  userDetails: string;
  userRoles: string[];
  claims: any[];
  identityProvider: string;
}
