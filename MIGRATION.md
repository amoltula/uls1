# Migration Guide

## Overview

This guide helps you migrate from hardcoded configuration to the new environment-based configuration system.

## Prerequisites

- Node.js 18+ installed
- Basic understanding of environment variables
- Access to your current configuration values

## Migration Steps

### 1. Backup Current Configuration

Before starting, document your current hardcoded values:

```bash
# Create a backup of important files
cp src/reducers/ThemeOptions.tsx src/reducers/ThemeOptions.tsx.backup
cp src/config/configureStore.tsx src/config/configureStore.tsx.backup
```

### 2. Choose Your Environment File

Determine which environment file to use:

- **Local Development**: `.env.development.local`
- **Team Development**: `.env.development`
- **Staging/Testing**: `.env.staging` (create if needed)
- **Production**: `.env.production`

### 3. Copy Template

```bash
# For local development
cp .env.example .env.development.local

# For production
cp .env.example .env.production
```

### 4. Configure Environment Variables

Edit your chosen `.env` file and set values:

```env
# Application
VITE_APP_NAME=YourAppName
VITE_APP_VERSION=1.0.0

# API Configuration
VITE_API_BASE_URL=https://your-api.com/api
VITE_API_TIMEOUT=30000

# Server Configuration
VITE_SERVER_BASE_URL=http://localhost:3001
VITE_PORT=3001
```

### 5. Update Code to Use Constants

Replace hardcoded values with constants from `src/config/constants.ts`:

#### Example 1: Theme Configuration

**Before:**
```typescript
const initialState = {
  backgroundColor: "bg-royal sidebar-text-light",
  headerBackgroundColor: "bg-strong-bliss header-text-light",
  enableMobileMenuSmall: false,
  enableBackgroundImage: false,
};
```

**After:**
```typescript
import { THEME_CONFIG } from '../config/constants';

const initialState = {
  backgroundColor: THEME_CONFIG.SIDEBAR_BG_COLOR,
  headerBackgroundColor: THEME_CONFIG.HEADER_BG_COLOR,
  enableMobileMenuSmall: THEME_CONFIG.ENABLE_MOBILE_MENU_SMALL,
  enableBackgroundImage: THEME_CONFIG.ENABLE_BACKGROUND_IMAGE,
};
```

#### Example 2: API Calls

**Before:**
```typescript
fetch('https://api.example.com/data', {
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000
});
```

**After:**
```typescript
import { API_CONFIG } from '../config/constants';

fetch(`${API_CONFIG.BASE_URL}/data`, {
  headers: API_CONFIG.DEFAULT_HEADERS,
  signal: AbortSignal.timeout(API_CONFIG.TIMEOUT)
});
```

#### Example 3: Feature Flags

**Before:**
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
  // Show debug panel
}
```

**After:**
```typescript
import { FEATURES, LOG_CONFIG } from '../config/constants';

if (FEATURES.ENABLE_DEBUG_MODE) {
  console.log('Debug info:', data);
  // Show debug panel
}

if (LOG_CONFIG.ENABLE_CONSOLE_LOGS) {
  console.log('Info:', message);
}
```

### 6. Test Configuration

Run the preflight check:

```bash
npm run preflight
```

Expected output:
```
🚀 Pre-flight Configuration Check

Environment: development
Docker: No

📁 Checking environment files:
  ✅ .env (found)
  ✅ .env.development (found)

📂 Checking directory structure:
  ✅ src
  ✅ src/config
  ✅ public

✅ Pre-flight check completed successfully!
```

### 7. Run Application

Start the application in development mode:

```bash
npm run dev
```

Check the console for configuration validation:

```
✅ Configuration validation passed
📋 Current Configuration
Environment: development
App Name: ArchitectUI React Theme
Version: 4.2.0
API URL: http://localhost:4000/api
Server: http://localhost:3001
Features: { analytics: false, errorTracking: false, debug: true }
```

### 8. Update Docker Configuration

If using Docker, update your environment:

```bash
# Copy Docker environment template
cp .env.example .env.docker

# Edit Docker-specific values
nano .env.docker
```

Build and run with Docker:

```bash
# Development
docker-compose up dev

# Production
docker-compose up app
```

## Common Migration Patterns

### Pattern 1: API Endpoints

```typescript
// Before
const API_ENDPOINT = 'https://api.example.com/v1';

// After
import { API_CONFIG } from './config/constants';
const API_ENDPOINT = API_CONFIG.BASE_URL;
```

### Pattern 2: Feature Toggles

```typescript
// Before
const showAnalytics = true;
const enableDebug = false;

