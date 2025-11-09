/**
 * Image test fixtures
 */

/**
 * Base64-encoded 1x1 transparent PNG
 */
export const PNG_1X1_TRANSPARENT =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

/**
 * Base64-encoded 1x1 red JPEG
 */
export const JPEG_1X1_RED =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=';

/**
 * Base64-encoded 1x1 blue GIF
 */
export const GIF_1X1_BLUE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

/**
 * SVG data URL
 */
export const SVG_CIRCLE =
  'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2240%22%20fill%3D%22blue%22%2F%3E%3C%2Fsvg%3E';

/**
 * Invalid/broken image data URL
 */
export const INVALID_IMAGE_URL = 'data:image/png;base64,invalid-base64-data!!!';

/**
 * Remote image URL (would require network)
 */
export const REMOTE_IMAGE_URL = 'https://example.com/image.png';

/**
 * CORS-restricted image URL
 */
export const CORS_IMAGE_URL = 'https://other-domain.com/image.png';

/**
 * Collection of all test images
 */
export const TEST_IMAGES = {
  png: PNG_1X1_TRANSPARENT,
  jpeg: JPEG_1X1_RED,
  gif: GIF_1X1_BLUE,
  svg: SVG_CIRCLE,
  invalid: INVALID_IMAGE_URL,
  remote: REMOTE_IMAGE_URL,
  cors: CORS_IMAGE_URL,
};

/**
 * Create a test image HTML element
 */
export function createTestImageElement(
  src: string = PNG_1X1_TRANSPARENT,
  alt: string = 'test'
): HTMLImageElement {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.style.width = '50px';
  img.style.height = '50px';
  return img;
}

/**
 * Create multiple test images
 */
export function createTestImageElements(count: number = 3): HTMLImageElement[] {
  const images: HTMLImageElement[] = [];
  const formats = ['png', 'jpeg', 'gif'] as const;

  for (let i = 0; i < count; i++) {
    const format = formats[i % formats.length];
    const src = TEST_IMAGES[format];
    images.push(createTestImageElement(src, `test-${i}`));
  }

  return images;
}
