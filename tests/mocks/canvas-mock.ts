/**
 * Canvas mocking utilities for testing
 */
import { vi } from 'vitest';

/**
 * Mock HTMLCanvasElement.prototype.toDataURL
 */
export function mockCanvasToDataUrl(
  pngValue: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  jpegValue: string = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k='
): void {
  vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockImplementation(function(type?: string, quality?: number) {
    // Return JPEG data URL if type is 'image/jpeg'
    if (type === 'image/jpeg') {
      return jpegValue;
    }
    // Default to PNG
    return pngValue;
  });
}

/**
 * Mock HTMLCanvasElement.prototype.toBlob
 */
export function mockCanvasToBlob(
  returnBlob: Blob = new Blob(['test'], { type: 'image/png' })
): void {
  vi
    .spyOn(HTMLCanvasElement.prototype, 'toBlob')
    .mockImplementation((callback: BlobCallback) => {
      // Use setTimeout to simulate async behavior
      setTimeout(() => callback(returnBlob), 0);
    });
}


/**
 * Setup global Canvas context mocking
 */
export function setupCanvasMocking(): void {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(function(contextId: string) {
    return {
      fillRect: vi.fn(),
      drawImage: vi.fn(),
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 1,
      globalAlpha: 1,
      canvas: this,
      getImageData: vi.fn().mockReturnValue({
        data: new Uint8ClampedArray(4),
      }),
    } as any;
  });
}

/**
 * Create a valid PNG data URL
 */
export function createValidPngDataUrl(): string {
  // Minimal valid PNG: 1x1 transparent pixel
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
}

/**
 * Create a valid JPEG data URL
 */
export function createValidJpegDataUrl(): string {
  // Minimal valid JPEG: 1x1 red pixel
  return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=';
}

/**
 * Create a valid SVG data URL
 */
export function createValidSvgDataUrl(): string {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="blue"/></svg>';
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

