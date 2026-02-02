import {Post, User, PaginationParams} from './api.types';

// Loading State
export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

// Data State
export interface DataState {
  posts: Post[];
  users: User[];
  filteredPosts: Post[];
  selectedPost: Post | null;
  selectedUser: User | null;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    hasMore: boolean;
  };
  searchQuery: string;
  loading: LoadingState;
  error: string | null;
  lastFetchTime: number | null;
}

// Initial State Type
export interface RootState {
  data: DataState;
}

// Action Payload Types
export interface FetchPostsPayload {
  posts: Post[];
  page: number;
  hasMore: boolean;
}

export interface FetchUsersPayload {
  users: User[];
}

export interface SetSelectedPostPayload {
  post: Post;
}

export interface SetSelectedUserPayload {
  user: User;
}

export interface SetSearchQueryPayload {
  query: string;
}

export interface SetErrorPayload {
  error: string;
}

export interface UpdatePaginationPayload {
  page?: number;
  pageSize?: number;
  totalItems?: number;
  hasMore?: boolean;
}
