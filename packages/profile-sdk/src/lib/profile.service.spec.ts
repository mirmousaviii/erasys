import { fetchProfile } from './profile.service.js';
import type { Profile } from './types.js';

// Mock data — a minimal valid Profile for testing
const mockProfile: Profile = {
  id: '12345',
  name: 'testuser',
  type: 'ESCORT',
  is_plus: false,
  online_status: 'ONLINE',
  preview_pic: {
    id: 'pic1',
    owner_id: '12345',
    url_token: 'abc123',
    width: 200,
    height: 300,
    rating: 'NEUTRAL',
    is_public: true,
  },
  headline: 'Test headline',
  last_login: '2026-01-01T00:00:00+0000',
  location: {
    name: 'Berlin',
    country: 'Germany',
    sensor: false,
    is_base_profile: true,
  },
  personal: {
    profile_text: 'Test bio',
    height: 180,
    weight: 75,
    target_age: { min: 20, max: 40 },
    spoken_languages: ['en', 'de'],
    beard: 'NONE',
    body_hair: 'SHAVED',
    body_type: 'ATHLETIC',
    ethnicity: 'NO_ENTRY',
    eye_color: 'BROWN',
    hair_length: 'SHORT',
    hair_color: 'BLACK',
    orientation: 'GAY',
    smoker: 'NO',
    piercing: 'NO',
    tattoo: 'NO',
    gender_orientation: {
      gender: 'MAN',
      orientation: 'NO_ENTRY',
      looking_for_gender: ['MAN'],
      looking_for_orientation: ['GAY'],
    },
    age: 30,
  },
  service: {
    rate_hour: 0,
    rate_night: 0,
    currency: 'EUR',
    service_locations: [],
    service_offerings: [],
  },
  sexual: {
    enabled: false,
    favored_position: 'NO_ENTRY',
    anal_position: 'NO_ENTRY',
    dick_size: 'NO_ENTRY',
    concision: 'NO_ENTRY',
    dirty_sex: 'NO_ENTRY',
    sm: 'NO_ENTRY',
    fisting: 'NO_ENTRY',
    fetish: [],
    safer_sex: 'NO_ENTRY',
    kissing: 'NO_ENTRY',
    oral: 'NO_ENTRY',
  },
  telephone: '+491234567',
  pictures: [
    {
      id: 'pic1',
      owner_id: '12345',
      url_token: 'abc123',
      width: 200,
      height: 300,
      rating: 'NEUTRAL',
      is_public: true,
    },
  ],
  reviews: [],
  travel_locations: [],
  social_links: [],
  is_public: true,
  is_new: false,
  creation_date: '2025-01-01T00:00:00+0000',
};

// Store original fetch
const originalFetch = global.fetch;

beforeEach(() => {
  // Reset fetch mock before each test
  global.fetch = jest.fn();
});

afterEach(() => {
  // Restore original fetch
  global.fetch = originalFetch;
});

