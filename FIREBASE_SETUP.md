# Firebase Admin SDK Integration Guide

This guide explains how to set up and use Firebase Admin SDK in the LoadBoard AI application.

## Prerequisites

1. A Firebase project (create one at [Firebase Console](https://console.firebase.google.com))
2. Firebase Admin SDK installed: `npm install firebase-admin`
3. Service account key JSON file from Firebase Console

## Installation

### 1. Install Dependencies

```bash
npm install firebase-admin
```

### 2. Generate Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Project Settings** > **Service Accounts**
4. Click **Generate New Private Key**
5. Save the JSON file securely (e.g., `serviceAccountKey.json`)

**Important:** Never commit this file to version control!

### 3. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then edit `.env` with your Firebase credentials:

```env
FIREBASE_SERVICE_ACCOUNT_PATH=./config/serviceAccountKey.json
FIREBASE_PROJECT_ID=your-project-id
```

## Usage Examples

### Python Implementation

```python
import firebase_admin
from firebase_admin import credentials

# Initialize Firebase Admin SDK
cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Use Firebase services
from firebase_admin import auth, firestore

# Create a user
user = auth.create_user(
    email='user@example.com',
    password='securepassword',
    display_name='John Doe'
)

# Access Firestore
db = firestore.client()
```

### JavaScript/Node.js Implementation

```javascript
const admin = require("firebase-admin");

// Initialize with service account
const serviceAccount = require("./path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Use Firebase services
const auth = admin.auth();
const db = admin.firestore();
```

### TypeScript Implementation (LoadBoard AI)

```typescript
import { initializeFirebaseAdmin, getAuth, getFirestore } from './services/firebase';

// Initialize Firebase Admin
initializeFirebaseAdmin('./config/serviceAccountKey.json');

// Use authentication
import { createUser, verifyIdToken } from './services/firebase';

const user = await createUser({
  email: 'user@example.com',
  password: 'securepassword',
  displayName: 'John Doe'
});

// Verify a token
const decodedToken = await verifyIdToken(idToken);
```

### Java Implementation

Add dependency to `build.gradle`:

```gradle
dependencies {
    implementation 'com.google.firebase:firebase-admin:9.2.0'
}
```

Initialize Firebase:

```java
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import java.io.FileInputStream;

FileInputStream serviceAccount = 
    new FileInputStream("path/to/serviceAccountKey.json");

FirebaseOptions options = new FirebaseOptions.Builder()
    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
    .build();

FirebaseApp.initializeApp(options);
```

### Go Implementation

Install package:

```bash
go get firebase.google.com/go
```

Initialize Firebase:

```go
import (
    "fmt"
    "context"

    firebase "firebase.google.com/go"
    "firebase.google.com/go/auth"
    "google.golang.org/api/option"
)

opt := option.WithCredentialsFile("path/to/serviceAccountKey.json")
app, err := firebase.NewApp(context.Background(), nil, opt)
if err != nil {
    return nil, fmt.Errorf("error initializing app: %v", err)
}

client, err := app.Auth(context.Background())
```

## Testing Authentication

### 1. Create a Test User

```typescript
import { createUser } from './services/firebase';

const testUser = await createUser({
  email: 'test@loadboard-ai.com',
  password: 'TestPassword123!',
  displayName: 'Test User',
  emailVerified: true
});

console.log('Test user created:', testUser.uid);
```

### 2. Verify Token

```typescript
import { verifyIdToken } from './services/firebase';

try {
  const decodedToken = await verifyIdToken(userIdToken);
  console.log('User authenticated:', decodedToken.uid);
} catch (error) {
  console.error('Authentication failed:', error);
}
```

### 3. Test Firestore Access

```typescript
import { createDocument, getDocument } from './services/firebase';

// Create a test document
const docId = await createDocument('loads', {
  origin: 'Los Angeles, CA',
  destination: 'New York, NY',
  weight: '40000',
  status: 'available'
});

// Retrieve the document
const load = await getDocument('loads', docId);
console.log('Load created:', load);
```

## User Management

### Create User with Role

```typescript
import { createUser, assignUserRole, UserRole } from './services/firebase';

// Create user
const user = await createUser({
  email: 'broker@company.com',
  password: 'SecurePass123!',
  displayName: 'John Broker'
});

// Assign broker role
await assignUserRole(user.uid, UserRole.BROKER);
```

### Manage Permissions

```typescript
import { addPermission, hasPermission } from './services/firebase';

// Add specific permission
await addPermission(user.uid, 'loads.create');

// Check permission
const canCreate = await hasPermission(user.uid, 'loads.create');
console.log('Can create loads:', canCreate);
```

## Database Security Rules

### Deploy Firestore Rules

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in project:
```bash
firebase init firestore
```

4. Deploy security rules:
```bash
firebase deploy --only firestore:rules
```

The security rules are defined in `firestore.rules` and include:
- Role-based access control (admin, broker, carrier, shipper, user)
- Owner-based permissions
- Protected sensitive operations
- Audit logging

### Key Security Features

- **Authentication Required**: All operations require authentication
- **Role-Based Access**: Different roles have different permissions
- **Owner Protection**: Users can only modify their own data
- **Admin Override**: Admins have full access for management
- **Audit Trail**: All administrative actions are logged

## Production Deployment

### 1. Environment Setup

For production, use environment variables instead of file paths:

```bash
# Set as environment variable in your hosting platform
export FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"..."}'
```

### 2. Docker Deployment

Add to Dockerfile:

```dockerfile
ENV FIREBASE_SERVICE_ACCOUNT=${FIREBASE_SERVICE_ACCOUNT}
ENV FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
```

### 3. Cloud Platform Deployment

#### Render
Add environment variables in Render dashboard:
- `FIREBASE_SERVICE_ACCOUNT`
- `FIREBASE_PROJECT_ID`

#### Railway
Add environment variables in Railway dashboard:
- `FIREBASE_SERVICE_ACCOUNT`
- `FIREBASE_PROJECT_ID`

#### Vercel
Add environment variables in Vercel dashboard:
- `FIREBASE_SERVICE_ACCOUNT`
- `FIREBASE_PROJECT_ID`

### 4. Security Best Practices

1. **Never commit service account keys** to version control
2. Use **environment variables** for credentials in production
3. Enable **Firebase App Check** for additional security
4. Set up **Firebase Security Rules** properly
5. Monitor **Firebase Usage** and set up alerts
6. Implement **rate limiting** for authentication
7. Use **custom tokens** for secure authentication
8. Enable **audit logging** for compliance

## API Endpoints

### Authentication Endpoints

```typescript
// POST /api/auth/signup
{
  "email": "user@example.com",
  "password": "securepassword",
  "displayName": "John Doe"
}

// POST /api/auth/login
{
  "email": "user@example.com",
  "password": "securepassword"
}

// POST /api/auth/verify
{
  "idToken": "firebase-id-token"
}
```

### User Management Endpoints

```typescript
// GET /api/users/:uid
// PUT /api/users/:uid
// DELETE /api/users/:uid
// POST /api/users/:uid/role
// POST /api/users/:uid/permissions
```

## Monitoring and Logging

### Enable Firebase Logging

```typescript
import { initializeFirebaseAdmin } from './services/firebase';

// Initialize with logging enabled
initializeFirebaseAdmin('./config/serviceAccountKey.json');

// Logs will appear in console
```

### Monitor Authentication

Check Firebase Console > Authentication for:
- User sign-ups
- Authentication attempts
- Failed login attempts
- User activity

### Monitor Firestore

Check Firebase Console > Firestore for:
- Document reads/writes
- Security rule violations
- Query performance
- Storage usage

## Troubleshooting

### Common Issues

1. **"Firebase Admin SDK not initialized"**
   - Ensure `initializeFirebaseAdmin()` is called before using any Firebase services
   - Check that service account credentials are valid

2. **"Permission Denied"**
   - Verify Firestore security rules allow the operation
   - Check user authentication and role
   - Ensure custom claims are set correctly

3. **"Invalid Service Account"**
   - Verify service account JSON file is correct
   - Check file path or environment variable
   - Ensure Firebase project ID matches

4. **"Quota Exceeded"**
   - Check Firebase usage in console
   - Upgrade Firebase plan if needed
   - Implement caching to reduce requests

## Testing

### Unit Tests

```typescript
import { createUser, verifyIdToken } from './services/firebase';

describe('Firebase Authentication', () => {
  it('should create a user', async () => {
    const user = await createUser({
      email: 'test@example.com',
      password: 'testpassword'
    });
    expect(user).toBeDefined();
    expect(user.email).toBe('test@example.com');
  });
});
```

### Integration Tests

```typescript
describe('User Management', () => {
  it('should assign role and check permissions', async () => {
    const user = await createUser({
      email: 'broker@test.com',
      password: 'testpass'
    });
    
    await assignUserRole(user.uid, UserRole.BROKER);
    const hasPermission = await hasPermission(user.uid, 'loads.create');
    
    expect(hasPermission).toBe(true);
  });
});
```

## Additional Resources

- [Firebase Admin SDK Documentation](https://firebase.google.com/docs/admin/setup)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/rules-structure)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Best Practices](https://firebase.google.com/docs/rules/rules-and-auth)

## Support

For issues or questions:
1. Check Firebase Console for error messages
2. Review Firebase Admin SDK logs
3. Verify environment configuration
4. Contact development team for assistance
