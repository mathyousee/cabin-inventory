import { HttpRequest } from '@azure/functions';
import { User } from './types';

export function getUserFromRequest(req: HttpRequest): User | null {
  // For development/demo purposes, return a demo user
  // In production with Azure Static Web Apps, this would parse the x-ms-client-principal header
  const clientPrincipal = req.headers['x-ms-client-principal'];
  
  if (clientPrincipal) {
    try {
      const decoded = Buffer.from(clientPrincipal, 'base64').toString('utf-8');
      const user = JSON.parse(decoded);
      return user;
    } catch (error) {
      console.error('Error parsing client principal:', error);
    }
  }

  // Return demo user for development
  return {
    userId: 'demo-user',
    userDetails: 'demo@example.com',
    userRoles: ['authenticated'],
    claims: [],
    identityProvider: 'demo'
  };
}

export function requireAuth(req: HttpRequest): User {
  const user = getUserFromRequest(req);
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}
