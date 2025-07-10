"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./shared/auth");
const database_1 = require("./shared/database");
const app = (0, express_1.default)();
const port = process.env.PORT || 7071;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Inventory routes
app.get('/api/inventory', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (0, auth_1.requireAuth)(req);
        const items = yield database_1.databaseService.getItems(user.userId);
        res.json(items);
    }
    catch (error) {
        console.error('Error getting items:', error);
        res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
}));
app.post('/api/inventory', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (0, auth_1.requireAuth)(req);
        const itemData = req.body;
        if (!itemData.name || !itemData.category || !itemData.status) {
            return res.status(400).json({ error: 'Name, category, and status are required' });
        }
        const newItem = yield database_1.databaseService.createItem(Object.assign(Object.assign({}, itemData), { userId: user.userId }));
        res.status(201).json(newItem);
    }
    catch (error) {
        console.error('Error creating item:', error);
        res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
}));
app.put('/api/inventory/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (0, auth_1.requireAuth)(req);
        const { id } = req.params;
        const updates = req.body;
        const updatedItem = yield database_1.databaseService.updateItem(id, user.userId, updates);
        res.json(updatedItem);
    }
    catch (error) {
        console.error('Error updating item:', error);
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
}));
app.delete('/api/inventory/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (0, auth_1.requireAuth)(req);
        const { id } = req.params;
        yield database_1.databaseService.deleteItem(id, user.userId);
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting item:', error);
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
}));
// Start server
app.listen(port, () => {
    console.log(`🚀 Cabin Inventory API running on port ${port}`);
    console.log(`📍 Health check: http://localhost:${port}/api/health`);
    console.log(`📦 Inventory API: http://localhost:${port}/api/inventory`);
});
//# sourceMappingURL=express-server.js.map