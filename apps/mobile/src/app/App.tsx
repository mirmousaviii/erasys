import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { HomeScreen } from './screens/HomeScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { colors, spacing, fontSize } from './theme';

type Route =
  | { screen: 'home' }
  | { screen: 'profile'; username: string };

export const App = () => {
  const [route, setRoute] = useState<Route>({ screen: 'home' });

  const navigateToProfile = useCallback((username: string) => {
    setRoute({ screen: 'profile', username });
  }, []);

  const navigateHome = useCallback(() => {
    setRoute({ screen: 'home' });
  }, []);

  const isProfilePage = route.screen === 'profile';

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={navigateHome}
            style={styles.logoTouchable}
            activeOpacity={0.7}
          >
            <Text style={styles.logoText}>
              Erasys<Text style={styles.logoAccent}> Gallery</Text>
            </Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>MOBILE</Text>
            </View>
          </TouchableOpacity>

          {!isProfilePage && (
            <TouchableOpacity
              style={styles.headerCta}
              onPress={() => navigateToProfile('msescortplus')}
              activeOpacity={0.8}
            >
              <Text style={styles.headerCtaText}>Sample Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Screen */}
        {route.screen === 'home' && (
          <HomeScreen onNavigateToProfile={navigateToProfile} />
        )}
        {route.screen === 'profile' && (
          <ProfileScreen
            username={route.username}
            onGoBack={navigateHome}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  logoTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoText: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.gray900,
  },
  logoAccent: {
    color: colors.primary,
  },
  badge: {
    backgroundColor: colors.primaryLight,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primaryText,
    letterSpacing: 0.5,
  },
  headerCta: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  headerCtaText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.white,
  },
});

export default App;
