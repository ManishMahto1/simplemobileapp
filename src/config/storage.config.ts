export const STORAGE_KEYS = {
  // Redux persist
  REDUX_PERSIST: 'persist:root',
  
  // User preferences
  USER_PREFERENCES: '@user_preferences',
  
  // Cache
  CACHE_DATA: '@cache_data',
  CACHE_TIMESTAMP: '@cache_timestamp',
  
  // App state
  LAST_SYNC: '@last_sync',
  APP_VERSION: '@app_version',
  
  // Data
  POSTS_DATA: '@posts_data',
  USERS_DATA: '@users_data',
} as const;

export const STORAGE_CONFIG = {
  // Cache expiration time in milliseconds (1 hour)
  CACHE_EXPIRATION: 60 * 60 * 1000,
  
  // Maximum items to cache
  MAX_CACHE_ITEMS: 1000,
  
  // Storage size limit (in bytes, 5MB)
  STORAGE_SIZE_LIMIT: 5 * 1024 * 1024,
};
