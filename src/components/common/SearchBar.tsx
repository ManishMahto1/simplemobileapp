import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {COLORS, SPACING, BORDER_RADIUS} from '../../theme/index';
import AppText from './AppText';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  style?: StyleProp<ViewStyle>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
  style,
}) => {
  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  return (
    <View style={[styles.container, style]}>
     {/*  <AppText variant="body" style={styles.icon}>
        🔍
      </AppText> */}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <AppText variant="body" style={styles.clearText}>
            ✕
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 44,
  },
  icon: {
    marginRight: SPACING.sm,
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    padding: 0,
  },
  clearButton: {
    padding: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  clearText: {
    color: COLORS.gray,
    fontSize: 18,
  },
});

export default SearchBar;
