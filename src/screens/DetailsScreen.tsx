import React, {useEffect} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {DetailsScreenProps} from '../types/navigation.types';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  fetchUserByIdAsync,
  selectSelectedUser,
  selectLoading,
} from '../store/slices/dataSlice';
import {COLORS, SPACING, BORDER_RADIUS} from '../theme/index';
import {AppText, Loader} from '../components/common';
import {ROUTES} from '../navigation/routes';

const DetailsScreen: React.FC<DetailsScreenProps> = ({route, navigation}) => {
  const {post} = route.params;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectSelectedUser);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchUserByIdAsync(post.userId));
  }, [post.userId, dispatch]);

  const handleUserPress = () => {
    if (user) {
      navigation.navigate(ROUTES.PROFILE, {userId: user.id});
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.postBadge}>
          <AppText variant="caption" color={COLORS.white} weight="semibold">
            Post #{post.id}
          </AppText>
        </View>
      </View>

      {/* Post Title */}
      <View style={styles.section}>
        <AppText variant="h2" weight="bold" style={styles.title}>
          {post.title}
        </AppText>
      </View>

      {/* Post Body */}
      <View style={styles.section}>
        <AppText variant="body" color={COLORS.textSecondary} style={styles.body}>
          {post.body}
        </AppText>
      </View>

      {/* Author Section */}
      <View style={styles.section}>
        <AppText variant="caption" color={COLORS.gray} style={styles.sectionTitle}>
          AUTHOR
        </AppText>

        {loading === 'loading' && !user ? (
          <Loader size="small" />
        ) : user ? (
          <TouchableOpacity
            style={styles.authorCard}
            onPress={handleUserPress}
            activeOpacity={0.7}>
            <View style={styles.authorAvatar}>
              <AppText variant="h3" weight="bold" color={COLORS.white}>
                {user.name.charAt(0)}
              </AppText>
            </View>
            <View style={styles.authorInfo}>
              <AppText variant="body" weight="semibold">
                {user.name}
              </AppText>
              <AppText variant="caption" color={COLORS.gray}>
                @{user.username}
              </AppText>
              <AppText variant="small" color={COLORS.textSecondary}>
                {user.email}
              </AppText>
            </View>
            <AppText variant="body" color={COLORS.primary}>
              →
            </AppText>
          </TouchableOpacity>
        ) : (
          <AppText variant="caption" color={COLORS.gray}>
            Author information unavailable
          </AppText>
        )}
      </View>

      {/* Metadata Section */}
      <View style={styles.section}>
        <AppText variant="caption" color={COLORS.gray} style={styles.sectionTitle}>
          METADATA
        </AppText>
        <View style={styles.metadataCard}>
          <View style={styles.metadataRow}>
            <AppText variant="caption" color={COLORS.gray}>
              User ID
            </AppText>
            <AppText variant="caption" weight="semibold">
              {post.userId}
            </AppText>
          </View>
          <View style={styles.divider} />
          <View style={styles.metadataRow}>
            <AppText variant="caption" color={COLORS.gray}>
              Post ID
            </AppText>
            <AppText variant="caption" weight="semibold">
              {post.id}
            </AppText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  postBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  section: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  sectionTitle: {
    marginBottom: SPACING.sm,
    letterSpacing: 0.5,
  },
  title: {
    textTransform: 'capitalize',
    lineHeight: 32,
  },
  body: {
    lineHeight: 24,
  },
  authorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
  },
  authorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  authorInfo: {
    flex: 1,
  },
  metadataCard: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.sm,
  },
});

export default DetailsScreen;
