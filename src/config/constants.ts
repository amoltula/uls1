/**
 * Application Configuration
 * All configurable values centralized here
 * Can be overridden via environment variables
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  VERSION: import.meta.env.VITE_API_VERSION || 'v1',
  ENDPOINTS: {
    AUTH: '/auth',
    USERS: '/users',
    DASHBOARD: '/dashboard',
    SETTINGS: '/settings',
  },
};

// Application Configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'ArchitectUI',
  VERSION: import.meta.env.VITE_APP_VERSION || '4.2.0',
  DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'React Admin Dashboard',
  AUTHOR: import.meta.env.VITE_APP_AUTHOR || 'DashboardPack.com',
  TITLE: import.meta.env.VITE_APP_TITLE || 'ArchitectUI - ReactJS Bootstrap 5 Admin UI Dashboard Template',
  HOMEPAGE: import.meta.env.VITE_APP_HOMEPAGE || './',
};

// Server Configuration
export const SERVER_CONFIG = {
  PORT: parseInt(import.meta.env.VITE_PORT || '3001'),
  HOST: import.meta.env.VITE_HOST || 'localhost',
  PROTOCOL: import.meta.env.VITE_PROTOCOL || 'http',
  get BASE_URL() {
    return `${this.PROTOCOL}://${this.HOST}:${this.PORT}`;
  },
};

// Theme Configuration
export const THEME_CONFIG = {
  DEFAULT_COLOR_SCHEME: import.meta.env.VITE_THEME_COLOR_SCHEME || 'white',
  DEFAULT_BACKGROUND_OPACITY: import.meta.env.VITE_THEME_BG_OPACITY || 'opacity-06',
  ENABLE_BACKGROUND_IMAGE: import.meta.env.VITE_THEME_ENABLE_BG_IMAGE === 'true',
  ENABLE_FIXED_HEADER: import.meta.env.VITE_THEME_FIXED_HEADER !== 'false',
  ENABLE_HEADER_SHADOW: import.meta.env.VITE_THEME_HEADER_SHADOW !== 'false',
  ENABLE_SIDEBAR_SHADOW: import.meta.env.VITE_THEME_SIDEBAR_SHADOW !== 'false',
  ENABLE_FIXED_SIDEBAR: import.meta.env.VITE_THEME_FIXED_SIDEBAR !== 'false',
  ENABLE_FIXED_FOOTER: import.meta.env.VITE_THEME_FIXED_FOOTER !== 'false',
  ENABLE_PAGE_TITLE_ICON: import.meta.env.VITE_THEME_PAGE_TITLE_ICON !== 'false',
  ENABLE_PAGE_TITLE_SUBHEADING: import.meta.env.VITE_THEME_PAGE_TITLE_SUBHEADING !== 'false',
  ENABLE_PAGE_TABS_ALT: import.meta.env.VITE_THEME_PAGE_TABS_ALT !== 'false',
};

// Feature Flags
export const FEATURES = {
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_ERROR_TRACKING: import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true',
  ENABLE_DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true',
  ENABLE_DEV_TOOLS: import.meta.env.MODE !== 'production',
  ENABLE_SERVICE_WORKER: import.meta.env.VITE_ENABLE_SERVICE_WORKER === 'true',
};

// Redux Configuration
export const REDUX_CONFIG = {
  PERSIST_KEY: import.meta.env.VITE_REDUX_PERSIST_KEY || 'root',
  STORAGE_VERSION: parseInt(import.meta.env.VITE_REDUX_STORAGE_VERSION || '1'),
  ENABLE_REDUX_DEVTOOLS: import.meta.env.VITE_ENABLE_REDUX_DEVTOOLS !== 'false',
};

// Route Configuration
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  COMPONENTS: '/components',
  CHARTS: '/charts',
  FORMS: '/forms',
  TABLES: '/tables',
  MAPS: '/maps',
  WIDGETS: '/widgets',
  ELEMENTS: '/elements',
};

// Authentication Configuration
export const AUTH_CONFIG = {
  TOKEN_KEY: import.meta.env.VITE_AUTH_TOKEN_KEY || 'auth_token',
  REFRESH_TOKEN_KEY: import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY || 'refresh_token',
  TOKEN_EXPIRY: parseInt(import.meta.env.VITE_AUTH_TOKEN_EXPIRY || '3600'),
  ENABLE_AUTO_REFRESH: import.meta.env.VITE_AUTH_AUTO_REFRESH !== 'false',
};

// Cache Configuration
export const CACHE_CONFIG = {
  MAX_AGE: parseInt(import.meta.env.VITE_CACHE_MAX_AGE || '300000'), // 5 minutes
  ENABLE_CACHE: import.meta.env.VITE_ENABLE_CACHE !== 'false',
};

// Logging Configuration
export const LOG_CONFIG = {
  LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',
  ENABLE_CONSOLE: import.meta.env.VITE_LOG_CONSOLE !== 'false',
  ENABLE_REMOTE: import.meta.env.VITE_LOG_REMOTE === 'true',
  REMOTE_URL: import.meta.env.VITE_LOG_REMOTE_URL || '',
};

// Build Configuration
export const BUILD_CONFIG = {
  NODE_ENV: import.meta.env.MODE || 'development',
  IS_PRODUCTION: import.meta.env.PROD || false,
  IS_DEVELOPMENT: import.meta.env.DEV || false,
  BUILD_TIME: import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
  GIT_COMMIT: import.meta.env.VITE_GIT_COMMIT || 'unknown',
  GIT_BRANCH: import.meta.env.VITE_GIT_BRANCH || 'unknown',
};

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  ENABLE_LAZY_LOADING: import.meta.env.VITE_ENABLE_LAZY_LOADING !== 'false',
  CHUNK_SIZE_WARNING_LIMIT: parseInt(import.meta.env.VITE_CHUNK_SIZE_LIMIT || '500'),
};

// Export all configuration
export const CONFIG = {
  APP: APP_CONFIG,
  API: API_CONFIG,
  SERVER: SERVER_CONFIG,
  THEME: THEME_CONFIG,
  FEATURES,
  REDUX: REDUX_CONFIG,
  ROUTES,
  AUTH: AUTH_CONFIG,
  CACHE: CACHE_CONFIG,
  LOG: LOG_CONFIG,
  BUILD: BUILD_CONFIG,
  PERFORMANCE: PERFORMANCE_CONFIG,
};

export default CONFIG;
