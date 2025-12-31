# Docker Configuration Guide

## Overview

This application is fully containerized and supports configuration through environment variables. All hardcoded values have been externalized and can be configured at build time or runtime.

## Quick Start

### Development Mode

```bash
# Using docker-compose
docker-compose up dev

# Or build and run manually
docker build -f Dockerfile.dev -t architectui:dev .
docker run -p 3001:3001 -v ${PWD}/src:/app/src architectui:dev
```

### Production Mode

```bash
# Using docker-compose
docker-compose up app

# Or build and run manually
docker build -t architectui:latest .
docker run -p 8080:80 architectui:latest
```

## Environment Variables

All configuration can be overridden using environment variables. See `.env.example` for a complete list.

### Core Configuration

```bash
# Application
VITE_APP_NAME=ArchitectUI
VITE_APP_VERSION=4.2.0
VITE_APP_DESCRIPTION="React Admin Dashboard"

# Server
VITE_PORT=3001
VITE_HOST=localhost
VITE_PROTOCOL=http

# API
VITE_API_BASE_URL=https://api.example.com
VITE_API_TIMEOUT=30000
VITE_API_VERSION=v1

# Theme
VITE_THEME_COLOR_SCHEME=white
VITE_THEME_FIXED_HEADER=true
VITE_THEME_FIXED_SIDEBAR=true

# Features
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_TRACKING=false
VITE_DEBUG_MODE=false
```

## Docker Compose Configuration

### Using Environment Files

Create environment files for different stages:

**`.env.development`**
```bash
VITE_API_BASE_URL=http://localhost:4000
VITE_DEBUG_MODE=true
VITE_ENABLE_REDUX_DEVTOOLS=true
```

**`.env.production`**
```bash
VITE_API_BASE_URL=https://api.production.com
VITE_DEBUG_MODE=false
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=true
```

**`.env.staging`**
```bash
VITE_API_BASE_URL=https://api.staging.com
VITE_DEBUG_MODE=false
VITE_ENABLE_ANALYTICS=false
```

### Run with Specific Environment

```bash
# Development
docker-compose --env-file .env.development up dev

# Production
docker-compose --env-file .env.production up app

# Staging
docker-compose --env-file .env.staging up app
```

### Override Variables

```bash
# Override specific variables
VITE_API_BASE_URL=https://custom-api.com docker-compose up app

# Or set in docker-compose.override.yml
version: '3.8'
services:
  app:
    environment:
      - VITE_API_BASE_URL=https://custom-api.com
      - VITE_THEME_COLOR_SCHEME=dark
```

## Build Arguments

Build-time configuration is passed as ARG:

```dockerfile
# In Dockerfile
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
```

Build with custom args:

```bash
docker build \
  --build-arg VITE_API_BASE_URL=https://api.example.com \
  --build-arg VITE_THEME_COLOR_SCHEME=dark \
  -t architectui:custom .
```

## Multi-Stage Build

The production Dockerfile uses multi-stage builds:

1. **Build Stage**: Compiles the application with provided env vars
2. **Production Stage**: Serves the built files with nginx

```bash
# Build with production settings
docker build \
  --target production \
  --build-arg VITE_API_BASE_URL=https://api.production.com \
  -t architectui:prod .
```

## Kubernetes/Cloud Deployment

### ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: architectui-config
data:
  VITE_API_BASE_URL: "https://api.production.com"
  VITE_THEME_COLOR_SCHEME: "white"
  VITE_ENABLE_ANALYTICS: "true"
```

### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: architectui
spec:
  template:
    spec:
      containers:
      - name: app
        image: architectui:latest
        envFrom:
        - configMapRef:
            name: architectui-config
        ports:
        - containerPort: 80
```

### Secret

For sensitive data:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: architectui-secrets
type: Opaque
stringData:
  VITE_API_KEY: "your-api-key"
  VITE_SENTRY_DSN: "your-sentry-dsn"
```

## Data Volumes

### Mount External Data Files

```yaml
services:
  app:
    volumes:
      - ./custom-data:/app/src/data:ro
```

This allows you to provide custom JSON data files without rebuilding the image.

### Example Structure

```
custom-data/
├── profile-data.json
├── dashboard-data.json
├── table-data.json
└── form-data.json
```

## Health Checks

The application includes health check endpoints:

```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80/health"]
  interval: 30s
  timeout: 3s
  retries: 3
  start_period: 40s
```

## Networking

### Internal Network

```yaml
networks:
  app-network:
    driver: bridge
```

### Connect to External Services

```yaml
services:
  app:
    networks:
      - app-network
      - api-network
      
networks:
  app-network:
    internal: true
  api-network:
    external: true
```

## Scaling

### Horizontal Scaling

```bash
docker-compose up --scale app=3
```

### Load Balancer

```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      - app
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      
  app:
    deploy:
      replicas: 3
```

## CI/CD Integration

### GitHub Actions

```yaml
- name: Build Docker Image
  run: |
    docker build \
      --build-arg VITE_API_BASE_URL=${{ secrets.API_BASE_URL }} \
      --build-arg VITE_APP_VERSION=${{ github.ref_name }} \
      -t architectui:${{ github.sha }} .
```

### GitLab CI

```yaml
build:
  script:
    - docker build 
        --build-arg VITE_API_BASE_URL=$API_BASE_URL
        -t $CI_REGISTRY_IMAGE:$CI_COMMIT_TAG .
```

## Environment-Specific Configs

### Development
- Hot reload enabled
- Source maps enabled
- Redux DevTools enabled
- Debug logging enabled
- Mock API data

### Staging
- Similar to production
- Extended logging
- Performance monitoring
- Real API (staging endpoint)

### Production
- Optimized build
- Minified assets
- Production API
- Analytics enabled
- Error tracking enabled
- Service worker enabled

## Troubleshooting

### Environment Variables Not Working

1. Check variable name starts with `VITE_`
2. Rebuild after changing env vars
3. Verify in build logs that vars are set
4. Check `constants.ts` for correct usage

### Build Fails

```bash
# Clean build
docker-compose down -v
docker-compose build --no-cache app
```

### Can't Connect to API

1. Check `VITE_API_BASE_URL` is correct
2. Verify network connectivity
3. Check CORS settings
4. Review API logs

### Data Not Loading

1. Check volume mounts
2. Verify JSON files are valid
3. Check file paths in dataLoader
4. Review browser console

## Best Practices

1. **Never commit `.env` files** with secrets
2. **Use `.env.example`** as template
3. **Set secrets** via CI/CD or secrets manager
4. **Separate configs** per environment
5. **Document** all environment variables
6. **Version** your Docker images
7. **Test** with different configurations
8. **Monitor** application health

## Security

### Secrets Management

```bash
# Use Docker secrets
echo "my-secret-api-key" | docker secret create api_key -

# Reference in compose file
services:
  app:
    secrets:
      - api_key
      
secrets:
  api_key:
    external: true
```

### Read-Only Filesystem

```yaml
services:
  app:
    read_only: true
    tmpfs:
      - /tmp
      - /var/cache/nginx
```

### Non-Root User

```dockerfile
USER node
```

## Monitoring

### Logs

```bash
# View logs
docker-compose logs -f app

# Export logs
docker-compose logs app > app.log
```

### Metrics

```yaml
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Data Externalization Guide](./DATA_EXTERNALIZATION_GUIDE.md)
