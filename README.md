# Cabin Inventory Tracker

A mobile-first web application for tracking and managing inventory items at a cabin. Built with React and Azure Functions, designed for deployment on Azure Static Web Apps.

## Features

- **Mobile-First Design**: Optimized for smartphones and tablets
- **Authentication**: Secure login using Azure Static Web Apps authentication
- **Real-time Updates**: Add, edit, and delete inventory items with instant feedback
- **Smart Filtering**: Filter by category, status, or search by name
- **Visual Controls**: Slider controls for easy quantity adjustments
- **Status Management**: Track items as Buy, Bring, Low, Enough, or Packed
- **Categories**: Organize items by Pantry, Fresh Food, Household, Personal Care, Outdoor, or Other

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **CSS3** with mobile-first responsive design
- **Azure Static Web Apps** authentication integration

### Backend
- **Azure Functions** with TypeScript
- **Azure CosmosDB** for data storage (in-memory for development)
- **RESTful API** with user-scoped data isolation

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Azure CLI (for deployment)
- Azure Functions Core Tools (for local API development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cabin-inventory
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install API dependencies**
   ```bash
   cd api
   npm install
   cd ..
   ```

### Development

1. **Start the React development server**
   ```bash
   npm start
   ```
   The app will open at http://localhost:3000

2. **Start the Azure Functions API (in a separate terminal)**
   ```bash
   cd api
   npm run start
   ```
   The API will be available at http://localhost:7071

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Deployment to Azure Static Web Apps

### Prerequisites
- Azure subscription
- GitHub repository

### Setup

1. **Create Azure Resources**
   - Create an Azure Static Web Apps resource in the Azure portal
   - Connect it to your GitHub repository
   - Configure the build settings:
     - App location: `/`
     - API location: `api`
     - Output location: `build`

2. **Configure Authentication**
   - In Azure portal, go to your Static Web App → Authentication
   - Configure GitHub as an identity provider
   - Set up client ID and client secret

3. **Set Up CosmosDB (for production)**
   - Create an Azure CosmosDB account
   - Create a database named `CabinInventoryDB`
   - Create a container named `inventory` with partition key `/userId`
   - Add the connection string to your Static Web App configuration

4. **Environment Variables**
   Set these in your Azure Static Web App configuration:
   ```
   COSMOS_DB_CONNECTION_STRING=<your-cosmosdb-connection-string>
   GITHUB_CLIENT_ID=<your-github-client-id>
   GITHUB_CLIENT_SECRET=<your-github-client-secret>
   ```

### GitHub Actions Deployment

The repository includes GitHub Actions workflow for automatic deployment. When you connect your Static Web App to GitHub, it will automatically create the workflow file.

## Project Structure

```
cabin-inventory/
├── public/                 # Static assets
├── src/                   # React application source
│   ├── components/        # React components
│   ├── contexts/          # React context providers
│   ├── services/          # API service layer
│   └── types.ts          # TypeScript type definitions
├── api/                   # Azure Functions API
│   ├── shared/            # Shared utilities and types
│   ├── inventory/         # Inventory CRUD operations
│   └── package.json       # API dependencies
├── staticwebapp.config.json # Azure Static Web Apps configuration
└── README.md
```

## API Endpoints

All API endpoints require authentication and are user-scoped.

- `GET /api/inventory` - Get all inventory items for the authenticated user
- `POST /api/inventory` - Create a new inventory item
- `PUT /api/inventory/{id}` - Update an existing inventory item
- `DELETE /api/inventory/{id}` - Delete an inventory item

## Security

- **Authentication Required**: All API endpoints require valid authentication
- **User Isolation**: Data is partitioned by user ID to ensure privacy
- **HTTPS Only**: All communications are encrypted
- **CORS Configured**: Proper CORS settings for the frontend domain

## Mobile Optimization

- **Touch-Friendly**: Minimum 44px touch targets
- **Responsive Design**: Adapts to all screen sizes
- **Fast Loading**: Optimized bundle size and lazy loading
- **Offline-Ready**: PWA capabilities for basic offline functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the Azure Static Web Apps documentation
- Review the Azure Functions documentation
