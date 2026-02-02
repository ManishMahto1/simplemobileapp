import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';
import {COLORS, FONT_SIZE, FONT_WEIGHT} from '../../theme/index';

interface AppTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'small';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: string;
  children: React.ReactNode;
}

const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  weight = 'regular',
  color = COLORS.textPrimary,
  style,
  children,
  ...props
}) => {
  const variantStyles = {
    h1: styles.h1,
    h2: styles.h2,
    h3: styles.h3,
    body: styles.body,
    caption: styles.caption,
    small: styles.small,
  };

  const weightStyles = {
    regular: {fontWeight: FONT_WEIGHT.regular},
    medium: {fontWeight: FONT_WEIGHT.medium},
    semibold: {fontWeight: FONT_WEIGHT.semibold},
    bold: {fontWeight: FONT_WEIGHT.bold},
  };

  return (
    <Text
      style={[
        styles.base,
        variantStyles[variant],
        weightStyles[weight],
        {color},
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: COLORS.textPrimary,
  },
  h1: {
    fontSize: FONT_SIZE.xxxl,
    lineHeight: 40,
    fontWeight: FONT_WEIGHT.bold,
  },
  h2: {
    fontSize: FONT_SIZE.xxl,
    lineHeight: 32,
    fontWeight: FONT_WEIGHT.bold,
  },
  h3: {
    fontSize: FONT_SIZE.xl,
    lineHeight: 28,
    fontWeight: FONT_WEIGHT.semibold,
  },
  body: {
    fontSize: FONT_SIZE.md,
    lineHeight: 24,
    fontWeight: FONT_WEIGHT.regular,
  },
  caption: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
    fontWeight: FONT_WEIGHT.regular,
  },
  small: {
    fontSize: FONT_SIZE.xs,
    lineHeight: 16,
    fontWeight: FONT_WEIGHT.regular,
  },
});

export default AppText;
