import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {COLORS} from '../../theme/colors';
import AppText from './AppText';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = COLORS.primary,
  text,
  fullScreen = false,
  style,
}) => {
  const containerStyle = fullScreen ? styles.fullScreen : styles.container;

  return (
    <View style={[containerStyle, style]}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <AppText variant="caption" color={COLORS.textSecondary} style={styles.text}>
          {text}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  text: {
    marginTop: 12,
  },
});

export default Loader;
