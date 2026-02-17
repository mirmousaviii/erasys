import type { Profile } from './types.js';

export interface FetchProfileOptions {
  /**
   * Base URL for the API.
   * - Next.js SSR (server-side): 'https://www.hunqz.com'
   * - Client-side (via proxy): '' (empty string for relative URL)
   */
  baseUrl: string;

  /**
   * Profile username to fetch.
   * @default 'msescortplus'
   */
  username?: string;
}

/**
 * Ensures array fields from the API are always arrays (some profiles omit them, e.g. social_links).
 */
function normalizeProfile(raw: Profile): Profile {
  const result = { ...raw };
  if (!Array.isArray(result.pictures)) result.pictures = [];
  if (!Array.isArray(result.reviews)) result.reviews = [];
  if (!Array.isArray(result.social_links)) result.social_links = [];
  if (result.personal && !Array.isArray(result.personal.spoken_languages)) {
    result.personal = { ...result.personal, spoken_languages: [] };
  }
  return result;
}

/**
 * Fetches a full user profile from the API.
 * Framework-agnostic: works in both server and browser environments.
 * Normalizes response so pictures, reviews, social_links, and personal.spoken_languages are always arrays.
 */
export async function fetchProfile(
  options: FetchProfileOptions,
): Promise<Profile> {
  const { baseUrl, username = 'msescortplus' } = options;
  const url = `${baseUrl}/api/opengrid/profiles/${encodeURIComponent(username)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch profile "${username}": ${response.status} ${response.statusText}`,
    );
  }

  const raw = (await response.json()) as Profile;
  return normalizeProfile(raw);
}
