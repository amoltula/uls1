/**
 * Data Loader Utilities
 * Helper functions to load and manage external data
 */

import profileData from '../data/profile-data.json';
import dashboardData from '../data/dashboard-data.json';
import tableData from '../data/table-data.json';
import formData from '../data/form-data.json';
import menuData from '../data/menu-data.json';
import uiConstants from '../data/ui-constants.json';

/**
 * Load profile data
 */
export const getProfiles = () => {
  return profileData.profiles || [];
};

export const getProfileById = (id: number) => {
  return profileData.profiles.find(profile => profile.id === id);
};

export const getTeams = () => {
  return profileData.teams || [];
};

/**
 * Load dashboard data
 */
export const getDashboardMetrics = () => {
  return dashboardData.analytics?.metrics || [];
};

export const getDashboardChartData = (chartType: string) => {
  return dashboardData.analytics?.chartData?.[chartType] || [];
};

export const getProgressData = () => {
  return dashboardData.analytics?.progressData || [];
};

export const getCRMLeads = () => {
  return dashboardData.crm?.leads || [];
};

export const getCRMHighlights = () => {
  return dashboardData.crm?.highlights || [];
};

export const getSalesSummary = () => {
  return dashboardData.sales?.summary || {};
};

export const getTopProducts = () => {
  return dashboardData.sales?.topProducts || [];
};

export const getNotifications = () => {
  return dashboardData.widgets?.notifications || [];
};

export const getActivities = () => {
  return dashboardData.widgets?.activities || [];
};

/**
 * Load table data and configuration
 */
export const getTableColumns = (type: string = 'standard') => {
  return tableData.tableColumns?.[type] || tableData.tableColumns?.standard || [];
};

export const getTableSettings = () => {
  return tableData.tableSettings || {};
};

export const getSampleTableData = () => {
  return tableData.sampleData || {};
};

/**
 * Load form data
 */
export const getStates = () => {
  return formData.states || [];
};

export const getCountries = () => {
  return formData.countries || [];
};

export const getRegions = () => {
  return formData.regions || [];
};

export const getPresidents = () => {
  return formData.presidents || [];
};

export const getOptionLengths = () => {
  return formData.optionLength || [];
};

export const getValidationRules = (fieldName?: string) => {
  if (fieldName) {
    return formData.validationRules?.[fieldName] || {};
  }
  return formData.validationRules || {};
};

/**
 * Load menu data
 */
export const getNavigation = () => {
  return menuData.navigation || [];
};

export const getUserMenu = () => {
  return menuData.userMenu || [];
};

export const getHeaderMenu = () => {
  return menuData.headerMenu || [];
};

/**
 * Load UI constants
 */
export const getUIConstant = (category: string) => {
  return uiConstants[category] || {};
};

export const getButtons = () => {
  return uiConstants.buttons || {};
};

export const getMessages = () => {
  return uiConstants.messages || {};
};

export const getLabels = () => {
  return uiConstants.labels || {};
};

export const getPlaceholders = () => {
  return uiConstants.placeholders || {};
};

export const getTooltips = () => {
  return uiConstants.tooltips || {};
};

export const getIcons = () => {
  return uiConstants.icons || {};
};

export const getStatusBadges = () => {
  return uiConstants.statusBadges || {};
};

export const getStatusBadge = (status: string) => {
  return uiConstants.statusBadges?.[status] || { label: status, class: 'bg-secondary' };
};

export const getColors = () => {
  return uiConstants.colors || {};
};

export const getClassNames = () => {
  return uiConstants.classNames || {};
};

/**
 * Helper to get asset path
 */
export const getAssetPath = (category: string, filename: string) => {
  const basePath = '/src/assets/utils/images';
  return `${basePath}/${category}/${filename}`;
};

/**
 * Helper to format currency
 */
export const formatCurrency = (value: number, prefix: string = '$', suffix: string = '') => {
  return `${prefix}${value}${suffix}`;
};

/**
 * Helper to get trend icon
 */
export const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return 'faAngleUp';
    case 'down':
      return 'faAngleDown';
    default:
      return '';
  }
};

/**
 * Export all data loaders
 */
export default {
  // Profile
  getProfiles,
  getProfileById,
  getTeams,
  
  // Dashboard
  getDashboardMetrics,
  getDashboardChartData,
  getProgressData,
  getCRMLeads,
  getCRMHighlights,
  getSalesSummary,
  getTopProducts,
  getNotifications,
  getActivities,
  
  // Table
  getTableColumns,
  getTableSettings,
  getSampleTableData,
  
  // Form
  getStates,
  getCountries,
  getRegions,
  getPresidents,
  getOptionLengths,
  getValidationRules,
  
  // Menu
  getNavigation,
  getUserMenu,
  getHeaderMenu,
  
  // UI
  getUIConstant,
  getButtons,
  getMessages,
  getLabels,
  getPlaceholders,
  getTooltips,
  getIcons,
  getStatusBadges,
  getStatusBadge,
  getColors,
  getClassNames,
  
  // Helpers
  getAssetPath,
  formatCurrency,
  getTrendIcon,
};
