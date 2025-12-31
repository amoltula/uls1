# Configuration Guide

## Overview

This application uses a centralized configuration system that supports environment variables for both Docker and non-Docker deployments.

## Configuration Files

### Environment Files

- **`.env.example`** - Template with all available variables
- **`.env.development`** - Development environment defaults
- **`.env.production`** - Production environment defaults
- **`.env.docker`** - Docker-specific configuration
- **`.env.local`** - Local overrides (not committed to git)

### Configuration Modules

- **`src/config/constants.ts`** - Central configuration with defaults
- **`src/config/test-env.ts`** - Test environment helpers

## Environment Variables

All environment variables are prefixed with `VITE_` to be accessible in the browser.

### Application Configuration

```bash
VITE_APP_NAME=ArchitectUI              # Application name
VITE_APP_VERSION=4.2.0                 # Application version
VITE_APP_TITLE=...                     # Browser title
VITE_APP_HOMEPAGE=./                   # Base path
```

### Server Configuration

```bash
VITE_PORT=3001                         # Development server port
VITE_HOST=localhost                    # Host address
VITE_PROTOCOL=http                     # Protocol (http/https)
VITE_OPEN_BROWSER=true                 # Auto-open browser
```

### API Configuration

```bash
VITE_API_BASE_URL=https://api.example.com  # API base URL
VITE_API_TIMEOUT=30000                     # Request timeout (ms)
VITE_API_VERSION=v1                        # API version
```

### Theme Configuration

```bash
VITE_THEME_COLOR_SCHEME=white          # Color scheme
VITE_THEME_BG_OPACITY=opacity-06       # Background opacity
VITE_THEME_ENABLE_BG_IMAGE=false       # Enable background image
VITE_THEME_FIXED_HEADER=true           # Fixed header
VITE_THEME_HEADER_SHADOW=true          # Header shadow
VITE_THEME_SIDEBAR_SHADOW=true         # Sidebar shadow
VITE_THEME_FIXED_SIDEBAR=true          # Fixed sidebar
VITE_THEME_FIXED_FOOTER=true           # Fixed footer
VITE_THEME_PAGE_TITLE_ICON=true        # Show page title icon
VITE_THEME_PAGE_TITLE_SUBHEADING=true  # Show subheading
VITE_THEME_PAGE_TABS_ALT=true          # Alternative tab style
```

### Feature Flags

```bash
VITE_ENABLE_ANALYTICS=false            # Analytics tracking
VITE_ENABLE_ERROR_TRACKING=false       # Error tracking
VITE_DEBUG_MODE=false                  # Debug mode
VITE_ENABLE_SERVICE_WORKER=false       # Service worker
```

### Redux Configuration

```bash
VITE_REDUX_PERSIST_KEY=root            # Storage key
VITE_REDUX_STORAGE_VERSION=1           # Storage version
VITE_ENABLE_REDUX_DEVTOOLS=true        # Redux DevTools
```

### Authentication

```bash
VITE_AUTH_TOKEN_KEY=auth_token         # Token storage key
VITE_AUTH_REFRESH_TOKEN_KEY=refresh_token  # Refresh token key
VITE_AUTH_TOKEN_EXPIRY=3600            # Token expiry (seconds)
VITE_AUTH_AUTO_REFRESH=true            # Auto-refresh tokens
```

### Logging

```bash
VITE_LOG_LEVEL=info                    # Log level (debug|info|warn|error)
VITE_LOG_CONSOLE=true                  # Console logging
VITE_LOG_REMOTE=false                  # Remote logging
VITE_LOG_REMOTE_URL=                   # Remote log endpoint
```

### Performance

```bash
VITE_ENABLE_LAZY_LOADING=true          # Lazy load components
VITE_CHUNK_SIZE_LIMIT=500              # Chunk size warning (KB)
```

## Usage

### Local Development

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Customize variables in `.env.local`

3. Start development server:
```bash
npm run dev
```

### Production Build

1. Set production variables in `.env.production`

2. Build:
```bash
npm run build
```

### Docker Deployment

#### Using Environment Files

1. Copy `.env.docker` and customize:
```bash
cp .env.docker .env.docker.local
# Edit .env.docker.local
```

2. Run with docker-compose:
```bash
docker-compose --env-file .env.docker.local up
```

#### Using Build Arguments

```bash
docker build \
  --build-arg VITE_APP_NAME="My App" \
  --build-arg VITE_API_BASE_URL="https://api.myapp.com" \
  -t my-app .
```

#### Using docker-compose Override

Create `docker-compose.override.yml`:

