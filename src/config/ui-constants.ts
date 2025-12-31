/**
 * UI Constants and Configurations
 * All hardcoded UI-related values externalized here
 */

// Layout Dimensions
export const LAYOUT_DIMENSIONS = {
  HEADER_HEIGHT: '41px',
  MENU_BAR_PADDING: '0.31rem',
  FOOTER_HEIGHT: '23px',
};

// Layout Colors
export const LAYOUT_COLORS = {
  HEADER_BACKGROUND: '#000000',
  HEADER_TEXT: '#ffffff',
  MENU_BAR_BACKGROUND: '#1e5a8e',
  MENU_BAR_TEXT: 'rgba(255, 255, 255, 0.9)',
  MENU_BAR_ACTIVE_BACKGROUND: '#ffffff',
  MENU_BAR_ACTIVE_TEXT: '#1e5a8e',
  FOOTER_BACKGROUND: '#000000',
  FOOTER_TEXT: '#ffffff',
};

// Component Class Names
export const CLASS_NAMES = {
  // Cards
  CARD_HEADER_TAB: 'card-header-tab',
  CARD_HOVER_SHADOW: 'card-hover-shadow-2x',
  CARD_PROFILE_BLOCK: 'profile-block',
  
  // Buttons
  BTN_SHADOW: 'btn-shadow',
  BTN_WIDE: 'btn-wide',
  BTN_PILL: 'btn-pill',
  BTN_ICON: 'btn-icon',
  BTN_ICON_ONLY: 'btn-icon-only',
  BTN_HOVER_SHINE: 'btn-hover-shine',
  
  // Badges
  BADGE: 'badge',
  BADGE_SUCCESS: 'bg-success',
  BADGE_WARNING: 'bg-warning',
  BADGE_DANGER: 'bg-danger',
  BADGE_INFO: 'bg-info',
  BADGE_PRIMARY: 'bg-primary',
  BADGE_SECONDARY: 'bg-secondary',
  
  // Avatar
  AVATAR_ICON: 'avatar-icon',
  AVATAR_ICON_LG: 'avatar-icon-lg',
  AVATAR_ICON_SM: 'avatar-icon-sm',
  AVATAR_ROUNDED: 'rounded',
  AVATAR_ROUNDED_CIRCLE: 'rounded-circle',
  
  // Widgets
  WIDGET_CONTENT: 'widget-content',
  WIDGET_CONTENT_WRAPPER: 'widget-content-wrapper',
  WIDGET_CONTENT_LEFT: 'widget-content-left',
  WIDGET_CONTENT_RIGHT: 'widget-content-right',
  WIDGET_HEADING: 'widget-heading',
  WIDGET_SUBHEADING: 'widget-subheading',
  WIDGET_NUMBERS: 'widget-numbers',
  
  // Dropdown
  DROPDOWN_MENU_HEADER: 'dropdown-menu-header',
  MENU_HEADER_CONTENT: 'menu-header-content',
  MENU_HEADER_TITLE: 'menu-header-title',
  MENU_HEADER_SUBTITLE: 'menu-header-subtitle',
  
  // Opacity
  OPACITY_5: 'opacity-5',
  OPACITY_6: 'opacity-6',
  OPACITY_7: 'opacity-7',
  OPACITY_8: 'opacity-8',
  OPACITY_9: 'opacity-9',
  OPACITY_10: 'opacity-10',
  
  // Background colors
  BG_PRIMARY: 'bg-primary',
  BG_SUCCESS: 'bg-success',
  BG_DANGER: 'bg-danger',
  BG_WARNING: 'bg-warning',
  BG_INFO: 'bg-info',
  BG_DARK: 'bg-dark',
  BG_LIGHT: 'bg-light',
  
  // Text colors
  TEXT_PRIMARY: 'text-primary',
  TEXT_SUCCESS: 'text-success',
  TEXT_DANGER: 'text-danger',
  TEXT_WARNING: 'text-warning',
  TEXT_INFO: 'text-info',
  TEXT_MUTED: 'text-muted',
  TEXT_FOCUS: 'text-focus',
  
  // Animations
  TABS_ANIMATION: 'TabsAnimation',
  
  // List
  RM_LIST_BORDERS: 'rm-list-borders',
  RM_LIST_BORDERS_SCROLL: 'rm-list-borders-scroll',
  
  // Progress
  PROGRESS_BAR_SM: 'progress-bar-sm',
  PROGRESS_BAR_ANIMATED_ALT: 'progress-bar-animated-alt',
  
  // Scroll
  SCROLL_AREA_SM: 'scroll-area-sm',
  SCROLL_AREA_MD: 'scroll-area-md',
  SCROLL_AREA_LG: 'scroll-area-lg',
};

