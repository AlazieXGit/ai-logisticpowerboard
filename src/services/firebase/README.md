# Firebase Services

This directory contains Firebase Admin SDK integration modules for the LoadBoard AI application.

## Modules

### `admin.ts`
Core Firebase Admin SDK initialization and configuration.

**Functions:**
- `initializeFirebaseAdmin(serviceAccountPath?)` - Initialize Firebase Admin SDK
- `getFirebaseAdmin()` - Get Firebase Admin app instance
- `getAuth()` - Get Firebase Auth instance
- `getFirestore()` - Get Firestore instance

### `auth.ts`
Firebase Authentication services for user management.

**Functions:**
- `createUser(params)` - Create a new user
- `getUserById(uid)` - Get user by ID
- `getUserByEmail(email)` - Get user by email
- `updateUser(params)` - Update user information
- `deleteUser(uid)` - Delete a user
- `verifyIdToken(idToken)` - Verify Firebase ID token
- `createCustomToken(uid, claims?)` - Create custom authentication token
- `setCustomUserClaims(uid, claims)` - Set custom user claims for RBAC
- `listUsers(maxResults?, pageToken?)` - List all users

### `userManagement.ts`
User profile and role management services.

**Functions:**
- `createUserProfile(profile)` - Create user profile in Firestore
- `getUserProfile(uid)` - Get user profile
- `updateUserProfile(uid, updates)` - Update user profile
- `assignUserRole(uid, role)` - Assign role to user
- `hasPermission(uid, permission)` - Check user permission
- `addPermission(uid, permission)` - Add permission to user
- `removePermission(uid, permission)` - Remove permission from user
- `deactivateUser(uid)` - Deactivate user account
- `activateUser(uid)` - Activate user account

**User Roles:**
- `ADMIN` - Full system access
- `BROKER` - Broker permissions
- `CARRIER` - Carrier permissions
- `SHIPPER` - Shipper permissions
- `USER` - Basic user permissions

### `database.ts`
Firestore database operations and utilities.

**Functions:**
- `createDocument(collection, data, docId?)` - Create a document
- `getDocument(collection, docId)` - Get a document
- `updateDocument(collection, docId, data)` - Update a document
- `deleteDocument(collection, docId)` - Delete a document
- `queryDocuments(collection, field, operator, value)` - Query documents
- `getAllDocuments(collection, limit?)` - Get all documents
- `batchWrite(operations)` - Batch write operations
- `runTransaction(updateFunction)` - Run a transaction

## Usage Example

```typescript
import { 
  initializeFirebaseAdmin,
  createUser,
  assignUserRole,
  UserRole,
  createDocument
} from './services/firebase';

// Initialize Firebase (do this once at app startup)
initializeFirebaseAdmin('./config/serviceAccountKey.json');

// Create a new user
const user = await createUser({
  email: 'broker@company.com',
  password: 'SecurePassword123!',
  displayName: 'John Broker',
  emailVerified: true
});

// Assign broker role
await assignUserRole(user.uid, UserRole.BROKER);

// Create a load in Firestore
const loadId = await createDocument('loads', {
  origin: 'Los Angeles, CA',
  destination: 'New York, NY',
  weight: '40000',
  rate: '3500',
  status: 'available',
  createdBy: user.uid
});

console.log('Load created:', loadId);
```

## Security

- All Firebase credentials must be kept secure
- Never commit service account keys to version control
- Use environment variables for production deployments
- Implement proper Firestore security rules
- Enable Firebase App Check for additional security

## Testing

Before using in production:

1. **Test Authentication**
   ```typescript
   const user = await createUser({
     email: 'test@example.com',
     password: 'testpass'
   });
   console.log('User created:', user.uid);
   ```

2. **Test Firestore Access**
   ```typescript
   const docId = await createDocument('test', { name: 'test' });
   const doc = await getDocument('test', docId);
   console.log('Document:', doc);
   ```

3. **Test Role Management**
   ```typescript
   await assignUserRole(user.uid, UserRole.BROKER);
   const hasPermission = await hasPermission(user.uid, 'loads.create');
   console.log('Has permission:', hasPermission);
   ```

## Documentation

See [FIREBASE_SETUP.md](../../FIREBASE_SETUP.md) for complete setup and deployment instructions.

## Support

For issues or questions:
- Check Firebase Console for error messages
- Review Firebase Admin SDK documentation
- Verify environment configuration
- Contact development team