```yaml
version: '3.8'

services:
  app:
    build:
      args:
        - VITE_API_BASE_URL=https://api.custom.com
        - VITE_ENABLE_ANALYTICS=true
    environment:
      - CUSTOM_VAR=value
```

Then run:
```bash
docker-compose up
```

### Accessing Configuration in Code

#### Import the config module:

```typescript
import { CONFIG } from 'src/config/constants';

// Access configuration
const apiUrl = CONFIG.API.BASE_URL;
const appName = CONFIG.APP.NAME;
const isProduction = CONFIG.BUILD.IS_PRODUCTION;

// Or import specific configs
import { API_CONFIG, THEME_CONFIG } from 'src/config/constants';

const timeout = API_CONFIG.TIMEOUT;
const colorScheme = THEME_CONFIG.DEFAULT_COLOR_SCHEME;
```

#### Using environment variables directly:

```typescript
const customValue = import.meta.env.VITE_CUSTOM_VALUE || 'default';
```

## Configuration Priority

Environment variables are resolved in this order (highest to lowest priority):

1. **Runtime environment variables** (Docker run, shell)
2. **`.env.local`** (local overrides, not in git)
3. **`.env.[mode]`** (mode-specific: `.env.production`, `.env.development`)
4. **`.env`** (shared defaults)
5. **Hardcoded defaults** in `constants.ts`

## Docker Configuration Examples

### Development

```bash
# docker-compose.yml or docker-compose.override.yml
services:
  dev:
    environment:
      - VITE_API_BASE_URL=http://localhost:4000
      - VITE_DEBUG_MODE=true
      - VITE_LOG_LEVEL=debug
```

### Production

```bash
docker run -d \
  -e VITE_API_BASE_URL=https://api.production.com \
  -e VITE_ENABLE_ANALYTICS=true \
  -e VITE_ENABLE_ERROR_TRACKING=true \
  -p 80:80 \
  my-app:latest
```

### Kubernetes ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  VITE_API_BASE_URL: "https://api.k8s.com"
  VITE_THEME_COLOR_SCHEME: "dark"
  VITE_ENABLE_ANALYTICS: "true"
---
apiVersion: v1
kind: Deployment
spec:
  template:
    spec:
      containers:
      - name: app
        envFrom:
        - configMapRef:
            name: app-config
```

## Security Best Practices

### ✅ DO:
- Use `.env.local` for sensitive local values
- Add `.env.local` to `.gitignore`
- Use secrets management for production
- Validate required variables at startup
- Use different values per environment

### ❌ DON'T:
- Commit `.env.local` or secrets
- Store API keys in environment files
- Use production values in development
- Expose sensitive data in client code

## Secrets Management

For production deployments, use proper secrets management:

### Docker Secrets

```bash
echo "my-secret-value" | docker secret create api_key -

docker service create \
  --secret api_key \
  --env VITE_API_KEY_FILE=/run/secrets/api_key \
  my-app
```

### Kubernetes Secrets

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
stringData:
  api-key: "my-secret-value"
---
spec:
  containers:
  - name: app
    env:
    - name: VITE_API_KEY
      valueFrom:
        secretKeyRef:
          name: app-secrets
          key: api-key
```

### CI/CD Pipelines

GitHub Actions:
```yaml
- name: Build Docker image
  env:
    VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
    VITE_API_KEY: ${{ secrets.API_KEY }}
  run: |
    docker build \
      --build-arg VITE_API_BASE_URL \
      --build-arg VITE_API_KEY \
      -t app .
```

## Troubleshooting

### Variables not loaded

1. Check variable prefix (`VITE_`)
2. Restart dev server after changes
3. Verify file naming (`.env.production` not `.env.prod`)
4. Check docker-compose build args

### Values not updated in Docker

1. Rebuild image: `docker-compose build --no-cache`
2. Remove old containers: `docker-compose down -v`
3. Check build args in docker-compose.yml

### TypeScript errors

Add new variables to `src/vite-env.d.ts`:
```typescript
interface ImportMetaEnv {
  readonly VITE_CUSTOM_VAR: string
}
```

## Testing Configuration

Use test helpers in tests:

```typescript
import { setTestEnv, resetTestEnv } from 'src/config/test-env';

describe('Component', () => {
  beforeEach(() => {
    setTestEnv({
      VITE_API_BASE_URL: 'http://test-api.com',
    });
  });

  afterEach(() => {
    resetTestEnv();
  });

  it('uses test config', () => {
    // Test with custom config
  });
});
```

## Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Docker Environment Variables](https://docs.docker.com/compose/environment-variables/)
- [Docker Build Arguments](https://docs.docker.com/engine/reference/builder/#arg)