// Icon Names
export const ICONS = {
  // Linear Icons
  INBOX: 'lnr-inbox',
  CAMERA: 'lnr-camera',
  USER: 'lnr-user',
  COG: 'lnr-cog',
  EXIT: 'lnr-exit',
  BOOK: 'lnr-book',
  FILE_EMPTY: 'lnr-file-empty',
  CHART_BARS: 'lnr-chart-bars',
  CLOUD_DOWNLOAD: 'lnr-cloud-download',
  LAPTOP_PHONE: 'lnr-laptop-phone',
  
  // PE7 Icons
  ROCKET: 'pe-7s-rocket',
  USERS: 'pe-7s-users',
  CONFIG: 'pe-7s-config',
  GRAPH2: 'pe-7s-graph2',
  NOTE2: 'pe-7s-note2',
  SERVER: 'pe-7s-server',
  GRAPH1: 'pe-7s-graph1',
  PLUGIN: 'pe-7s-plugin',
  BROWSER: 'pe-7s-browser',
  DIAMOND: 'pe-7s-diamond',
  CART: 'pe-7s-cart',
  CASH: 'pe-7s-cash',
  BOX2: 'pe-7s-box2',
  WALLET: 'pe-7s-wallet',
  MENU: 'pe-7s-menu',
  MEDAL: 'pe-7s-medal',
  DISPLAY2: 'pe-7s-display2',
  GRAPH: 'pe-7s-graph',
  MOUSE: 'pe-7s-mouse',
  CAR: 'pe-7s-car',
  
  // FontAwesome Icons
  ANGLE_DOWN: 'faAngleDown',
  ANGLE_UP: 'faAngleUp',
  CALENDAR: 'faCalendarAlt',
  DOT_CIRCLE: 'faDotCircle',
};

// Asset Paths
export const ASSET_PATHS = {
  AVATARS: '/assets/utils/images/avatars',
  BACKGROUNDS: '/assets/utils/images/dropdown-header',
  ORIGINALS: '/assets/utils/images/originals',
};

// UI Text Constants
export const UI_TEXT = {
  // Common buttons
  SAVE: 'Save',
  CANCEL: 'Cancel',
  SUBMIT: 'Submit',
  DELETE: 'Delete',
  EDIT: 'Edit',
  ADD: 'Add',
  VIEW_DETAILS: 'View Details',
  ACTION: 'Action',
  CLOSE: 'Close',
  
  // Status labels
  COMPLETED: 'Completed',
  PENDING: 'Pending',
  ON_HOLD: 'On Hold',
  CANCELLED: 'Cancelled',
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  
  // Common headers
  HEADER: 'Header',
  ACTIONS: 'Actions',
  SETTINGS: 'Settings',
  MENUS: 'Menus',
  
  // Common messages
  NO_DATA: 'No data available',
  LOADING: 'Loading...',
  ERROR: 'An error occurred',
  SUCCESS: 'Operation completed successfully',
  
  // Placeholders
  SEARCH_PLACEHOLDER: 'Search...',
  SELECT_OPTION: 'Select an option',
};

// Chart Configuration
export const CHART_CONFIG = {
  DEFAULT_HEIGHT: 300,
  DEFAULT_WIDTH: '100%',
  ANIMATION_DURATION: 750,
  COLORS: {
    PRIMARY: '#3f6ad8',
    SUCCESS: '#3ac47d',
    DANGER: '#d92550',
    WARNING: '#f7b924',
    INFO: '#16aaff',
  },
  SPARKLINE_HEIGHT: 60,
};

// Table Configuration
export const TABLE_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 15, 20, 25, 50, 100],
  FIXED_HEADER_SCROLL_HEIGHT: '400px',
  ALTERNATIVE_SCROLL_HEIGHT: '370px',
};

// Animation Configuration
export const ANIMATION_CONFIG = {
  TRANSITION_TIMEOUT: 1500,
  FADE_TIMEOUT: 300,
  SLIDE_TIMEOUT: 500,
};

// Size Constants
export const SIZES = {
  AVATAR: {
    SMALL: 40,
    MEDIUM: 42,
    LARGE: 60,
  },
  SPACING: {
    XS: 2,
    SM: 3,
    MD: 4,
    LG: 5,
    XL: 6,
  },
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400,
};

// Pagination Configuration
export const PAGINATION_CONFIG = {
  ROWS_PER_PAGE: 10,
  ROWS_PER_PAGE_OPTIONS: [5, 10, 15, 20, 25],
  SHOW_FIRST_LAST: true,
  SHOW_PAGINATION_TOP: false,
  SHOW_PAGINATION_BOTTOM: true,
};

// Modal Configuration
export const MODAL_CONFIG = {
  DEFAULT_SIZE: 'lg',
  BACKDROP: true,
  KEYBOARD: true,
  CENTERED: false,
};

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  POSITION: 'top-right',
  AUTO_CLOSE: 5000,
  HIDE_PROGRESS_BAR: false,
  CLOSE_ON_CLICK: true,
  PAUSE_ON_HOVER: true,
};

// Currency Format
export const CURRENCY_CONFIG = {
  SYMBOL: '$',
  DECIMAL_SEPARATOR: '.',
  THOUSAND_SEPARATOR: ',',
  DECIMAL_PLACES: 2,
};

// Date Format
export const DATE_FORMAT = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  TIME: 'HH:mm:ss',
  DATETIME: 'MM/DD/YYYY HH:mm:ss',
};

export default {
  CLASS_NAMES,
  ICONS,
  ASSET_PATHS,
  UI_TEXT,
  CHART_CONFIG,
  TABLE_CONFIG,
  ANIMATION_CONFIG,
  SIZES,
  BREAKPOINTS,
  PAGINATION_CONFIG,
  MODAL_CONFIG,
  NOTIFICATION_CONFIG,
  CURRENCY_CONFIG,
  DATE_FORMAT,
};
