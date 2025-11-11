/**
 * Image loading mocking utilities for testing
 */
import { vi } from 'vitest';

/**
 * Mock Image element with automatic onload simulation
 */
export function mockImageSuccess(
  delay: number = 10
): void {
  const OriginalImage = window.Image;

  class MockImage {
    _src: string = '';
    onload: (() => void) | null = null;
    onerror: ((error?: Event) => void) | null = null;

    set src(value: string) {
      this._src = value;
      // Simulate image load after a short delay
      setTimeout(() => {
        if (typeof this.onload === 'function') {
          this.onload();
        }
      }, delay);
    }

    get src(): string {
      return this._src;
    }
  }

  window.Image = MockImage as any;
}

/**
 * Mock Image element with load error
 */
export function mockImageError(
  delay: number = 10
): void {
  const OriginalImage = window.Image;

  class MockImageError {
    _src: string = '';
    onload: (() => void) | null = null;
    onerror: ((error?: Event) => void) | null = null;

    set src(value: string) {
      this._src = value;
      // Simulate image load error after a short delay
      setTimeout(() => {
        if (typeof this.onerror === 'function') {
          this.onerror(new Event('error'));
        }
      }, delay);
    }

    get src(): string {
      return this._src;
    }
  }

  window.Image = MockImageError as any;
}

/**
 * Mock Image element with custom behavior
 */
export function mockImageCustom(
  onSrcSet: (src: string) => void = () => {}
): void {
  const OriginalImage = window.Image;

  class MockImageCustom {
    _src: string = '';
    onload: (() => void) | null = null;
    onerror: ((error?: Event) => void) | null = null;

    set src(value: string) {
      this._src = value;
      onSrcSet(value);
    }

    get src(): string {
      return this._src;
    }
  }

  window.Image = MockImageCustom as any;
}

/**
 * Create a mock FileReader for data URL conversion
 */
export function mockFileReaderDataUrl(
  dataUrl: string = 'data:image/png;base64,test'
): void {
  vi
    .spyOn(FileReader.prototype, 'readAsDataURL')
    .mockImplementation(function (this: FileReader) {
      const self = this as any;

      setTimeout(() => {
        self.result = dataUrl;
        if (typeof self.onloadend === 'function') {
          self.onloadend();
        }
      }, 10);
    });
}
