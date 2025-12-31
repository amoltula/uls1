# Build stage
FROM node:20-alpine AS builder

# Build arguments for environment variables
ARG VITE_APP_NAME
ARG VITE_APP_VERSION
ARG VITE_API_BASE_URL
ARG VITE_API_TIMEOUT
ARG VITE_THEME_COLOR_SCHEME
ARG VITE_ENABLE_ANALYTICS
ARG VITE_ENABLE_ERROR_TRACKING
ARG NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Copy environment file
COPY .env.production .env

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy custom nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
