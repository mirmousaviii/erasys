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
 * Fetches a full user profile from the API.
 * Framework-agnostic: works in both server and browser environments.
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

  return response.json() as Promise<Profile>;
}
