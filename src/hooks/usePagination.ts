import {useState, useCallback} from 'react';
import {PAGINATION} from '../utils/constants';

interface UsePaginationOptions {
  initialPage?: number;
  pageSize?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToPage: (page: number) => void;
  reset: () => void;
  hasMore: boolean;
  setHasMore: (value: boolean) => void;
}

/**
 * Hook to manage pagination state
 * @param options - Pagination options
 * @returns Pagination state and controls
 */
export function usePagination(
  options: UsePaginationOptions = {},
): UsePaginationReturn {
  const {
    initialPage = PAGINATION.INITIAL_PAGE,
    pageSize = PAGINATION.DEFAULT_PAGE_SIZE,
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const goToNextPage = useCallback(() => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(page, 1));
  }, []);

  const reset = useCallback(() => {
    setCurrentPage(initialPage);
    setHasMore(true);
  }, [initialPage]);

  return {
    currentPage,
    pageSize,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    reset,
    hasMore,
    setHasMore,
  };
}
