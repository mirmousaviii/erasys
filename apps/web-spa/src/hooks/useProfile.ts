import { useEffect, useState } from 'react';
import { fetchProfile } from '@erasys/profile-sdk';
import type { Profile } from '@erasys/profile-sdk';

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? '';

export interface UseProfileResult {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

/**
 * Fetches profile data for the given username. Resets state when username changes
 * and cancels in-flight requests on unmount or when username changes.
 */
export function useProfile(username: string | undefined): UseProfileResult {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      setProfile(null);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setProfile(null);

    fetchProfile({ baseUrl, username })
      .then((data) => {
        if (!cancelled) setProfile(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load profile'
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { profile, loading, error };
}
