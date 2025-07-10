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
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseService = void 0;
// In-memory database for development/demo purposes
// In production, this would use Azure CosmosDB
class DatabaseService {
    constructor() {
        this.items = [];
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
    getItems(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.items.filter(item => item.userId === userId);
        });
    }
    createItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = Object.assign(Object.assign({}, item), { id: this.generateId(), lastUpdated: new Date().toISOString() });
            this.items.push(newItem);
            return newItem;
        });
    }
    updateItem(id, userId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingIndex = this.items.findIndex(item => item.id === id && item.userId === userId);
            if (existingIndex === -1) {
                throw new Error('Item not found or access denied');
            }
            const updatedItem = Object.assign(Object.assign(Object.assign({}, this.items[existingIndex]), updates), { id,
                userId, lastUpdated: new Date().toISOString() });
            this.items[existingIndex] = updatedItem;
            return updatedItem;
        });
    }
    deleteItem(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingIndex = this.items.findIndex(item => item.id === id && item.userId === userId);
            if (existingIndex === -1) {
                throw new Error('Item not found or access denied');
            }
            this.items.splice(existingIndex, 1);
        });
    }
    generateId() {
        return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }
}
exports.databaseService = new DatabaseService();
//# sourceMappingURL=database.js.map