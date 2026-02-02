export const API_CONFIG = {
  BASE_URL: 'https://jsonplaceholder.typicode.com',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

export const ENDPOINTS = {
  POSTS: '/posts',
  USERS: '/users',
  COMMENTS: '/comments',
  ALBUMS: '/albums',
  PHOTOS: '/photos',
};

export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;
