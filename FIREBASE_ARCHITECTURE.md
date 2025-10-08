# Firebase Admin SDK Architecture

This document explains the architecture and integration of Firebase Admin SDK in the LoadBoard AI application.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     LoadBoard AI Application                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐ │
│  │   Frontend   │      │   Backend    │      │  Admin API   │ │
│  │  React App   │◄────►│   Services   │◄────►│   Routes     │ │
│  └──────────────┘      └──────────────┘      └──────────────┘ │
│         │                      │                      │         │
│         │                      │                      │         │
│         ▼                      ▼                      ▼         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            Firebase Admin SDK Services                   │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │  │
│  │  │   Auth   │  │   User   │  │ Database │  │  Index  │ │  │
│  │  │ Service  │  │   Mgmt   │  │ Service  │  │  (Main) │ │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                    │
└────────────────────────────┼────────────────────────────────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │     Firebase Platform        │
              ├──────────────────────────────┤
              │                              │
              │  ┌────────────────────────┐  │
              │  │   Authentication       │  │
              │  │  - User Management     │  │
              │  │  - Token Verification  │  │
              │  │  - Custom Claims       │  │
              │  └────────────────────────┘  │
              │                              │
              │  ┌────────────────────────┐  │
              │  │     Firestore DB       │  │
              │  │  - User Profiles       │  │
              │  │  - Loads               │  │
              │  │  - Companies           │  │
              │  │  - Transactions        │  │
              │  └────────────────────────┘  │
              │                              │
              │  ┌────────────────────────┐  │
              │  │   Security Rules       │  │
              │  │  - Role-based Access   │  │
              │  │  - Owner Protection    │  │
              │  │  - Admin Override      │  │
              │  └────────────────────────┘  │
              │                              │
              └──────────────────────────────┘
