# Docker Support Guide

## Overview

This project includes Docker support for both development and production environments.

## Quick Start

### Production Build

Build and run the production container:

```bash
# Build the image
docker build -t architectui-app .

# Run the container
docker run -p 8080:80 architectui-app

# Access the application
# Open http://localhost:8080 in your browser
```

### Using Docker Compose (Recommended)

#### Production Mode
```bash
# Build and start
docker-compose up app

# Build with no cache
docker-compose build --no-cache app

# Run in background
docker-compose up -d app

# Stop
docker-compose down
```

#### Development Mode
```bash
# Start development server with hot reload
docker-compose up dev

# Access at http://localhost:3001
```

## Docker Files

### `Dockerfile` (Production)
Multi-stage build for optimized production image:
- **Stage 1 (Builder)**: Builds the application using Node.js
- **Stage 2 (Production)**: Serves static files using Nginx Alpine (lightweight)
- Final image size: ~40MB

### `Dockerfile.dev` (Development)
Development container with hot reload:
- Uses Node.js Alpine
- Mounts source code as volumes
- Supports live code changes
- Includes all dev dependencies

### `docker-compose.yml`
Orchestrates both production and development services:
- **app service**: Production build with Nginx
- **dev service**: Development server with hot reload

## Configuration

### Environment Variables

Create a `.env` file for environment-specific variables:

```env
NODE_ENV=production
VITE_API_URL=https://api.example.com
```

### Nginx Configuration

Custom Nginx config in `docker/nginx.conf` includes:
- SPA routing support
- Gzip compression
- Security headers
- Static asset caching
- Health check endpoint

## Docker Commands

### Build Commands

```bash
# Build production image
docker build -t architectui-app:latest .

# Build development image
docker build -f Dockerfile.dev -t architectui-app:dev .

# Build with build arguments
docker build --build-arg NODE_VERSION=20 -t architectui-app .
```

### Run Commands

```bash
# Run production container
docker run -d -p 8080:80 --name architectui architectui-app

# Run with environment variables
docker run -d -p 8080:80 -e NODE_ENV=production architectui-app

# Run development container with volume mounts
docker run -d -p 3001:3001 -v $(pwd)/src:/app/src architectui-app:dev
```

### Management Commands

```bash
# View running containers
docker ps

# View logs
docker logs architectui
docker logs -f architectui  # Follow logs

# Stop container
docker stop architectui

# Remove container
docker rm architectui

# Remove image
docker rmi architectui-app

# Access container shell
docker exec -it architectui sh
```

### Docker Compose Commands

```bash
# Start all services
docker-compose up

# Start specific service
docker-compose up app

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop all services
docker-compose down

# Remove volumes
docker-compose down -v

# Rebuild images
docker-compose build

# Scale services
docker-compose up --scale app=3
```

## Production Deployment

### Using Docker Hub

```bash
# Tag image
docker tag architectui-app username/architectui-app:latest

# Push to Docker Hub
docker push username/architectui-app:latest

# Pull and run on server
docker pull username/architectui-app:latest
docker run -d -p 80:80 username/architectui-app:latest
```

### Using Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml architectui

# List services
docker service ls

# Remove stack
docker stack rm architectui
```

### Using Kubernetes

Generate Kubernetes manifests:

```bash
# Install kompose
curl -L https://github.com/kubernetes/kompose/releases/download/v1.26.1/kompose-linux-amd64 -o kompose

# Convert docker-compose to k8s manifests
kompose convert

# Apply to cluster
kubectl apply -f .
```

## Health Checks

The production container includes health checks:

```bash
# Check health status
docker inspect --format='{{.State.Health.Status}}' architectui

# View health check logs
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' architectui
```

Health check endpoint: `http://localhost:8080/health`

## Optimization Tips

1. **Multi-stage builds**: Reduces final image size
2. **Layer caching**: Order COPY commands efficiently
3. **Use .dockerignore**: Exclude unnecessary files
4. **Alpine images**: Smaller base images
5. **Build cache**: Use `--cache-from` for CI/CD

## Troubleshooting

### Container won't start

```bash
# Check logs
docker logs architectui

# Inspect container
docker inspect architectui
```

### Port already in use

```bash
# Find process using port
netstat -ano | findstr :8080  # Windows
lsof -i :8080                 # Linux/Mac

# Use different port
docker run -p 8081:80 architectui-app
```

### Build fails

```bash
# Clear build cache
docker builder prune

# Build with no cache
docker build --no-cache -t architectui-app .
```

### Volume mount issues (Windows)

Ensure Docker Desktop has access to your drive:
- Settings → Resources → File Sharing
- Add the project directory

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Docker Build and Push

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker image
        run: docker build -t architectui-app .
      - name: Run tests
        run: docker run architectui-app npm test
```

## Security Best Practices

1. ✅ Use official base images
2. ✅ Run as non-root user (Nginx handles this)
3. ✅ Scan images for vulnerabilities
4. ✅ Keep dependencies updated
5. ✅ Use security headers in Nginx
6. ✅ Don't expose unnecessary ports
7. ✅ Use secrets for sensitive data

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Nginx Docker](https://hub.docker.com/_/nginx)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
