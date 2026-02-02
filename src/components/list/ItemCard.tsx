import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Post} from '../../types/api.types';
import {COLORS, SPACING, BORDER_RADIUS} from '../../theme/index';
import AppText from '../../components/common/AppText';
import {truncateText} from '../../utils/helpers';

interface ItemCardProps {
  post: Post;
  onPress: (post: Post) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({post, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(post)}
      activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <AppText variant="caption" weight="bold" color={COLORS.white}>
            {post.userId}
          </AppText>
        </View>
        <View style={styles.headerText}>
          <AppText variant="caption" color={COLORS.textSecondary}>
            User #{post.userId}
          </AppText>
          <AppText variant="small" color={COLORS.gray}>
            Post #{post.id}
          </AppText>
        </View>
      </View>

      <AppText variant="body" weight="semibold" style={styles.title}>
        {post.title}
      </AppText>

      <AppText
        variant="caption"
        color={COLORS.textSecondary}
        style={styles.body}
        numberOfLines={2}>
        {truncateText(post.body, 100)}
      </AppText>

      <View style={styles.footer}>
        <AppText variant="small" color={COLORS.primary}>
          Read more →
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  headerText: {
    flex: 1,
  },
  title: {
    marginBottom: SPACING.sm,
    textTransform: 'capitalize',
  },
  body: {
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default ItemCard;
