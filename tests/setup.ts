import { expect, afterEach, beforeEach, vi } from 'vitest';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import { mockCanvasToDataUrl, mockCanvasToBlob, setupCanvasMocking, createValidPngDataUrl, createValidJpegDataUrl } from './mocks/canvas-mock';
import { mockImageSuccess, mockFileReaderDataUrl } from './mocks/image-mock';

/**
 * Setup Chai with Promise support
 */
chai.use(chaiAsPromised);

/**
 * Global test configuration
 */
declare global {
  var sandbox: sinon.SinonSandbox;
}

/**
 * Before each test: create a fresh sandbox and setup Canvas/Image mocks
 */
beforeEach(() => {
  global.sandbox = sinon.createSandbox();

  // Auto-setup Canvas mocking
  setupCanvasMocking();
  mockCanvasToDataUrl(createValidPngDataUrl());
  mockCanvasToBlob();

  // Auto-setup Image mocking
  mockImageSuccess(5);

  // Auto-setup FileReader for data URL conversion
  mockFileReaderDataUrl(createValidPngDataUrl());
});

/**
 * After each test: cleanup DOM, restore mocks, restore sinon
 */
afterEach(() => {
  global.sandbox.restore();
  vi.clearAllMocks();
  vi.clearAllTimers();
});

/**
 * Mock console methods to reduce noise in tests
 * Uncomment if needed:
 */
// global.console = {
//   ...console,
//   error: vi.fn(),
//   warn: vi.fn(),
// };

/**
 * Mock XMLHttpRequest by default
 * Tests can override with sinon.restore()
 */
if (typeof global.XMLHttpRequest === 'undefined') {
  global.XMLHttpRequest = vi.fn() as any;
}

/**
 * Extend expect with custom matchers
 */
expect.extend({
  toBeValidDataUrl(received: string) {
    const isDataUrl =
      typeof received === 'string' && received.startsWith('data:');
    return {
      pass: isDataUrl,
      message: () =>
        isDataUrl
          ? `expected ${received} not to be a valid data URL`
          : `expected ${received} to be a valid data URL (should start with 'data:')`,
    };
  },
  toBeValidSvgDataUrl(received: string) {
    const isSvgDataUrl =
      typeof received === 'string' &&
      received.startsWith('data:image/svg+xml');
    return {
      pass: isSvgDataUrl,
      message: () =>
        isSvgDataUrl
          ? `expected ${received} not to be a valid SVG data URL`
          : `expected ${received} to be a valid SVG data URL (should start with 'data:image/svg+xml')`,
    };
  },
  toBeValidPngDataUrl(received: string) {
    const isPngDataUrl =
      typeof received === 'string' && received.startsWith('data:image/png');
    return {
      pass: isPngDataUrl,
      message: () =>
        isPngDataUrl
          ? `expected ${received} not to be a valid PNG data URL`
          : `expected ${received} to be a valid PNG data URL (should start with 'data:image/png')`,
    };
  },
});

/**
 * Add custom matchers to TypeScript
 */
declare global {
  namespace Vi {
    interface Matchers<R> {
      toBeValidDataUrl(): R;
      toBeValidSvgDataUrl(): R;
      toBeValidPngDataUrl(): R;
    }
  }
}
