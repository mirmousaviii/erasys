import { buildImageUrl } from './image-url.builder.js';

describe('buildImageUrl', () => {
  it('should build a correct image URL from a url_token', () => {
    const token = '3b587575644d3097fc34228b3c';

    const result = buildImageUrl(token);

    expect(result).toBe(
      'https://www.hunqz.com/img/usr/original/0x0/3b587575644d3097fc34228b3c.jpg',
    );
  });

  it('should append .jpg extension', () => {
    const result = buildImageUrl('abc123');

    expect(result).toMatch(/\.jpg$/);
  });

  it('should throw an error when url_token is empty', () => {
    expect(() => buildImageUrl('')).toThrow(
      'url_token is required to build an image URL',
    );
  });
});
