/**
 * Firebase Integration Examples
 * Ready-to-use code snippets for integrating Firebase Admin SDK
 */

// Example 1: Initialize Firebase and create a test user
export async function example1_InitializeAndCreateUser() {
  const { 
    initializeFirebaseAdmin, 
    createUser 
  } = await import('../services/firebase');

  // Initialize Firebase (replace with your service account path)
  try {
    initializeFirebaseAdmin();
    console.log('✓ Firebase initialized');
  } catch (error) {
    console.log('Note: Firebase already initialized or using default credentials');
  }

  // Create a test user
  try {
    const user = await createUser({
      email: 'test@loadboard-ai.com',
      password: 'TestPassword123!',
      displayName: 'Test User',
      emailVerified: true
    });

    console.log('✓ User created successfully:', {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    });

    return user;
  } catch (error: any) {
    console.error('✗ Failed to create user:', error.message);
    throw error;
  }
}

// Example 2: Assign role to user and check permissions
export async function example2_RoleManagement(uid: string) {
  const { 
    assignUserRole, 
    UserRole,
    hasPermission,
    addPermission 
  } = await import('../services/firebase');

  try {
    // Assign broker role
    await assignUserRole(uid, UserRole.BROKER);
    console.log('✓ Assigned broker role to user');

    // Add specific permission
    await addPermission(uid, 'loads.create');
    console.log('✓ Added loads.create permission');

    // Check permission
    const canCreate = await hasPermission(uid, 'loads.create');
    console.log('✓ User can create loads:', canCreate);

    return { canCreate };
  } catch (error: any) {
    console.error('✗ Role management failed:', error.message);
    throw error;
  }
}

// Example 3: Create and manage Firestore documents
export async function example3_FirestoreOperations() {
  const { 
    createDocument, 
    getDocument,
    updateDocument,
    queryDocuments 
  } = await import('../services/firebase');

  try {
    // Create a load document
    const loadId = await createDocument('loads', {
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      weight: '40000',
      rate: '3500',
      equipment: 'Dry Van',
      status: 'available',
      urgency: 'medium'
    });
    console.log('✓ Load created with ID:', loadId);

    // Get the document
    const load = await getDocument('loads', loadId);
    console.log('✓ Load retrieved:', load);

    // Update the document
    await updateDocument('loads', loadId, {
      status: 'assigned'
    });
    console.log('✓ Load status updated');

    // Query documents
    const availableLoads = await queryDocuments(
      'loads',
      'status',
      '==',
      'available'
    );
    console.log('✓ Available loads found:', availableLoads.length);

    return { loadId, load, availableLoads };
  } catch (error: any) {
    console.error('✗ Firestore operation failed:', error.message);
    throw error;
  }
}

// Example 4: Verify authentication token
export async function example4_VerifyToken(idToken: string) {
  const { verifyIdToken } = await import('../services/firebase');

  try {
    const decodedToken = await verifyIdToken(idToken);
    console.log('✓ Token verified:', {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role
    });

    return decodedToken;
  } catch (error: any) {
    console.error('✗ Token verification failed:', error.message);
    throw error;
  }
}

// Example 5: Batch operations
export async function example5_BatchOperations() {
  const { batchWrite } = await import('../services/firebase');

  try {
    // Create multiple loads at once
    await batchWrite([
      {
        type: 'create',
        collection: 'loads',
        docId: 'load-001',
        data: {
          origin: 'Chicago, IL',
          destination: 'Miami, FL',
          weight: '30000',
          rate: '2800',
          status: 'available'
        }
      },
      {
        type: 'create',
        collection: 'loads',
        docId: 'load-002',
        data: {
          origin: 'Seattle, WA',
          destination: 'Boston, MA',
          weight: '45000',
          rate: '4200',
          status: 'available'
        }
      },
      {
        type: 'create',
        collection: 'loads',
        docId: 'load-003',
        data: {
          origin: 'Houston, TX',
          destination: 'Denver, CO',
          weight: '35000',
          rate: '3000',
          status: 'available'
        }
      }
    ]);

    console.log('✓ Batch operations completed: 3 loads created');
  } catch (error: any) {
    console.error('✗ Batch operation failed:', error.message);
    throw error;
  }
}

// Example 6: Complete user onboarding flow
export async function example6_UserOnboarding(
  email: string,
  password: string,
  displayName: string,
  role: 'broker' | 'carrier' | 'shipper'
) {
  const { 
    createUser,
    assignUserRole,
    UserRole,
    createUserProfile
  } = await import('../services/firebase');

  try {
    // Step 1: Create authentication user
    const user = await createUser({
      email,
      password,
      displayName,
      emailVerified: false
    });
    console.log('✓ Step 1: User authentication created');

    // Step 2: Assign role
    const userRole = role === 'broker' ? UserRole.BROKER :
                     role === 'carrier' ? UserRole.CARRIER :
                     UserRole.SHIPPER;
    
    await assignUserRole(user.uid, userRole);
    console.log('✓ Step 2: Role assigned:', userRole);

    // Step 3: Create user profile
    await createUserProfile({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      role: userRole,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    });
    console.log('✓ Step 3: User profile created');

    console.log('✓ User onboarding completed successfully!');

    return {
      uid: user.uid,
      email: user.email,
      role: userRole
    };
  } catch (error: any) {
    console.error('✗ User onboarding failed:', error.message);
    throw error;
  }
}

// Run all examples (for testing)
export async function runAllExamples() {
  console.log('\n=== Firebase Integration Examples ===\n');

  try {
    console.log('--- Example 1: Initialize and Create User ---');
    const user = await example1_InitializeAndCreateUser();
    
    console.log('\n--- Example 2: Role Management ---');
    await example2_RoleManagement(user.uid);
    
    console.log('\n--- Example 3: Firestore Operations ---');
    await example3_FirestoreOperations();
    
    console.log('\n--- Example 5: Batch Operations ---');
    await example5_BatchOperations();
    
    console.log('\n--- Example 6: User Onboarding ---');
    await example6_UserOnboarding(
      'broker@example.com',
      'SecurePass123!',
      'John Broker',
      'broker'
    );
    
    console.log('\n✓ All examples completed successfully!');
  } catch (error) {
    console.error('\n✗ Examples failed:', error);
  }
}

// Example usage in a Node.js script:
// import { runAllExamples } from './firebaseExamples';
// runAllExamples().catch(console.error);
