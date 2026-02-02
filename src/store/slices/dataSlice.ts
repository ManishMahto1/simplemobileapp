import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {fetchPosts, fetchUsers, fetchUserById} from '../../api/endpoints';
import {Post, User} from '../../types/api.types';
import {DataState /* ,LoadingState */} from '../../types/store.types';
import {filterPosts} from '../../utils/helpers';
import {PAGINATION} from '../../utils/constants';

// Initial state
const initialState: DataState = {
  posts: [],
  users: [],
  filteredPosts: [],
  selectedPost: null,
  selectedUser: null,
  pagination: {
    currentPage: 1,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
    totalItems: 0,
    hasMore: true,
  },
  searchQuery: '',
  loading: 'idle',
  error: null,
  lastFetchTime: null,
};

// Async thunks
export const fetchPostsAsync = createAsyncThunk(
  'data/fetchPosts',
  async (params: {page: number; limit: number}, {rejectWithValue}) => {
    try {
      const posts = await fetchPosts(params.page, params.limit);
      return {
        posts,
        page: params.page,
        hasMore: posts.length === params.limit,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  },
);

export const fetchUsersAsync = createAsyncThunk(
  'data/fetchUsers',
  async (_, {rejectWithValue}) => {
    try {
      const users = await fetchUsers();
      return users;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  },
);

export const fetchUserByIdAsync = createAsyncThunk(
  'data/fetchUserById',
  async (userId: number, {rejectWithValue}) => {
    try {
      const user = await fetchUserById(userId);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch user');
    }
  },
);

// Slice
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredPosts = filterPosts(state.posts, action.payload);
    },
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    clearSelectedPost: state => {
      state.selectedPost = null;
    },
    clearSelectedUser: state => {
      state.selectedUser = null;
    },
    clearError: state => {
      state.error = null;
    },
    resetPagination: state => {
      state.pagination = initialState.pagination;
      state.posts = [];
      state.filteredPosts = [];
    },
    updatePagination: (
      state,
      action: PayloadAction<Partial<DataState['pagination']>>,
    ) => {
      state.pagination = {...state.pagination, ...action.payload};
    },
    clearAllData: state => {
      return initialState;
    },
    // Restore data from storage
    restoreData: (
      state,
      action: PayloadAction<{posts?: Post[]; users?: User[]}>,
    ) => {
      if (action.payload.posts) {
        state.posts = action.payload.posts;
        state.filteredPosts = filterPosts(state.posts, state.searchQuery);
      }
      if (action.payload.users) {
        state.users = action.payload.users;
      }
    },
  },
  extraReducers: builder => {
    // Fetch Posts
    builder
      .addCase(fetchPostsAsync.pending, state => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const {posts, page, hasMore} = action.payload;

        if (page === 1) {
          state.posts = posts;
        } else {
          // Append new posts for pagination
          state.posts = [...state.posts, ...posts];
        }

        state.filteredPosts = filterPosts(state.posts, state.searchQuery);
        state.pagination.currentPage = page;
        state.pagination.hasMore = hasMore;
        state.pagination.totalItems = state.posts.length;
        state.lastFetchTime = Date.now();
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });

    // Fetch Users
    builder
      .addCase(fetchUsersAsync.pending, state => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.users = action.payload;
        state.lastFetchTime = Date.now();
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });

    // Fetch User By ID
    builder
      .addCase(fetchUserByIdAsync.pending, state => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserByIdAsync.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  setSearchQuery,
  setSelectedPost,
  setSelectedUser,
  clearSelectedPost,
  clearSelectedUser,
  clearError,
  resetPagination,
  updatePagination,
  clearAllData,
  restoreData,
} = dataSlice.actions;

// Selectors
export const selectPosts = (state: {data: DataState}) => state.data.posts;
export const selectFilteredPosts = (state: {data: DataState}) =>
  state.data.filteredPosts;
export const selectUsers = (state: {data: DataState}) => state.data.users;
export const selectSelectedPost = (state: {data: DataState}) =>
  state.data.selectedPost;
export const selectSelectedUser = (state: {data: DataState}) =>
  state.data.selectedUser;
export const selectSearchQuery = (state: {data: DataState}) =>
  state.data.searchQuery;
export const selectLoading = (state: {data: DataState}) => state.data.loading;
export const selectError = (state: {data: DataState}) => state.data.error;
export const selectPagination = (state: {data: DataState}) =>
  state.data.pagination;

// Export reducer
export default dataSlice.reducer;
