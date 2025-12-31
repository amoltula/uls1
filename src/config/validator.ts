/**
 * Configuration Validator
 * Validates required environment variables and configuration
 */

import { CONFIG } from './constants';

interface ValidationError {
  key: string;
  message: string;
  severity: 'error' | 'warning';
}

const errors: ValidationError[] = [];

// Required variables for production
const REQUIRED_PRODUCTION_VARS = [
  'VITE_API_BASE_URL',
  'VITE_APP_NAME',
];

// Validate URL format
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate port number
const isValidPort = (port: number): boolean => {
  return port > 0 && port <= 65535;
};

// Check required variables
if (CONFIG.BUILD.IS_PRODUCTION) {
  REQUIRED_PRODUCTION_VARS.forEach(varName => {
    const value = import.meta.env[varName];
    if (!value) {
      errors.push({
        key: varName,
        message: `${varName} is required in production`,
        severity: 'error',
      });
    }
  });
}

// Validate API URL
if (CONFIG.API.BASE_URL && !isValidUrl(CONFIG.API.BASE_URL)) {
  errors.push({
    key: 'VITE_API_BASE_URL',
    message: `Invalid API URL: ${CONFIG.API.BASE_URL}`,
    severity: 'error',
  });
}

// Validate port
if (!isValidPort(CONFIG.SERVER.PORT)) {
  errors.push({
    key: 'VITE_PORT',
    message: `Invalid port number: ${CONFIG.SERVER.PORT}`,
    severity: 'error',
  });
}

// Validate timeout
if (CONFIG.API.TIMEOUT < 0) {
  errors.push({
    key: 'VITE_API_TIMEOUT',
    message: `Invalid timeout value: ${CONFIG.API.TIMEOUT}`,
    severity: 'warning',
  });
}

// Check for development settings in production
if (CONFIG.BUILD.IS_PRODUCTION) {
  if (CONFIG.FEATURES.ENABLE_DEBUG_MODE) {
    errors.push({
      key: 'VITE_DEBUG_MODE',
      message: 'Debug mode should be disabled in production',
      severity: 'warning',
    });
  }

  if (CONFIG.REDUX.ENABLE_REDUX_DEVTOOLS) {
    errors.push({
      key: 'VITE_ENABLE_REDUX_DEVTOOLS',
      message: 'Redux DevTools should be disabled in production',
      severity: 'warning',
    });
  }
}

// Log validation results
export const validateConfig = (): boolean => {
  const criticalErrors = errors.filter(e => e.severity === 'error');
  const warnings = errors.filter(e => e.severity === 'warning');

  if (criticalErrors.length > 0) {
    console.error('❌ Configuration Validation Failed:');
    criticalErrors.forEach(error => {
      console.error(`  - ${error.key}: ${error.message}`);
    });
    return false;
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Configuration Warnings:');
    warnings.forEach(warning => {
      console.warn(`  - ${warning.key}: ${warning.message}`);
    });
  }

  if (errors.length === 0) {
    console.log('✅ Configuration validation passed');
  }

  return true;
};

// Print current configuration (for debugging)
export const printConfig = (): void => {
  console.group('📋 Current Configuration');
  console.log('Environment:', CONFIG.BUILD.NODE_ENV);
  console.log('App Name:', CONFIG.APP.NAME);
  console.log('Version:', CONFIG.APP.VERSION);
  console.log('API URL:', CONFIG.API.BASE_URL);
  console.log('Server:', CONFIG.SERVER.BASE_URL);
  console.log('Features:', {
    analytics: CONFIG.FEATURES.ENABLE_ANALYTICS,
    errorTracking: CONFIG.FEATURES.ENABLE_ERROR_TRACKING,
    debug: CONFIG.FEATURES.ENABLE_DEBUG_MODE,
  });
  console.groupEnd();
};

// Auto-validate on import in development
if (CONFIG.BUILD.IS_DEVELOPMENT && CONFIG.FEATURES.ENABLE_DEBUG_MODE) {
  if (!validateConfig()) {
    printConfig();
  }
}

export type { ValidationError };
export { errors };
export default validateConfig;
