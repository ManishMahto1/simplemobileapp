export const ROUTES = {
  HOME: 'Home',
  DETAILS: 'Details',
  PROFILE: 'Profile',
} as const;

export type RouteNames = (typeof ROUTES)[keyof typeof ROUTES];
