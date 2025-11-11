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
 * Extend Chai with custom assertion methods
 */
chai.Assertion.addMethod('toBeValidDataUrl', function() {
  const isDataUrl =
    typeof this._obj === 'string' && this._obj.startsWith('data:');
  this.assert(
    isDataUrl,
    'expected #{this} to be a valid data URL (should start with "data:")',
    'expected #{this} not to be a valid data URL'
  );
});

chai.Assertion.addMethod('toBeValidSvgDataUrl', function() {
  const isSvgDataUrl =
    typeof this._obj === 'string' &&
    this._obj.startsWith('data:image/svg+xml');
  this.assert(
    isSvgDataUrl,
    'expected #{this} to be a valid SVG data URL (should start with "data:image/svg+xml")',
    'expected #{this} not to be a valid SVG data URL'
  );
});

chai.Assertion.addMethod('toBeValidPngDataUrl', function() {
  const isPngDataUrl =
    typeof this._obj === 'string' && this._obj.startsWith('data:image/png');
  this.assert(
    isPngDataUrl,
    'expected #{this} to be a valid PNG data URL (should start with "data:image/png")',
    'expected #{this} not to be a valid PNG data URL'
  );
});

/**
 * Add custom matchers to TypeScript
 */
declare global {
  namespace Chai {
    interface Assertion {
      toBeValidDataUrl(): void;
      toBeValidSvgDataUrl(): void;
      toBeValidPngDataUrl(): void;
    }
  }
}
