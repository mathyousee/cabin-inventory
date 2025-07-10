import express from 'express';
import cors from 'cors';
import { requireAuth } from './shared/auth';
import { databaseService } from './shared/database';
import { InventoryItem } from './shared/types';

const app = express();
const port = process.env.PORT || 7071;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Inventory routes
app.get('/api/inventory', async (req, res) => {
    try {
        const user = requireAuth(req as any);
        const items = await databaseService.getItems(user.userId);
        res.json(items);
    } catch (error: any) {
        console.error('Error getting items:', error);
        res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
});

app.post('/api/inventory', async (req, res) => {
    try {
        const user = requireAuth(req as any);
        const itemData = req.body as Omit<InventoryItem, 'id' | 'lastUpdated' | 'userId'>;
        
        if (!itemData.name || !itemData.category || !itemData.status) {
            return res.status(400).json({ error: 'Name, category, and status are required' });
        }
        
        const newItem = await databaseService.createItem({ ...itemData, userId: user.userId });
        res.status(201).json(newItem);
    } catch (error: any) {
        console.error('Error creating item:', error);
        res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
});

app.put('/api/inventory/:id', async (req, res) => {
    try {
        const user = requireAuth(req as any);
        const { id } = req.params;
        const updates = req.body as Partial<InventoryItem>;
        
        const updatedItem = await databaseService.updateItem(id, user.userId, updates);
        res.json(updatedItem);
    } catch (error: any) {
        console.error('Error updating item:', error);
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
});

app.delete('/api/inventory/:id', async (req, res) => {
    try {
        const user = requireAuth(req as any);
        const { id } = req.params;
        
        await databaseService.deleteItem(id, user.userId);
        res.status(204).send();
    } catch (error: any) {
        console.error('Error deleting item:', error);
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Cabin Inventory API running on port ${port}`);
    console.log(`📍 Health check: http://localhost:${port}/api/health`);
    console.log(`📦 Inventory API: http://localhost:${port}/api/inventory`);
});
