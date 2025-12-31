/**
 * Centralized Data Export
 * Single entry point for all external data
 */

// JSON Data Files
export { default as profileData } from './profile-data.json';
export { default as dashboardData } from './dashboard-data.json';
export { default as tableData } from './table-data.json';
export { default as formData } from './form-data.json';
export { default as menuData } from './menu-data.json';
export { default as uiConstants } from './ui-constants.json';
export { default as footerData } from './footer-data.json';
export { default as headerData } from './header-data.json';
export { default as logoData } from './logo-data.json';

// Re-export data loader functions for convenience
export * from '../utils/dataLoader';
