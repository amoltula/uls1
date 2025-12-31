/**
 * Configuration Export
 * Single entry point for all configuration
 */

// Application Configuration (Environment-aware)
export * from './constants';

// UI Constants
export * from './ui-constants';

// Default export with all configs
import CONFIG from './constants';
import UI_CONSTANTS from './ui-constants';

export default {
  ...CONFIG,
  UI: UI_CONSTANTS,
};
