/**
 * Image loading mocking utilities for testing
 */
import { vi, SinonStub } from 'vitest';

/**
 * Mock Image element with automatic onload simulation
 */
export function mockImageSuccess(
  delay: number = 10
): SinonStub {
  return vi.spyOn(window, 'Image' as any).mockImplementation(() => {
    const img = document.createElement('img') as any;

    // Override src setter to trigger onload
    Object.defineProperty(img, 'src', {
      set(value: string) {
        this._src = value;

        // Simulate image load after a short delay
        setTimeout(() => {
          if (typeof this.onload === 'function') {
            this.onload();
          }
        }, delay);
      },
      get() {
        return this._src;
      },
    });

    return img;
  });
}

/**
 * Mock Image element with load error
 */
export function mockImageError(
  delay: number = 10
): SinonStub {
  return vi.spyOn(window, 'Image' as any).mockImplementation(() => {
    const img = document.createElement('img') as any;

    // Override src setter to trigger onerror
    Object.defineProperty(img, 'src', {
      set(value: string) {
        this._src = value;

        // Simulate image load error after a short delay
        setTimeout(() => {
          if (typeof this.onerror === 'function') {
            this.onerror(new Event('error'));
          }
        }, delay);
      },
      get() {
        return this._src;
      },
    });

    return img;
  });
}

/**
 * Mock Image element with custom behavior
 */
export function mockImageCustom(
  onSrcSet: (src: string) => void = () => {}
): SinonStub {
  return vi.spyOn(window, 'Image' as any).mockImplementation(() => {
    const img = document.createElement('img') as any;

    // Override src setter to execute custom behavior
    Object.defineProperty(img, 'src', {
      set(value: string) {
        this._src = value;
        onSrcSet(value);
      },
      get() {
        return this._src;
      },
    });

    return img;
  });
}

/**
 * Create a valid image data URL (1x1 transparent PNG)
 */
export function createImageDataUrl(
  format: 'png' | 'jpeg' | 'gif' = 'png'
): string {
  const urls: Record<string, string> = {
    png: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    jpeg: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=',
    gif: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
  };

  return urls[format];
}

/**
 * Stub XMLHttpRequest for image loading
 */
export function stubImageXhr(
  responseBlob: Blob = new Blob(['test'], { type: 'image/png' })
): SinonStub {
  return vi
    .spyOn(XMLHttpRequest.prototype, 'send')
    .mockImplementation(function (this: XMLHttpRequest) {
      const self = this as any;

      // Simulate successful response
      setTimeout(() => {
        self.readyState = 4;
        self.status = 200;
        self.response = responseBlob;

        if (typeof self.onreadystatechange === 'function') {
          self.onreadystatechange();
        }
      }, 10);
    });
}

/**
 * Create a mock FileReader for data URL conversion
 */
export function mockFileReaderDataUrl(
  dataUrl: string = 'data:image/png;base64,test'
): SinonStub {
  return vi
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
