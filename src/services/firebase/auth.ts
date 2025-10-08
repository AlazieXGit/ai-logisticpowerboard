/**
 * Firebase Authentication Service
 * Handles user authentication, verification, and token management
 */

import { getAuth } from './admin';
import type { UserRecord } from 'firebase-admin/auth';

export interface CreateUserParams {
  email: string;
  password: string;
  displayName?: string;
  phoneNumber?: string;
  photoURL?: string;
  emailVerified?: boolean;
}

export interface UpdateUserParams {
  uid: string;
  email?: string;
  password?: string;
  displayName?: string;
  phoneNumber?: string;
  photoURL?: string;
  emailVerified?: boolean;
  disabled?: boolean;
}

/**
 * Create a new user in Firebase Authentication
 * @param params - User creation parameters
 * @returns Created user record
 */
export async function createUser(params: CreateUserParams): Promise<UserRecord> {
  try {
    const auth = getAuth();
    const userRecord = await auth.createUser({
      email: params.email,
      password: params.password,
      displayName: params.displayName,
      phoneNumber: params.phoneNumber,
      photoURL: params.photoURL,
      emailVerified: params.emailVerified || false,
    });

    console.log('Successfully created new user:', userRecord.uid);
    return userRecord;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Get user by UID
 * @param uid - User ID
 * @returns User record
 */
export async function getUserById(uid: string): Promise<UserRecord> {
  try {
    const auth = getAuth();
    const userRecord = await auth.getUser(uid);
    return userRecord;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

/**
 * Get user by email
 * @param email - User email
 * @returns User record
 */
export async function getUserByEmail(email: string): Promise<UserRecord> {
  try {
    const auth = getAuth();
    const userRecord = await auth.getUserByEmail(email);
    return userRecord;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

/**
 * Update user information
 * @param params - User update parameters
 * @returns Updated user record
 */
export async function updateUser(params: UpdateUserParams): Promise<UserRecord> {
  try {
    const auth = getAuth();
    const userRecord = await auth.updateUser(params.uid, {
      email: params.email,
      password: params.password,
      displayName: params.displayName,
      phoneNumber: params.phoneNumber,
      photoURL: params.photoURL,
      emailVerified: params.emailVerified,
      disabled: params.disabled,
    });

    console.log('Successfully updated user:', userRecord.uid);
    return userRecord;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

/**
 * Delete a user
 * @param uid - User ID
 */
export async function deleteUser(uid: string): Promise<void> {
  try {
    const auth = getAuth();
    await auth.deleteUser(uid);
    console.log('Successfully deleted user:', uid);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

/**
 * Verify an ID token
 * @param idToken - Firebase ID token
 * @returns Decoded token
 */
export async function verifyIdToken(idToken: string) {
  try {
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
}

/**
 * Create a custom token for a user
 * @param uid - User ID
 * @param claims - Additional claims to include in the token
 * @returns Custom token
 */
export async function createCustomToken(
  uid: string,
  claims?: object
): Promise<string> {
  try {
    const auth = getAuth();
    const customToken = await auth.createCustomToken(uid, claims);
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw error;
  }
}

/**
 * Set custom user claims (for role-based access control)
 * @param uid - User ID
 * @param claims - Custom claims object
 */
export async function setCustomUserClaims(
  uid: string,
  claims: object
): Promise<void> {
  try {
    const auth = getAuth();
    await auth.setCustomUserClaims(uid, claims);
    console.log('Successfully set custom claims for user:', uid);
  } catch (error) {
    console.error('Error setting custom claims:', error);
    throw error;
  }
}

/**
 * List all users (paginated)
 * @param maxResults - Maximum number of results (default 1000)
 * @param pageToken - Page token for pagination
 * @returns List of users
 */
export async function listUsers(maxResults = 1000, pageToken?: string) {
  try {
    const auth = getAuth();
    const listUsersResult = await auth.listUsers(maxResults, pageToken);
    return listUsersResult;
  } catch (error) {
    console.error('Error listing users:', error);
    throw error;
  }
}

export default {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  verifyIdToken,
  createCustomToken,
  setCustomUserClaims,
  listUsers,
};
