import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {COLORS, SPACING} from '../../theme/index';
import AppText from './AppText';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
  retryText?: string;
  style?: StyleProp<ViewStyle>;
}

const ErrorView: React.FC<ErrorViewProps> = ({
  message = 'Something went wrong',
  onRetry,
  retryText = 'Try Again',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <AppText variant="h3" style={styles.emoji}>
        😕
      </AppText>
      <AppText variant="body" color={COLORS.textSecondary} style={styles.message}>
        {message}
      </AppText>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry} activeOpacity={0.7}>
          <AppText variant="body" weight="semibold" color={COLORS.white}>
            {retryText}
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  message: {
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 8,
  },
});

export default ErrorView;
