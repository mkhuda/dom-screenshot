/**
 * Canvas mocking utilities for testing
 */
import { vi, SinonStub } from 'vitest';

/**
 * Mock HTMLCanvasElement.prototype.toDataURL
 */
export function mockCanvasToDataUrl(
  returnValue: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
): SinonStub {
  return vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue(returnValue);
}

/**
 * Mock HTMLCanvasElement.prototype.toBlob
 */
export function mockCanvasToBlob(
  returnBlob: Blob = new Blob(['test'], { type: 'image/png' })
): SinonStub {
  return vi
    .spyOn(HTMLCanvasElement.prototype, 'toBlob')
    .mockImplementation((callback: BlobCallback) => {
      // Use setTimeout to simulate async behavior
      setTimeout(() => callback(returnBlob), 0);
    });
}

/**
 * Mock canvas context operations
 */
export function mockCanvasContext(): {
  fillRect: SinonStub;
  drawImage: SinonStub;
  getImageData: SinonStub;
} {
  const mockContext = {
    fillRect: vi.fn(),
    drawImage: vi.fn(),
    getImageData: vi.fn().mockReturnValue({
      data: new Uint8ClampedArray(4), // RGBA for 1x1 pixel
    }),
  };

  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
    mockContext as any
  );

  return {
    fillRect: mockContext.fillRect,
    drawImage: mockContext.drawImage,
    getImageData: mockContext.getImageData,
  };
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

/**
 * Mock multiple data URLs for different formats
 */
export function mockCanvasDataUrls(): {
  png: string;
  jpeg: string;
  svg: string;
} {
  return {
    png: createValidPngDataUrl(),
    jpeg: createValidJpegDataUrl(),
    svg: createValidSvgDataUrl(),
  };
}
