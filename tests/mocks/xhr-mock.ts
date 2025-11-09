/**
 * XMLHttpRequest mocking utilities for testing
 */
import { vi, SinonStub } from 'vitest';

/**
 * Mock XMLHttpRequest with success response
 */
export function mockXhrSuccess(
  responseData: string = 'test-data',
  delay: number = 10
): SinonStub {
  const open = vi.fn();
  const send = vi.fn(function (this: XMLHttpRequest) {
    const self = this as any;
    setTimeout(() => {
      self.readyState = 4;
      self.status = 200;
      self.response = new Blob([responseData]);
      self.responseText = responseData;

      if (typeof self.onreadystatechange === 'function') {
        self.onreadystatechange();
      }
    }, delay);
  });

  const setRequestHeader = vi.fn();

  const XhrStub = vi.fn(() => ({
    open,
    send,
    setRequestHeader,
    abort: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    readyState: 0,
    status: 0,
    statusText: '',
    responseText: '',
    response: null,
    responseType: '',
    timeout: 0,
    withCredentials: false,
  }));

  const stub = vi.spyOn(window, 'XMLHttpRequest' as any).mockImplementation(XhrStub);

  return stub;
}

/**
 * Mock XMLHttpRequest with error response
 */
export function mockXhrError(
  statusCode: number = 404,
  delay: number = 10
): SinonStub {
  const open = vi.fn();
  const send = vi.fn(function (this: XMLHttpRequest) {
    const self = this as any;
    setTimeout(() => {
      self.readyState = 4;
      self.status = statusCode;

      if (typeof self.onreadystatechange === 'function') {
        self.onreadystatechange();
      }
    }, delay);
  });

  const setRequestHeader = vi.fn();

  const XhrStub = vi.fn(() => ({
    open,
    send,
    setRequestHeader,
    abort: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    readyState: 0,
    status: 0,
    statusText: '',
    responseText: '',
    response: null,
    responseType: '',
    timeout: 0,
    withCredentials: false,
  }));

  const stub = vi.spyOn(window, 'XMLHttpRequest' as any).mockImplementation(XhrStub);

  return stub;
}

/**
 * Mock XMLHttpRequest with timeout
 */
export function mockXhrTimeout(
  delay: number = 100
): SinonStub {
  const open = vi.fn();
  const send = vi.fn(function (this: XMLHttpRequest) {
    const self = this as any;
    setTimeout(() => {
      if (typeof self.ontimeout === 'function') {
        self.ontimeout(new ProgressEvent('timeout'));
      }
    }, delay);
  });

  const setRequestHeader = vi.fn();

  const XhrStub = vi.fn(() => ({
    open,
    send,
    setRequestHeader,
    abort: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    readyState: 0,
    status: 0,
    statusText: '',
    responseText: '',
    response: null,
    responseType: '',
    timeout: 1000,
    withCredentials: false,
  }));

  const stub = vi.spyOn(window, 'XMLHttpRequest' as any).mockImplementation(XhrStub);

  return stub;
}

/**
 * Stub specific URL patterns
 */
export function stubUrlPattern(
  pattern: RegExp,
  responseData: string,
  statusCode: number = 200
): SinonStub {
  const open = vi.fn();
  const send = vi.fn(function (this: XMLHttpRequest) {
    const self = this as any;
    const url = self.url || '';

    if (pattern.test(url)) {
      setTimeout(() => {
        self.readyState = 4;
        self.status = statusCode;
        self.response = new Blob([responseData]);
        if (typeof self.onreadystatechange === 'function') {
          self.onreadystatechange();
        }
      }, 10);
    }
  });

  const setRequestHeader = vi.fn();

  const XhrStub = vi.fn(function () {
    return {
      open: open.mockImplementation(function (
        _method: string,
        url: string
      ) {
        this.url = url;
      }),
      send,
      setRequestHeader,
      abort: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      readyState: 0,
      status: 0,
      statusText: '',
      responseText: '',
      response: null,
      responseType: '',
      timeout: 0,
      withCredentials: false,
    };
  });

  return vi.spyOn(window, 'XMLHttpRequest' as any).mockImplementation(XhrStub);
}

/**
 * Create base64-encoded image data
 */
export function createBase64ImageData(
  format: 'png' | 'jpeg' = 'png'
): string {
  const urls: Record<string, string> = {
    png: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    jpeg: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=',
  };

  return urls[format];
}
