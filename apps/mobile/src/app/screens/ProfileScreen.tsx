import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { fetchProfile, buildImageUrl } from '@erasys/profile-sdk';
import type { Profile, Review } from '@erasys/profile-sdk';
import { colors, spacing, fontSize } from '../theme';

// In browser (react-native-web), use relative URL so Vite proxy handles CORS.
// On native (Metro), no CORS — call API directly.
const API_BASE =
  typeof document !== 'undefined' ? '' : 'https://www.hunqz.com';
const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_COLUMNS = 3;
const IMAGE_GAP = 3;
const IMAGE_SIZE =
  (SCREEN_WIDTH - spacing.xl * 2 - IMAGE_GAP * (IMAGE_COLUMNS - 1)) /
  IMAGE_COLUMNS;

interface ProfileScreenProps {
  username: string;
  onGoBack: () => void;
}

export function ProfileScreen({ username, onGoBack }: ProfileScreenProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);
    setProfile(null);

    fetchProfile({ baseUrl: API_BASE, username })
      .then((data) => {
        if (!cancelled) setProfile(data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(
            err instanceof Error ? err.message : 'Failed to load profile'
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Profile Not Found</Text>
        <Text style={styles.errorMessage}>
          Could not load profile for &ldquo;{username}&rdquo;.
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
          <Text style={styles.backButtonText}>{'\u2190'}  Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Breadcrumb */}
      <View style={styles.breadcrumb}>
        <TouchableOpacity onPress={onGoBack}>
          <Text style={styles.breadcrumbLink}>Home</Text>
        </TouchableOpacity>
        <Text style={styles.breadcrumbSep}>{' \u203A '}</Text>
        <Text style={styles.breadcrumbCurrent}>{profile.name}</Text>
      </View>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: buildImageUrl(profile.preview_pic.url_token) }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile.name}</Text>
          <View style={styles.badgeRow}>
            {profile.is_plus && (
              <View style={styles.plusBadge}>
                <Text style={styles.plusBadgeText}>PLUS</Text>
              </View>
            )}
            <View
              style={[
                styles.statusBadge,
                profile.online_status === 'ONLINE'
                  ? styles.statusOnline
                  : styles.statusOffline,
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor:
                      profile.online_status === 'ONLINE'
                        ? colors.green500
                        : colors.gray400,
                  },
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      profile.online_status === 'ONLINE'
                        ? colors.green800
                        : colors.gray600,
                  },
                ]}
              >
                {profile.online_status}
              </Text>
            </View>
          </View>
          <Text style={styles.headline}>{profile.headline}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaItem}>
              {'\uD83D\uDCCD'} {profile.location.name},{' '}
              {profile.location.country}
            </Text>
            <Text style={styles.metaItem}>
              {'\uD83C\uDF82'} Age: {profile.personal.age}
            </Text>
          </View>
          {profile.personal.spoken_languages.length > 0 && (
            <Text style={styles.metaItem}>
              {'\uD83C\uDF10'}{' '}
              {profile.personal.spoken_languages
                .map((l) => l.toUpperCase())
                .join(', ')}
            </Text>
          )}
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        {profile.personal.profile_text ? (
          <Text style={styles.profileText}>
            {profile.personal.profile_text}
          </Text>
        ) : null}
        <View style={styles.detailGrid}>
          <DetailCard label="Height" value={`${profile.personal.height} cm`} />
          <DetailCard label="Weight" value={`${profile.personal.weight} kg`} />
          <DetailCard label="Body Type" value={profile.personal.body_type} />
          <DetailCard label="Eye Color" value={profile.personal.eye_color} />
          <DetailCard label="Hair Color" value={profile.personal.hair_color} />
          <DetailCard
            label="Hair Length"
            value={profile.personal.hair_length}
          />
          <DetailCard
            label="Orientation"
            value={profile.personal.orientation}
          />
          <DetailCard label="Smoker" value={profile.personal.smoker} />
        </View>
      </View>

      {/* Photos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Photos{' '}
          <Text style={styles.sectionCount}>({profile.pictures.length})</Text>
        </Text>
        <View style={styles.photoGrid}>
          {profile.pictures.map((pic) => (
            <Image
              key={pic.id}
              source={{ uri: buildImageUrl(pic.url_token) }}
              style={styles.photo}
            />
          ))}
        </View>
      </View>

      {/* Reviews */}
      {profile.reviews.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Reviews{' '}
            <Text style={styles.sectionCount}>
              ({profile.reviews.length})
            </Text>
          </Text>
          {profile.reviews.slice(0, 6).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </View>
      )}

      {/* Social Links */}
      {profile.social_links.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social</Text>
          <View style={styles.socialRow}>
            {profile.social_links.map((link) => (
              <View key={link.type} style={styles.socialChip}>
                <Text style={styles.socialType}>{link.type}</Text>
                <Text style={styles.socialValue}>@{link.value}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  const display = value.replace(/_/g, ' ').toLowerCase();
  return (
    <View style={styles.detailCard}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{display}</Text>
    </View>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.updated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>
          {review.reviewer_name || 'Anonymous'}
        </Text>
        {review.vote !== undefined && (
          <Text
            style={[
              styles.reviewVote,
              {
                color:
                  review.vote > 0
                    ? colors.green500
                    : review.vote < 0
                      ? colors.red500
                      : colors.gray400,
              },
            ]}
          >
            {review.vote > 0 ? '+1' : review.vote < 0 ? '-1' : '0'}
          </Text>
        )}
        <Text style={styles.reviewDate}>{date}</Text>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
      {review.reply && (
        <View style={styles.reviewReply}>
          <Text style={styles.reviewReplyLabel}>Reply</Text>
          <Text style={styles.reviewReplyText}>{review.reply.text}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.gray50,
  },
  loadingText: {
    marginTop: spacing.lg,
    fontSize: fontSize.md,
    color: colors.gray500,
  },
  errorTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.gray900,
  },
  errorMessage: {
    fontSize: fontSize.md,
    color: colors.gray600,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  backButton: {
    marginTop: spacing.xxl,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  backButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.white,
  },

  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  breadcrumbLink: {
    fontSize: fontSize.sm,
    color: colors.primary,
  },
  breadcrumbSep: {
    fontSize: fontSize.sm,
    color: colors.gray400,
    marginHorizontal: spacing.xs,
  },
  breadcrumbCurrent: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray900,
  },

  profileHeader: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: colors.primaryLight,
    marginRight: spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.gray900,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
    flexWrap: 'wrap',
  },
  plusBadge: {
    backgroundColor: colors.amber100,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  plusBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.amber800,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    gap: spacing.xs,
  },
  statusOnline: {
    backgroundColor: colors.green100,
  },
  statusOffline: {
    backgroundColor: colors.gray100,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  headline: {
    fontSize: fontSize.sm,
    color: colors.gray600,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  metaItem: {
    fontSize: fontSize.sm,
    color: colors.gray500,
  },

  section: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.gray900,
    marginBottom: spacing.md,
  },
  sectionCount: {
    fontSize: fontSize.md,
    fontWeight: '400',
    color: colors.gray500,
  },
  profileText: {
    fontSize: fontSize.sm,
    lineHeight: 22,
    color: colors.gray600,
    marginBottom: spacing.lg,
  },

  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  detailCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 10,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    width: '48%',
  },
  detailLabel: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray900,
    textTransform: 'capitalize',
    marginTop: 2,
  },

  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: IMAGE_GAP,
  },
  photo: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 10,
    backgroundColor: colors.gray200,
  },

  reviewCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  reviewerName: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray900,
    flex: 1,
  },
  reviewVote: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  reviewDate: {
    fontSize: fontSize.xs,
    color: colors.gray400,
  },
  reviewComment: {
    fontSize: fontSize.sm,
    lineHeight: 20,
    color: colors.gray600,
    marginTop: spacing.sm,
  },
  reviewReply: {
    backgroundColor: colors.gray50,
    borderRadius: 8,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  reviewReplyLabel: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  reviewReplyText: {
    fontSize: fontSize.sm,
    color: colors.gray600,
  },

  socialRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  socialChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    borderRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  socialType: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray700,
    textTransform: 'capitalize',
  },
  socialValue: {
    fontSize: fontSize.sm,
    color: colors.gray400,
  },

  bottomSpacer: {
    height: spacing.xxxl,
  },
});
