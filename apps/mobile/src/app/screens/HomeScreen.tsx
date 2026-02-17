import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { colors, spacing, fontSize } from '../theme';

interface HomeScreenProps {
  onNavigateToProfile: (username: string) => void;
}

const FEATURED_USERNAME = 'msescortplus';

export function HomeScreen({ onNavigateToProfile }: HomeScreenProps) {
  return (
    <ScrollView style={styles.container}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>MOBILE APP</Text>
        <Text style={styles.heroTitle}>Discover Profiles.</Text>
        <Text style={styles.heroTitleAccent}>Browse Galleries.</Text>
        <Text style={styles.heroDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco.
        </Text>
        <TouchableOpacity
          style={styles.heroButton}
          onPress={() => onNavigateToProfile(FEATURED_USERNAME)}
          activeOpacity={0.8}
        >
          <Text style={styles.heroButtonText}>Explore Sample Profile</Text>
          <ArrowRight size={18} color={colors.primaryDark} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatItem value="Native" label="React Native" />
        <StatItem value="20+" label="Photos" />
        <StatItem value="Shared" label="SDK" />
      </View>

      {/* How It Works */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>HOW IT WORKS</Text>
        <Text style={styles.sectionTitle}>
          From API to Gallery in Milliseconds
        </Text>
        <Text style={styles.sectionDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur.
        </Text>

        <FeatureCard
          step="01"
          title="Fetch Profile Data"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
        />
        <FeatureCard
          step="02"
          title="Render Natively"
          description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        />
        <FeatureCard
          step="03"
          title="Optimized Delivery"
          description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
        />
      </View>

      {/* CTA */}
      <View style={styles.section}>
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Ready to See It in Action?</Text>
          <Text style={styles.ctaDescription}>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores.
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => onNavigateToProfile(FEATURED_USERNAME)}
            activeOpacity={0.8}
          >
            <Text style={styles.ctaButtonText}>
              View {FEATURED_USERNAME}&apos;s Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function FeatureCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureStepBadge}>
        <Text style={styles.featureStepText}>{step}</Text>
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },

  hero: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxxl,
  },
  heroLabel: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 2,
    color: colors.primaryLight,
    marginBottom: spacing.sm,
  },
  heroTitle: {
    fontSize: fontSize.xxxl,
    fontWeight: '800',
    color: colors.white,
  },
  heroTitleAccent: {
    fontSize: fontSize.xxxl,
    fontWeight: '800',
    color: colors.primaryLight,
    marginBottom: spacing.lg,
  },
  heroDescription: {
    fontSize: fontSize.md,
    lineHeight: 24,
    color: colors.primaryLight,
    marginBottom: spacing.xxl,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  heroButtonText: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.primaryDark,
  },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  statItem: {
    flex: 1,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.gray200,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    color: colors.gray500,
    marginTop: spacing.xs,
  },

  section: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  sectionLabel: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 2,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.gray900,
    marginBottom: spacing.sm,
  },
  sectionDescription: {
    fontSize: fontSize.sm,
    lineHeight: 22,
    color: colors.gray600,
    marginBottom: spacing.xl,
  },

  featureCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing.xl,
    marginBottom: spacing.md,
  },
  featureStepBadge: {
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  featureStepText: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.primary,
  },
  featureTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.gray900,
    marginBottom: spacing.sm,
  },
  featureDescription: {
    fontSize: fontSize.sm,
    lineHeight: 20,
    color: colors.gray600,
  },

  ctaCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: 16,
    padding: spacing.xxl,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  ctaDescription: {
    fontSize: fontSize.sm,
    lineHeight: 22,
    color: colors.primaryLight,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  ctaButton: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  ctaButtonText: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.primaryDark,
  },

  bottomSpacer: {
    height: spacing.xxxl,
  },
});
