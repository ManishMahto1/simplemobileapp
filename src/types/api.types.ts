// Base API Response
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

// Error Response
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// Post Type
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// User Type
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// Comment Type
export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// Album Type
export interface Album {
  userId: number;
  id: number;
  title: string;
}

// Photo Type
export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}
