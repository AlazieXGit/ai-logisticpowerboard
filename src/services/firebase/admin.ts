/**
 * Firebase Admin SDK Configuration
 * This module initializes the Firebase Admin SDK for server-side operations
 * including authentication, Firestore access, and user management.
 */

import * as admin from 'firebase-admin';

let firebaseAdmin: admin.app.App | null = null;

/**
 * Initialize Firebase Admin SDK
 * @param serviceAccountPath - Path to the service account key JSON file
 * @returns Initialized Firebase Admin app instance
 */
export function initializeFirebaseAdmin(serviceAccountPath?: string): admin.app.App {
  // Prevent multiple initializations
  if (firebaseAdmin && firebaseAdmin.name) {
    return firebaseAdmin;
  }

  try {
    // Check if already initialized
    if (admin.apps.length > 0) {
      firebaseAdmin = admin.app();
      return firebaseAdmin;
    }

    // Initialize with service account
    if (serviceAccountPath) {
      const serviceAccount = require(serviceAccountPath);
      firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      // Initialize with environment variable
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      // Initialize with default credentials
      firebaseAdmin = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    } else {
      // For development/testing - use mock or application default
      console.warn('No Firebase credentials provided. Using application default credentials.');
      firebaseAdmin = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }

    console.log('Firebase Admin SDK initialized successfully');
    return firebaseAdmin;
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    throw error;
  }
}

/**
 * Get Firebase Admin instance
 * @returns Firebase Admin app instance
 */
export function getFirebaseAdmin(): admin.app.App {
  if (!firebaseAdmin) {
    throw new Error('Firebase Admin SDK not initialized. Call initializeFirebaseAdmin() first.');
  }
  return firebaseAdmin;
}

/**
 * Get Firebase Auth instance
 * @returns Firebase Auth instance
 */
export function getAuth(): admin.auth.Auth {
  return getFirebaseAdmin().auth();
}

/**
 * Get Firestore instance
 * @returns Firestore instance
 */
export function getFirestore(): admin.firestore.Firestore {
  return getFirebaseAdmin().firestore();
}

export default {
  initializeFirebaseAdmin,
  getFirebaseAdmin,
  getAuth,
  getFirestore,
};
