// App Constants
export const APP_NAME = 'simplemobileapp';
export const APP_VERSION = '1.0.0';

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  INITIAL_PAGE: 1,
  LOAD_MORE_THRESHOLD: 0.5, // Load more when 50% from bottom
} as const;

// Search Constants
export const SEARCH = {
  DEBOUNCE_DELAY: 300, // milliseconds
  MIN_SEARCH_LENGTH: 2,
  MAX_RECENT_SEARCHES: 10,
} as const;

// API Constants
export const API = {
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Cache Constants
export const CACHE = {
  TTL: 5 * 60 * 1000, // 5 minutes
  MAX_SIZE: 100, // Maximum number of items
} as const;

// Animation Constants
export const ANIMATION = {
  DURATION: {
    SHORT: 200,
    MEDIUM: 300,
    LONG: 500,
  },
  EASING: {
    IN: 'ease-in',
    OUT: 'ease-out',
    IN_OUT: 'ease-in-out',
  },
} as const;

// Screen Names (for analytics tracking)
export const SCREENS = {
  HOME: 'Home',
  DETAILS: 'Details',
  PROFILE: 'Profile',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  NO_DATA: 'No data available.',
  FETCH_FAILED: 'Failed to fetch data.',
  TIMEOUT: 'Request timeout. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  DATA_LOADED: 'Data loaded successfully.',
  REFRESH_SUCCESS: 'Refreshed successfully.',
} as const;