```

## Component Details

### 1. Firebase Admin SDK Services

#### `admin.ts` - Core Initialization
- Initializes Firebase Admin SDK
- Manages credentials (env var, file path, or default)
- Provides access to Auth and Firestore instances
- Singleton pattern to prevent multiple initializations

```typescript
initializeFirebaseAdmin() → Firebase App Instance
getAuth() → Firebase Auth Instance
getFirestore() → Firestore Instance
```

#### `auth.ts` - Authentication Service
- User creation and management
- Token verification
- Custom claims (for RBAC)
- User listing and search

```typescript
createUser() → UserRecord
verifyIdToken() → DecodedToken
setCustomUserClaims() → void
```

#### `userManagement.ts` - User & Role Management
- User profile management in Firestore
- Role assignment (Admin, Broker, Carrier, Shipper, User)
- Permission management
- Account activation/deactivation

```typescript
assignUserRole() → void
hasPermission() → boolean
addPermission() → void
```

#### `database.ts` - Firestore Operations
- CRUD operations
- Queries and filtering
- Batch operations
- Transactions

```typescript
createDocument() → docId
queryDocuments() → DocumentData[]
batchWrite() → void
```

### 2. Data Flow

#### User Registration Flow
```
1. Frontend → POST /api/auth/signup
2. Backend → createUser(email, password)
3. Firebase Auth → Create User Account
4. Backend → assignUserRole(uid, role)
5. Backend → createUserProfile(profile)
6. Firestore → Store User Profile
7. Backend → Return user data to Frontend
```

#### Authentication Flow
```
1. Frontend → User Login
2. Firebase Client SDK → Get ID Token
3. Frontend → Send token to Backend
4. Backend → verifyIdToken(token)
5. Firebase Auth → Verify & Decode Token
6. Backend → Check permissions
7. Backend → Allow/Deny request
```

#### Data Access Flow
```
1. Frontend → Request data
2. Backend → Verify authentication
3. Backend → Check user role/permissions
4. Backend → Query Firestore
5. Firestore → Apply security rules
6. Firestore → Return filtered data
7. Backend → Return to Frontend
```

## Security Layers

### Layer 1: Firebase Authentication
- JWT token verification
- Custom claims for roles
- Token expiration

### Layer 2: Firestore Security Rules
- Document-level access control
- Role-based permissions
- Owner-based access

### Layer 3: Backend Validation
- Additional business logic validation
- Rate limiting
- Input sanitization

## Database Collections

### users
```typescript
{
  uid: string,
  email: string,
  displayName: string,
  role: 'admin' | 'broker' | 'carrier' | 'shipper' | 'user',
  company: string,
  permissions: string[],
  isActive: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### loads
```typescript
{
  id: string,
  origin: string,
  destination: string,
  weight: string,
  rate: string,
  status: 'available' | 'assigned' | 'in_transit' | 'delivered',
  createdBy: string,
  assignedTo: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### companies
```typescript
{
  id: string,
  name: string,
  type: 'broker' | 'carrier' | 'shipper',
  ownerId: string,
  verified: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Role-Based Access Control

### Admin Role
- Full system access
- User management
- System configuration
- All CRUD operations

### Broker Role
- Create and manage loads
- View carriers
- Assign loads to carriers
- View own transactions

### Carrier Role
- View available loads
- Accept load assignments
- Update delivery status
- View own transactions

### Shipper Role
- Create shipping requests
- View load status
- Manage shipments
- View own transactions

### User Role (Default)
- Basic read access
- View public information
- Limited functionality

## Integration Points

### 1. Client-Side (React)
```typescript
// Use Firebase Client SDK for authentication
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
const userCredential = await signInWithEmailAndPassword(auth, email, password);
const idToken = await userCredential.user.getIdToken();

// Send token to backend for verification
```

### 2. Server-Side (Backend)
```typescript
// Use Firebase Admin SDK for verification
import { verifyIdToken } from './services/firebase';

const decodedToken = await verifyIdToken(idToken);
// Now you have verified user UID, email, and role
```

### 3. Database Operations
```typescript
// Use Firestore through Admin SDK
import { createDocument, queryDocuments } from './services/firebase';

const loadId = await createDocument('loads', loadData);
const loads = await queryDocuments('loads', 'status', '==', 'available');
```

## Environment Configuration

### Development
```bash
FIREBASE_SERVICE_ACCOUNT_PATH=./config/serviceAccountKey.json
NODE_ENV=development
```

### Production
```bash
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account",...}'
FIREBASE_PROJECT_ID=your-project-id
NODE_ENV=production
```

## Deployment Checklist

- [ ] Generate Firebase service account key
- [ ] Set up environment variables
- [ ] Deploy Firestore security rules
- [ ] Test authentication flow
- [ ] Test role assignments
- [ ] Verify database operations
- [ ] Test API endpoints
- [ ] Enable Firebase App Check (optional)
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

## Monitoring & Logging

### Firebase Console
- Authentication metrics
- Firestore usage
- Security rule evaluations
- Performance monitoring

### Application Logs
- User creation events
- Authentication attempts
- Permission checks
- Database operations
- Error tracking

## Best Practices

1. **Always verify tokens server-side** - Never trust client-side authentication
2. **Use custom claims for roles** - Stored in token, checked on every request
3. **Implement proper security rules** - Defense in depth
4. **Log security events** - Audit trail for compliance
5. **Use transactions for critical operations** - Maintain data consistency
6. **Implement rate limiting** - Prevent abuse
7. **Regular security audits** - Review rules and permissions
8. **Backup strategy** - Regular Firestore exports

## Troubleshooting

### Common Issues

1. **"Firebase Admin SDK not initialized"**
   - Ensure `initializeFirebaseAdmin()` is called at app startup
   - Check service account credentials

2. **"Permission Denied"**
   - Deploy Firestore security rules
   - Verify user has correct role
   - Check custom claims are set

3. **"Invalid Token"**
   - Token may be expired
   - Verify token format (Bearer scheme)
   - Check clock synchronization

4. **"Document not found"**
   - Verify document path
   - Check user has read permissions
   - Confirm document exists

## Resources

- [Firebase Admin SDK Documentation](https://firebase.google.com/docs/admin/setup)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [QUICKSTART.md](./QUICKSTART.md) - Quick setup guide
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Detailed setup guide
