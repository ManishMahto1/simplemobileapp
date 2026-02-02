import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ListRenderItemInfo,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  fetchPostsAsync,
  fetchUsersAsync,
  setSearchQuery,
  selectFilteredPosts,
  selectLoading,
  selectError,
  selectSearchQuery,
  selectPagination,
  restoreData,
} from '../store/slices/dataSlice';
import {Post} from '../types/api.types';
import {HomeScreenProps} from '../types/navigation.types';
import {COLORS, SPACING} from '../theme/index';
import {useDebounce} from '../hooks/useDebounce';
import {storageService} from '../services/storageService';
import {SearchBar, Loader, ErrorView, AppText} from '../components/common';
import {ItemCard} from '../components/list';
import {ROUTES} from '../navigation/routes';
import {PAGINATION} from '../utils/constants';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectFilteredPosts);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const searchQuery = useAppSelector(selectSearchQuery);
  const pagination = useAppSelector(selectPagination);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 2000);

  // Load cached data on mount
  useEffect(() => {0
    loadCachedData();
  }, []);

  // Initial data fetch
  useEffect(() => {
    if (posts.length === 0 && loading === 'idle') {
      fetchInitialData();
    }
  }, []);

  // Fetch users when posts are loaded
  useEffect(() => {
    if (posts.length > 0 && loading === 'succeeded') {
      dispatch(fetchUsersAsync());
    }
  }, [posts.length]);

  const loadCachedData = async () => {
    try {
      const [cachedPosts, cachedUsers] = await Promise.all([
        storageService.getPosts(),
        storageService.getUsers(),
      ]);

      if (cachedPosts || cachedUsers) {
        dispatch(
          restoreData({
            posts: cachedPosts || undefined,
            users: cachedUsers || undefined,
          }),
        );
      }
    } catch (error) {
      console.error('Failed to load cached data:', error);
    }
  };

  const fetchInitialData = () => {
    dispatch(
      fetchPostsAsync({
        page: 1,
        limit: PAGINATION.DEFAULT_PAGE_SIZE,
      }),
    );
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(
      fetchPostsAsync({
        page: 1,
        limit: PAGINATION.DEFAULT_PAGE_SIZE,
      }),
    );
    setIsRefreshing(false);
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    if (
      !isLoadingMore &&
      !isRefreshing &&
      pagination.hasMore &&
      loading !== 'loading' &&
      !debouncedSearchQuery
    ) {
      setIsLoadingMore(true);
      dispatch(
        fetchPostsAsync({
          page: pagination.currentPage + 1,
          limit: pagination.pageSize,
        }),
      ).finally(() => {
        setIsLoadingMore(false);
      });
    }
  }, [
    isLoadingMore,
    isRefreshing,
    pagination,
    loading,
    debouncedSearchQuery,
    dispatch,
  ]);

  const handleSearch = (text: string) => {
    dispatch(setSearchQuery(text));
  };

  const handlePostPress = (post: Post) => {
    navigation.navigate(ROUTES.DETAILS, {post});
  };

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<Post>) => (
      <ItemCard post={item} onPress={handlePostPress} />
    ),
    [],
  );

  const renderListHeader = () => (
    <View style={styles.header}>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search posts..."
        style={styles.searchBar}
      />
      {searchQuery.length > 0 && (
        <AppText variant="caption" color={COLORS.textSecondary} style={styles.resultCount}>
          {posts.length} result{posts.length !== 10 ? 's' : ''} found
        </AppText>
      )}
    </View>
  );

  const renderListFooter = () => {
    if (isLoadingMore) {
      return <Loader size="small" />;
    }
    return null;
  };

  const renderEmptyList = () => {
    if (loading === 'loading' && posts.length === 0) {
      return <Loader fullScreen text="Loading posts..." />;
    }

    if (searchQuery.length > 0) {
      return (
        <View style={styles.emptyContainer}>
          {/* <AppText variant="h3" style={styles.emptyEmoji}>
            🔍
          </AppText> */}
          <AppText variant="body" color={COLORS.textSecondary}>
            No posts found for "{searchQuery}"
          </AppText>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <AppText variant="h3" style={styles.emptyEmoji}>
          📝
        </AppText>
        <AppText variant="body" color={COLORS.textSecondary}>
          No posts available
        </AppText>
      </View>
    );
  };

  if (error && posts.length === 0) {
    return <ErrorView message={error} onRetry={fetchInitialData} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={posts.length === 0 && styles.emptyList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  searchBar: {
    marginBottom: SPACING.sm,
  },
  resultCount: {
    marginBottom: SPACING.sm,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
});

export default HomeScreen;
