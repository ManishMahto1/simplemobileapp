import React, {useEffect} from 'react';
import {View, ScrollView, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import {ProfileScreenProps} from '../types/navigation.types';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  fetchUserByIdAsync,
  selectSelectedUser,
  selectLoading,
} from '../store/slices/dataSlice';
import {COLORS, SPACING, BORDER_RADIUS} from '../theme/index';
import {AppText, Loader, ErrorView} from '../components/common';

const ProfileScreen: React.FC<ProfileScreenProps> = ({route}) => {
  const {userId} = route.params;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectSelectedUser);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchUserByIdAsync(userId));
  }, [userId, dispatch]);

  const handleEmailPress = () => {
    if (user?.email) {
      Linking.openURL(`mailto:${user.email}`);
    }
  };

  const handlePhonePress = () => {
    if (user?.phone) {
      Linking.openURL(`tel:${user.phone}`);
    }
  };

  const handleWebsitePress = () => {
    if (user?.website) {
      const url = user.website.startsWith('http')
        ? user.website
        : `https://${user.website}`;
      Linking.openURL(url);
    }
  };

  if (loading === 'loading' && !user) {
    return <Loader fullScreen text="Loading profile..." />;
  }

  if (!user) {
    return <ErrorView message="User not found" />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <AppText variant="h1" weight="bold" color={COLORS.white}>
            {user.name.charAt(0)}
          </AppText>
        </View>
        <AppText variant="h2" weight="bold" style={styles.name}>
          {user.name}
        </AppText>
        <AppText variant="body" color={COLORS.gray}>
          @{user.username}
        </AppText>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <AppText variant="caption" color={COLORS.gray} style={styles.sectionTitle}>
          CONTACT INFORMATION
        </AppText>

        <TouchableOpacity
          style={styles.contactItem}
          onPress={handleEmailPress}
          activeOpacity={0.7}>
          <AppText variant="body" style={styles.contactIcon}>
            ✉️
          </AppText>
          <View style={styles.contactInfo}>
            <AppText variant="caption" color={COLORS.gray}>
              Email
            </AppText>
            <AppText variant="body" color={COLORS.primary}>
              {user.email}
            </AppText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactItem}
          onPress={handlePhonePress}
          activeOpacity={0.7}>
          <AppText variant="body" style={styles.contactIcon}>
            📞
          </AppText>
          <View style={styles.contactInfo}>
            <AppText variant="caption" color={COLORS.gray}>
              Phone
            </AppText>
            <AppText variant="body" color={COLORS.primary}>
              {user.phone}
            </AppText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactItem}
          onPress={handleWebsitePress}
          activeOpacity={0.7}>
          <AppText variant="body" style={styles.contactIcon}>
            🌐
          </AppText>
          <View style={styles.contactInfo}>
            <AppText variant="caption" color={COLORS.gray}>
              Website
            </AppText>
            <AppText variant="body" color={COLORS.primary}>
              {user.website}
            </AppText>
          </View>
        </TouchableOpacity>
      </View>

      {/* Address Information */}
      <View style={styles.section}>
        <AppText variant="caption" color={COLORS.gray} style={styles.sectionTitle}>
          ADDRESS
        </AppText>
        <View style={styles.addressCard}>
          <AppText variant="body" style={styles.addressText}>
            {user.address.suite}, {user.address.street}
          </AppText>
          <AppText variant="body" style={styles.addressText}>
            {user.address.city}, {user.address.zipcode}
          </AppText>
          <AppText variant="caption" color={COLORS.gray} style={styles.addressCoords}>
            📍 {user.address.geo.lat}, {user.address.geo.lng}
          </AppText>
        </View>
      </View>

      {/* Company Information */}
      <View style={styles.section}>
        <AppText variant="caption" color={COLORS.gray} style={styles.sectionTitle}>
          COMPANY
        </AppText>
        <View style={styles.companyCard}>
          <AppText variant="body" weight="semibold" style={styles.companyName}>
            {user.company.name}
          </AppText>
          <AppText variant="caption" color={COLORS.gray} style={styles.companyCatchPhrase}>
            "{user.company.catchPhrase}"
          </AppText>
          <AppText variant="small" color={COLORS.textSecondary} style={styles.companyBs}>
            {user.company.bs}
          </AppText>
        </View>
      </View>

      {/* Additional Spacing */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    padding: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  name: {
    marginBottom: SPACING.xs,
  },
  section: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
    letterSpacing: 0.5,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
  },
  contactIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  contactInfo: {
    flex: 1,
  },
  addressCard: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
  },
  addressText: {
    marginBottom: SPACING.xs,
  },
  addressCoords: {
    marginTop: SPACING.sm,
  },
  companyCard: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
  },
  companyName: {
    marginBottom: SPACING.xs,
  },
  companyCatchPhrase: {
    marginBottom: SPACING.sm,
    fontStyle: 'italic',
  },
  companyBs: {
    marginTop: SPACING.xs,
  },
  bottomSpacer: {
    height: SPACING.xl,
  },
});

export default ProfileScreen;