describe('fetchProfile', () => {
  it('should fetch and return profile data', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProfile),
    });

    const result = await fetchProfile({
      baseUrl: 'https://www.hunqz.com',
    });

    expect(result).toEqual(mockProfile);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.hunqz.com/api/opengrid/profiles/msescortplus',
    );
  });

  it('should use the default username "msescortplus"', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProfile),
    });

    await fetchProfile({ baseUrl: 'https://example.com' });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://example.com/api/opengrid/profiles/msescortplus',
    );
  });

  it('should use a custom username when provided', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProfile),
    });

    await fetchProfile({
      baseUrl: 'https://example.com',
      username: 'johndoe',
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://example.com/api/opengrid/profiles/johndoe',
    );
  });

  it('should encode special characters in username', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProfile),
    });

    await fetchProfile({
      baseUrl: 'https://example.com',
      username: 'user name',
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://example.com/api/opengrid/profiles/user%20name',
    );
  });

  it('should throw an error when the response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(
      fetchProfile({ baseUrl: 'https://example.com' }),
    ).rejects.toThrow('Failed to fetch profile "msescortplus": 404 Not Found');
  });

  it('should throw an error when fetch itself fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(
      fetchProfile({ baseUrl: 'https://example.com' }),
    ).rejects.toThrow('Network error');
  });

  describe('normalization (API may omit array fields)', () => {
    it('should normalize missing pictures to empty array', async () => {
      const raw = { ...mockProfile, pictures: undefined };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(raw),
      });

      const result = await fetchProfile({
        baseUrl: 'https://example.com',
      });

      expect(Array.isArray(result.pictures)).toBe(true);
      expect(result.pictures).toEqual([]);
    });

    it('should normalize missing reviews to empty array', async () => {
      const raw = { ...mockProfile, reviews: undefined };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(raw),
      });

      const result = await fetchProfile({
        baseUrl: 'https://example.com',
      });

      expect(Array.isArray(result.reviews)).toBe(true);
      expect(result.reviews).toEqual([]);
    });

    it('should normalize missing social_links to empty array', async () => {
      const raw = { ...mockProfile, social_links: undefined };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(raw),
      });

      const result = await fetchProfile({
        baseUrl: 'https://example.com',
      });

      expect(Array.isArray(result.social_links)).toBe(true);
      expect(result.social_links).toEqual([]);
    });

    it('should normalize personal.spoken_languages when missing to empty array', async () => {
      const personalWithoutLangs = { ...mockProfile.personal };
      delete (personalWithoutLangs as Record<string, unknown>).spoken_languages;
      const raw = { ...mockProfile, personal: personalWithoutLangs };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(raw),
      });

      const result = await fetchProfile({
        baseUrl: 'https://example.com',
      });

      expect(Array.isArray(result.personal.spoken_languages)).toBe(true);
      expect(result.personal.spoken_languages).toEqual([]);
    });

    it('should normalize personal.spoken_languages when not an array to empty array', async () => {
      const raw = {
        ...mockProfile,
        personal: {
          ...mockProfile.personal,
          spoken_languages: 'en' as unknown as string[],
        },
      };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(raw),
      });

      const result = await fetchProfile({
        baseUrl: 'https://example.com',
      });

      expect(Array.isArray(result.personal.spoken_languages)).toBe(true);
      expect(result.personal.spoken_languages).toEqual([]);
    });

    it('should preserve existing arrays and not mutate them', async () => {
      const pictures = [{ ...mockProfile.pictures[0], id: 'p1' }];
      const reviews = [
        {
          id: 'r1',
          comment: 'Great',
          updated_at: '2025-01-01',
          is_reviewer_genuine: true,
          is_reported: false,
        },
      ];
      const raw = {
        ...mockProfile,
        pictures,
        reviews,
        social_links: [{ type: 'twitter', value: 'user' }],
      };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(raw),
      });

      const result = await fetchProfile({
        baseUrl: 'https://example.com',
      });

      expect(result.pictures).toHaveLength(1);
      expect(result.pictures[0].id).toBe('p1');
      expect(result.reviews).toHaveLength(1);
      expect(result.reviews[0].comment).toBe('Great');
      expect(result.social_links).toHaveLength(1);
      expect(result.social_links[0].type).toBe('twitter');
    });

    it('should normalize all missing array fields in one response', async () => {
      const raw = {
        ...mockProfile,
        pictures: undefined,
        reviews: undefined,
        social_links: undefined,
        personal: {
          ...mockProfile.personal,
          spoken_languages: undefined as unknown as string[],
        },
      };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(raw),
      });

      const result = await fetchProfile({
        baseUrl: 'https://example.com',
      });

      expect(result.pictures).toEqual([]);
      expect(result.reviews).toEqual([]);
      expect(result.social_links).toEqual([]);
      expect(result.personal.spoken_languages).toEqual([]);
    });
  });
});
