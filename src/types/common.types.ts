// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// Component Props
export interface BaseComponentProps {
  testID?: string;
}

// Status Types
export type Status = 'idle' | 'loading' | 'success' | 'error';

// Sort Direction
export type SortDirection = 'asc' | 'desc';

// Filter Options
export interface FilterOptions {
  searchTerm?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
  filters?: Record<string, any>;
}

// Callback Types
export type VoidCallback = () => void;
export type AsyncVoidCallback = () => Promise<void>;
export type Callback<T> = (value: T) => void;
export type AsyncCallback<T> = (value: T) => Promise<void>;

// Error Handler
export type ErrorHandler = (error: Error | string) => void;

// Theme Types (for future dark mode support)
export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  border: string;
  error: string;
  success: string;
}