// After
import { FEATURES } from './config/constants';
const showAnalytics = FEATURES.ENABLE_ANALYTICS;
const enableDebug = FEATURES.ENABLE_DEBUG_MODE;
```

### Pattern 3: Theme Settings

```typescript
// Before
const theme = {
  sidebarColor: 'bg-royal',
  headerColor: 'bg-strong-bliss',
  fixedHeader: true,
};

// After
import { THEME_CONFIG } from './config/constants';
const theme = {
  sidebarColor: THEME_CONFIG.SIDEBAR_BG_COLOR,
  headerColor: THEME_CONFIG.HEADER_BG_COLOR,
  fixedHeader: THEME_CONFIG.ENABLE_FIXED_HEADER,
};
```

### Pattern 4: Authentication

```typescript
// Before
const authConfig = {
  tokenKey: 'auth_token',
  refreshTokenKey: 'refresh_token',
  tokenExpiry: 3600,
};

// After
import { AUTH_CONFIG } from './config/constants';
const authConfig = {
  tokenKey: AUTH_CONFIG.TOKEN_STORAGE_KEY,
  refreshTokenKey: AUTH_CONFIG.REFRESH_TOKEN_KEY,
  tokenExpiry: AUTH_CONFIG.SESSION_TIMEOUT,
};
```

## Verification Checklist

- [ ] All environment files created and configured
- [ ] Preflight check passes successfully
- [ ] Application starts without errors
- [ ] Configuration validation shows no warnings
- [ ] API calls use correct endpoints
- [ ] Theme settings apply correctly
- [ ] Feature flags work as expected
- [ ] Docker builds successfully
- [ ] Tests pass with new configuration

## Troubleshooting

### Issue: "Cannot use 'import.meta' outside a module"

**Solution:** This usually occurs in Jest tests. Use `process.env.NODE_ENV` instead:

```typescript
// In test files or Node.js contexts
const isProduction = process.env.NODE_ENV === 'production';
```

### Issue: Environment variables not loading

**Solution:** Check file naming and precedence:

1. Ensure files are named correctly (`.env.development`, not `env.development`)
2. Check precedence: `.env.local` > `.env.[mode].local` > `.env.[mode]` > `.env`
3. Restart dev server after changing `.env` files

### Issue: Vite not recognizing variables

**Solution:** Ensure variables start with `VITE_`:

```env
# ❌ Wrong
API_URL=http://localhost:4000

# ✅ Correct
VITE_API_BASE_URL=http://localhost:4000
```

### Issue: Docker not picking up environment variables

**Solution:** Check `docker-compose.yml`:

```yaml
services:
  app:
    env_file:
      - .env.production  # Make sure this file exists
    build:
      args:
        VITE_API_BASE_URL: ${VITE_API_BASE_URL}  # Pass as build arg
```

### Issue: Configuration validation fails

**Solution:** Run validation manually:

```bash
npm run validate:config
```

Check error messages and update corresponding environment variables.

## Rollback Plan

If migration causes issues:

1. **Restore Backups:**
   ```bash
   cp src/reducers/ThemeOptions.tsx.backup src/reducers/ThemeOptions.tsx
   cp src/config/configureStore.tsx.backup src/config/configureStore.tsx
   ```

2. **Remove Environment Files:**
   ```bash
   rm .env.development.local
   rm .env.production
   ```

3. **Restart Application:**
   ```bash
   npm run dev
   ```

## Best Practices

1. **Never commit `.env.local` files** - they contain machine-specific settings
2. **Always commit `.env.example`** - it documents available variables
3. **Use `.env.development` for team defaults** - shared across all developers
4. **Use `.env.production` for production defaults** - override in deployment
5. **Document all variables** - update `.env.example` when adding new variables
6. **Validate early** - run preflight checks before deployment
7. **Use TypeScript** - leverage type safety from constants.ts
8. **Test all environments** - verify dev, staging, and production configs

## Next Steps

After successful migration:

1. **Update CI/CD pipelines** - ensure environment variables are set in build systems
2. **Configure secrets management** - use vault, AWS Secrets Manager, or similar
3. **Add monitoring** - track configuration errors in production
4. **Document team processes** - create runbooks for configuration changes
5. **Expand test coverage** - add tests for configuration-dependent features

## Support

If you encounter issues:

1. Check [CONFIGURATION.md](./CONFIGURATION.md) for detailed variable documentation
2. Review [TROUBLESHOOTING.md](./CONFIGURATION.md#troubleshooting) section
3. Run `npm run validate:config` to diagnose configuration issues
4. Check application logs for validation errors

## Migration Completion

Once migration is complete and verified:

1. Delete backup files:
   ```bash
   rm src/**/*.backup
   ```

2. Update team documentation
3. Train team members on new configuration system
4. Archive old configuration approach for reference

---

**Migration Status:** ✅ Ready for production use  
**Last Updated:** 2024  
**Version:** 1.0.0
