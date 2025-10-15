# EAS (Expo Application Services) Setup Guide

This guide helps you resolve common EAS update failures and set up EAS for the LoadBoard AI project.

## Common Root Causes of EAS Update Failures

1. **Missing or invalid `eas.json` configuration**
2. **Not authenticated with Expo**
3. **Missing `EXPO_TOKEN` in GitHub Secrets**
4. **Project not initialized with EAS**
5. **Incorrect `slug` or `owner` in `app.json`**

---

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- An Expo account (create one at https://expo.dev)
- EAS CLI installed globally: `npm install -g eas-cli`

---

## Step 1: Verify EAS.json Configuration

The project includes a valid `eas.json` at the root with the following structure:

```json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "production": {
      "distribution": "store",
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

✅ This file is already configured correctly in this repository.

---

## Step 2: Authenticate with Expo

### Check Current Authentication Status

Run the following command to check if you're logged in:

```bash
eas whoami
```

### If Not Logged In

If the command returns nothing or shows you're not logged in, authenticate using:

```bash
eas login
```

Follow the prompts to enter your Expo credentials.

### Verify Authentication

After logging in, run `eas whoami` again to confirm your username is displayed.

---

## Step 3: Verify app.json Configuration

The project includes an `app.json` file with the correct Expo configuration:

```json
{
  "expo": {
    "name": "ai-logisticpowerboard",
    "slug": "ai-logisticpowerboard",
    "owner": "197620142025"
  }
}
```

### Important Configuration Notes

- **name**: Human-readable app name
- **slug**: URL-friendly identifier (no spaces, lowercase recommended)
- **owner**: Your Expo username or organization name

⚠️ **Update the `owner` field** with your actual Expo username or organization.

To find your Expo username:
```bash
eas whoami
```

---

## Step 4: Initialize EAS (If Not Done)

If this is your first time using EAS with this project:

```bash
eas init
```

This command will:
- Create a `.eas` folder (if it doesn't exist)
- Link the project to your Expo account
- Generate a unique project ID

✅ The `.eas` folder should be committed to version control.

---

## Step 5: Configure EXPO_TOKEN for GitHub Actions

For automated deployments via GitHub Actions, you need to set up an `EXPO_TOKEN`:

### Create an Expo Access Token

1. Generate a token using EAS CLI:
   ```bash
   eas token:create
   ```

2. Copy the generated token (you'll need it in the next step)

### Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `EXPO_TOKEN`
5. Value: Paste the token you generated
6. Click **Add secret**

### Verify Token in Workflows

The token can be used in GitHub Actions workflows like this:

```yaml
- name: Setup Expo
  uses: expo/expo-github-action@v8
  with:
    expo-version: latest
    eas-version: latest
    token: ${{ secrets.EXPO_TOKEN }}

- name: EAS Update
  run: eas update --branch production --non-interactive
```

---

## Step 6: Test Your Configuration

### Run a Test Build

Try running an EAS build to verify everything is configured correctly:

```bash
# For development build
eas build --platform ios --profile development

# For production build
eas build --platform android --profile production
```

### Run an EAS Update

To publish an update without rebuilding:

```bash
# For a specific branch
eas update --branch production --message "Update message"

# For automatic branch detection
eas update --auto
```

---

## Troubleshooting

### Error: "No Expo account found"

**Solution**: Run `eas login` to authenticate.

### Error: "Invalid token"

**Solution**: 
1. Generate a new token: `eas token:create`
2. Update the `EXPO_TOKEN` secret in GitHub
3. Ensure the token hasn't expired

### Error: "Project not found"

**Solution**: 
1. Run `eas init` to initialize the project
2. Verify the `owner` field in `app.json` matches your Expo username

### Error: "slug already in use"

**Solution**: 
1. Choose a unique slug in `app.json`
2. Run `eas init` again to reinitialize

### Error: "Build failed during install"

**Solution**: 
1. Ensure all dependencies are in `package.json`
2. Check that your build profile in `eas.json` is configured correctly
3. Review build logs for specific error messages

---

## Additional Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Update Documentation](https://docs.expo.dev/eas-update/introduction/)
- [EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)
- [Expo CLI Reference](https://docs.expo.dev/workflow/expo-cli/)
- [GitHub Actions with Expo](https://docs.expo.dev/build/building-on-ci/)

---

## Quick Reference Commands

```bash
# Check authentication
eas whoami

# Login to Expo
eas login

# Logout from Expo
eas logout

# Initialize EAS project
eas init

# Create access token
eas token:create

# List all tokens
eas token:list

# Delete a token
eas token:delete

# Build for specific platform
eas build --platform [ios|android|all]

# Create an update
eas update --branch [branch-name]

# View project info
eas project:info

# Configure credentials
eas credentials
```

---

## Next Steps

After completing this setup:

1. ✅ Verify `eas whoami` returns your username
2. ✅ Confirm `eas.json` is valid and at project root
3. ✅ Verify `app.json` has correct `slug` and `owner`
4. ✅ Ensure `EXPO_TOKEN` is set in GitHub Secrets
5. ✅ Run a test build or update to verify everything works

**You're now ready to use EAS for building and updating your application!**
