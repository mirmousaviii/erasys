const BASE_IMAGE_URL = 'https://www.hunqz.com/img/usr/original/0x0';

/**
 * Builds the full image URL from a picture's url_token.
 *
 * @example
 * buildImageUrl('3b587575644d3097fc34228b3c')
 * // => 'https://www.hunqz.com/img/usr/original/0x0/2ba5a5fbc41fea7fceb186fb44.jpg'
 */
export function buildImageUrl(urlToken: string): string {
  if (!urlToken) {
    throw new Error('url_token is required to build an image URL');
  }

  return `${BASE_IMAGE_URL}/${urlToken}.jpg`;
}
