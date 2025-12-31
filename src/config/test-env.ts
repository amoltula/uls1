/**
 * Environment Configuration Helper
 * Provides utilities to work with environment variables in tests
 */

interface TestEnvConfig {
  [key: string]: string;
}

export const getTestEnv = (): TestEnvConfig => ({
  NODE_ENV: 'test',
  VITE_APP_NAME: 'ArchitectUI Test',
  VITE_APP_VERSION: '4.2.0-test',
  VITE_API_BASE_URL: 'http://localhost:4000',
  VITE_API_TIMEOUT: '5000',
  VITE_THEME_COLOR_SCHEME: 'white',
  VITE_ENABLE_ANALYTICS: 'false',
  VITE_ENABLE_ERROR_TRACKING: 'false',
  VITE_DEBUG_MODE: 'true',
  VITE_ENABLE_REDUX_DEVTOOLS: 'true',
  VITE_LOG_LEVEL: 'error',
});

export const setTestEnv = (overrides: Partial<TestEnvConfig> = {}): void => {
  const testEnv = { ...getTestEnv(), ...overrides };
  
  Object.entries(testEnv).forEach(([key, value]) => {
    process.env[key] = value;
  });
};

export const resetTestEnv = (): void => {
  const testEnv = getTestEnv();
  
  Object.keys(testEnv).forEach(key => {
    delete process.env[key];
  });
};

export default {
  getTestEnv,
  setTestEnv,
  resetTestEnv,
};
