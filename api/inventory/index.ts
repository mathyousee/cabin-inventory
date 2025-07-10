import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

async function inventoryHandler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
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
        } else {
            return {
                status: 200,
                jsonBody: { message: `${method} method received`, id }
            };
        }
    } catch (error) {
        context.error('Error:', error);
        return {
            status: 500,
            jsonBody: { error: 'Internal server error' }
        };
    }
}

app.http('inventory', {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    authLevel: 'anonymous',
    route: 'inventory/{id?}',
    handler: inventoryHandler
});
