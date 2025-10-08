/**
 * Firebase Admin SDK Services
 * Main export file for all Firebase-related services
 */

// Admin initialization
export * from './admin';

// Authentication services
export * from './auth';

// User management services
export * from './userManagement';

// Database services
export * from './database';

// Re-export commonly used types
export type { UserRecord } from 'firebase-admin/auth';
export type { DocumentData } from 'firebase-admin/firestore';
