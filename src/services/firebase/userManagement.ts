/**
 * User Management Service
 * Handles user role management, permissions, and profile operations
 */

import { getFirestore } from './admin';
import { setCustomUserClaims, getUserById } from './auth';

export enum UserRole {
  ADMIN = 'admin',
  BROKER = 'broker',
  CARRIER = 'carrier',
  SHIPPER = 'shipper',
  USER = 'user',
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: UserRole;
  company?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  permissions?: string[];
}

/**
 * Create user profile in Firestore
 * @param profile - User profile data
 */
export async function createUserProfile(profile: UserProfile): Promise<void> {
  try {
    const db = getFirestore();
    const userRef = db.collection('users').doc(profile.uid);
    
    await userRef.set({
      ...profile,
      createdAt: profile.createdAt || new Date(),
      updatedAt: new Date(),
      isActive: profile.isActive !== undefined ? profile.isActive : true,
    });

    console.log('User profile created successfully:', profile.uid);
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

/**
 * Get user profile from Firestore
 * @param uid - User ID
 * @returns User profile
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const db = getFirestore();
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return null;
    }

    return userDoc.data() as UserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

/**
 * Update user profile
 * @param uid - User ID
 * @param updates - Profile updates
 */
export async function updateUserProfile(
  uid: string,
  updates: Partial<UserProfile>
): Promise<void> {
  try {
    const db = getFirestore();
    const userRef = db.collection('users').doc(uid);

    await userRef.update({
      ...updates,
      updatedAt: new Date(),
    });

    console.log('User profile updated successfully:', uid);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

/**
 * Assign role to user
 * @param uid - User ID
 * @param role - User role
 */
export async function assignUserRole(uid: string, role: UserRole): Promise<void> {
  try {
    // Set custom claims for role-based access
    await setCustomUserClaims(uid, { role });

    // Update profile in Firestore
    await updateUserProfile(uid, { role });

    console.log('User role assigned successfully:', uid, role);
  } catch (error) {
    console.error('Error assigning user role:', error);
    throw error;
  }
}

/**
 * Check if user has permission
 * @param uid - User ID
 * @param permission - Permission to check
 * @returns True if user has permission
 */
export async function hasPermission(
  uid: string,
  permission: string
): Promise<boolean> {
  try {
    const profile = await getUserProfile(uid);
    
    if (!profile) {
      return false;
    }

    // Admin has all permissions
    if (profile.role === UserRole.ADMIN) {
      return true;
    }

    // Check specific permissions
    return profile.permissions?.includes(permission) || false;
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
}

/**
 * Add permission to user
 * @param uid - User ID
 * @param permission - Permission to add
 */
export async function addPermission(uid: string, permission: string): Promise<void> {
  try {
    const profile = await getUserProfile(uid);
    
    if (!profile) {
      throw new Error('User profile not found');
    }

    const permissions = profile.permissions || [];
    if (!permissions.includes(permission)) {
      permissions.push(permission);
      await updateUserProfile(uid, { permissions });
    }

    console.log('Permission added successfully:', uid, permission);
  } catch (error) {
    console.error('Error adding permission:', error);
    throw error;
  }
}

/**
 * Remove permission from user
 * @param uid - User ID
 * @param permission - Permission to remove
 */
export async function removePermission(
  uid: string,
  permission: string
): Promise<void> {
  try {
    const profile = await getUserProfile(uid);
    
    if (!profile) {
      throw new Error('User profile not found');
    }

    const permissions = profile.permissions || [];
    const filteredPermissions = permissions.filter((p) => p !== permission);
    await updateUserProfile(uid, { permissions: filteredPermissions });

    console.log('Permission removed successfully:', uid, permission);
  } catch (error) {
    console.error('Error removing permission:', error);
    throw error;
  }
}

/**
 * Deactivate user account
 * @param uid - User ID
 */
export async function deactivateUser(uid: string): Promise<void> {
  try {
    await updateUserProfile(uid, { isActive: false });
    console.log('User deactivated successfully:', uid);
  } catch (error) {
    console.error('Error deactivating user:', error);
    throw error;
  }
}

/**
 * Activate user account
 * @param uid - User ID
 */
export async function activateUser(uid: string): Promise<void> {
  try {
    await updateUserProfile(uid, { isActive: true });
    console.log('User activated successfully:', uid);
  } catch (error) {
    console.error('Error activating user:', error);
    throw error;
  }
}

export default {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  assignUserRole,
  hasPermission,
  addPermission,
  removePermission,
  deactivateUser,
  activateUser,
};
