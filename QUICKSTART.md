# Firebase Admin SDK - Quick Start Guide

This guide will help you get started with Firebase Admin SDK integration in 5 minutes.

## Prerequisites

- Node.js installed
- Firebase project created at [console.firebase.google.com](https://console.firebase.google.com)
- npm packages installed: `npm install`

## Step 1: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click the gear icon ⚙️ → **Project Settings**
4. Navigate to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Save the JSON file as `serviceAccountKey.json`

## Step 2: Configure Credentials

Choose one of these methods:

### Option A: Environment Variable (Recommended for Production)
```bash
export FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"..."}'
```

### Option B: File Path
```bash
# Create config directory
mkdir -p config

# Move service account key
mv ~/Downloads/serviceAccountKey.json config/

# Or set environment variable
export GOOGLE_APPLICATION_CREDENTIALS=./config/serviceAccountKey.json
```

### Option C: .env File (Development)
```bash
cp .env.example .env
# Edit .env and add:
FIREBASE_SERVICE_ACCOUNT_PATH=./config/serviceAccountKey.json
```

## Step 3: Test Integration

Run the test script:
```bash
node scripts/test-firebase.cjs
```

## Step 4: Use in Your Application

### Initialize Firebase (once at startup)
```typescript
import { initializeFirebaseAdmin } from './services/firebase';

// Initialize with default credentials
initializeFirebaseAdmin();

// OR initialize with specific path
initializeFirebaseAdmin('./config/serviceAccountKey.json');
```

### Create a User
```typescript
import { createUser } from './services/firebase';

const user = await createUser({
  email: 'user@example.com',
  password: 'securepassword',
  displayName: 'John Doe'
});

console.log('User created:', user.uid);
```

### Assign Role to User
```typescript
import { assignUserRole, UserRole } from './services/firebase';

await assignUserRole(user.uid, UserRole.BROKER);
console.log('User role assigned');
```

### Create Firestore Document
```typescript
import { createDocument } from './services/firebase';

const loadId = await createDocument('loads', {
  origin: 'Los Angeles, CA',
  destination: 'New York, NY',
  weight: '40000',
  status: 'available'
});

console.log('Load created:', loadId);
```

### Verify Authentication Token
```typescript
import { verifyIdToken } from './services/firebase';

const decodedToken = await verifyIdToken(userIdToken);
console.log('Authenticated user:', decodedToken.uid);
```

## Step 5: Deploy Security Rules

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firestore (one time):
```bash
firebase init firestore
# Select your project
# Accept default for firestore.rules
# Accept default for firestore.indexes.json
```

4. Deploy security rules:
```bash
firebase deploy --only firestore:rules
```

## Common Use Cases

### Complete User Onboarding
```typescript
import { example6_UserOnboarding } from './services/firebase/examples';

const result = await example6_UserOnboarding(
  'broker@company.com',
  'SecurePass123!',
  'John Broker',
  'broker'
);
```

### Check User Permissions
```typescript
import { hasPermission } from './services/firebase';

const canCreate = await hasPermission(uid, 'loads.create');
if (canCreate) {
  // User can create loads
}
```

### Query Firestore
```typescript
import { queryDocuments } from './services/firebase';

const availableLoads = await queryDocuments(
  'loads',
  'status',
  '==',
  'available'
);
```

## Available User Roles

- `UserRole.ADMIN` - Full system access
- `UserRole.BROKER` - Broker permissions
- `UserRole.CARRIER` - Carrier permissions
- `UserRole.SHIPPER` - Shipper permissions
- `UserRole.USER` - Basic user permissions

## Troubleshooting

### "Firebase Admin SDK not initialized"
→ Call `initializeFirebaseAdmin()` before using any Firebase services

### "Permission Denied" from Firestore
→ Deploy security rules: `firebase deploy --only firestore:rules`

### "Invalid credentials"
→ Check that your service account key is correct and not expired

### "Project not found"
→ Verify `project_id` in service account matches your Firebase project

## Next Steps

1. ✅ Test authentication by creating a user
2. ✅ Create Firestore documents
3. ✅ Deploy security rules
4. 📝 Set up production environment variables
5. 📝 Implement authentication in your frontend
6. 📝 Add role-based access control to your API

## Resources

- **Complete Setup Guide**: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- **Code Examples**: [src/services/firebase/examples.ts](./src/services/firebase/examples.ts)
- **API Documentation**: [src/services/firebase/README.md](./src/services/firebase/README.md)
- **Firebase Console**: https://console.firebase.google.com
- **Firebase Docs**: https://firebase.google.com/docs/admin/setup

## Security Notes

⚠️ **Never commit service account keys to git!**

The `.gitignore` is already configured to exclude:
- `serviceAccountKey.json`
- `*-firebase-adminsdk-*.json`
- `.env` files

## Get Help

If you encounter issues:
1. Check Firebase Console for error messages
2. Review the logs in your application
3. See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed troubleshooting
4. Contact the development team

---

**You're ready to go!** 🚀

Start by running: `node scripts/test-firebase.cjs`
