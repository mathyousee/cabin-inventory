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
const functions_1 = require("@azure/functions");
function inventoryHandler(request, context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log('HTTP trigger function processed a request.');
        try {
            const method = request.method;
            const id = request.params.id;
            context.log(`Processing ${method} request${id ? ` for ID ${id}` : ''}`);
            if (method === 'GET') {
                return {
                    status: 200,
                    jsonBody: [
                        {
                            id: '1',
                            name: 'Test Item',
                            quantity: 5,
                            category: 'Pantry',
                            status: 'Enough',
                            lastUpdated: new Date().toISOString(),
                            userId: 'demo-user'
                        }
                    ]
                };
            }
            else {
                return {
                    status: 200,
                    jsonBody: { message: `${method} method received`, id }
                };
            }
        }
        catch (error) {
            context.error('Error:', error);
            return {
                status: 500,
                jsonBody: { error: 'Internal server error' }
            };
        }
    });
}
functions_1.app.http('inventory', {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    authLevel: 'anonymous',
    route: 'inventory/{id?}',
    handler: inventoryHandler
});
//# sourceMappingURL=index.js.map