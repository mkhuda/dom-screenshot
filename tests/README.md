# DOM Screenshot Testing Guide

Complete testing setup for the dom-screenshot library using Vitest.

## 📋 Directory Structure

```
tests/
├── setup.ts                 # Global test setup and configuration
├── README.md               # This file
├── unit/                   # Unit tests
│   └── basic.test.ts       # Basic functionality tests
├── integration/            # Integration tests (coming soon)
├── helpers/                # Test helper utilities
│   └── dom-helpers.ts      # DOM manipulation helpers
├── mocks/                  # Mock implementations
│   ├── canvas-mock.ts      # Canvas API mocks
│   ├── image-mock.ts       # Image loading mocks
│   └── xhr-mock.ts         # XMLHttpRequest mocks
└── fixtures/               # Test data and fixtures
    ├── html.ts             # HTML test fixtures
    ├── images.ts           # Image data URLs
    └── styles.ts           # CSS and style fixtures
```

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 📝 Writing Tests

### Basic Test Template

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { domtoimage } from '../../src/dom-screenshot';
import { createSimpleDiv } from '../helpers/dom-helpers';

describe('My Test Suite', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container?.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  it('should do something', async () => {
    const div = createSimpleDiv('Test');
    const result = await domtoimage.toSvg(div);

    expect(result).toBeValidSvgDataUrl();
  });
});
```

## 🛠️ Test Helpers

### DOM Helpers (`helpers/dom-helpers.ts`)

Create test DOM elements easily:

```typescript
import {
  createSimpleDiv,
  createStyledDiv,
  createColoredDiv,
  createImageElement,
  createCanvasElement,
  createComplexDOM,
  createDOMWithStyles,
  createSVGElement,
  wait
} from '../helpers/dom-helpers';

// Create a simple div
const div = createSimpleDiv('Hello');

// Create styled div
const styled = createStyledDiv('Content', { color: 'red' });

// Create colored div
const colored = createColoredDiv('Text', 'white', 'blue');

// Create complex DOM tree
const complex = createComplexDOM();
```

## 🎭 Mock Utilities

### Canvas Mocks (`mocks/canvas-mock.ts`)

Mock Canvas API operations:

```typescript
import {
  mockCanvasToDataUrl,
  mockCanvasToBlob,
  mockCanvasContext,
  createValidPngDataUrl,
  createValidSvgDataUrl
} from '../mocks/canvas-mock';

// Mock canvas.toDataURL()
mockCanvasToDataUrl(createValidPngDataUrl());

// Mock canvas.toBlob()
mockCanvasToBlob(new Blob(['data']));

// Mock canvas context
const { fillRect, drawImage } = mockCanvasContext();
```

### Image Mocks (`mocks/image-mock.ts`)

Mock image loading:

```typescript
import {
  mockImageSuccess,
  mockImageError,
  createImageDataUrl,
  mockFileReaderDataUrl
} from '../mocks/image-mock';

// Mock successful image load
mockImageSuccess(10); // 10ms delay

// Mock image load error
mockImageError(10);

// Create image data URL
const dataUrl = createImageDataUrl('png'); // or 'jpeg', 'gif'
```

### XHR Mocks (`mocks/xhr-mock.ts`)

Mock XMLHttpRequest:

```typescript
import {
  mockXhrSuccess,
  mockXhrError,
  mockXhrTimeout,
  stubUrlPattern,
  createBase64ImageData
} from '../mocks/xhr-mock';

// Mock successful XHR
mockXhrSuccess('response-data', 10);

// Mock XHR error
mockXhrError(404, 10);

// Mock XHR timeout
mockXhrTimeout(100);

// Stub specific URLs
stubUrlPattern(
  /example\.com\/image/,
  'image-data',
  200
);
```

## 📦 Test Fixtures

### HTML Fixtures (`fixtures/html.ts`)

Pre-defined HTML strings for testing:

```typescript
import {
  SIMPLE_HTML,
  STYLED_HTML,
  COMPLEX_HTML,
  NESTED_HTML,
  TEXT_HTML,
  FORM_HTML,
  COLOR_HTML,
  BORDER_SHADOW_HTML,
  MULTI_IMAGE_HTML,
  TABLE_HTML,
  SVG_HTML,
  generateLargeHTML
} from '../fixtures/html';

// Use in tests
container.innerHTML = SIMPLE_HTML;

// Generate dynamic HTML
const large = generateLargeHTML(100); // 100 items
```

### Image Fixtures (`fixtures/images.ts`)

Pre-encoded image data URLs:

```typescript
import {
  PNG_1X1_TRANSPARENT,
  JPEG_1X1_RED,
  GIF_1X1_BLUE,
  SVG_CIRCLE,
  TEST_IMAGES,
  createTestImageElement,
  createTestImageElements
} from '../fixtures/images';

// Use image data
const img = new Image();
img.src = PNG_1X1_TRANSPARENT;

// Create test image elements
const images = createTestImageElements(3);
```

### Style Fixtures (`fixtures/styles.ts`)

Pre-defined CSS styles for testing:

```typescript
import {
  CSS_FIXTURES,
  createStyleElement,
  createPseudoElementCSS,
  createDivWithPseudoElements
} from '../fixtures/styles';

// Use CSS fixtures
container.innerHTML = CSS_FIXTURES.gradientDiv;

// Create pseudo-elements
const div = createDivWithPseudoElements();
```

## 🧪 Custom Matchers

Custom expect matchers are available:

```typescript
// Check for valid data URL
expect(result).toBeValidDataUrl();

// Check for valid SVG data URL
expect(result).toBeValidSvgDataUrl();

// Check for valid PNG data URL
expect(result).toBeValidPngDataUrl();
```

## 📊 Test Coverage

Generate coverage reports:

```bash
npm run test:coverage
```

Coverage reports are generated in:
- `coverage/index.html` - HTML report
- `coverage/lcov.info` - LCOV format (for CI/CD)
- Console output - Summary

## 🔍 Debugging Tests

### Enable Debug Logging

```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('Debug Example', () => {
  it('should log debug info', () => {
    console.log('Debugging info here');
    expect(true).toBe(true);
  });
});
```

### Run Single Test File

```bash
npx vitest tests/unit/basic.test.ts
```

### Run Single Test Suite

```bash
npx vitest -t "My Test Suite"
```

### Use Vitest UI

```bash
npm run test:ui
```

Opens an interactive UI at http://localhost:51204/__vitest__/

## 🔄 Continuous Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:run
      - run: npm run test:coverage
```

## 📚 Testing Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Always clean up DOM in `afterEach`
3. **Mocking**: Mock external dependencies (Canvas, Image, XHR)
4. **Fixtures**: Use fixtures for consistent test data
5. **Naming**: Use descriptive test names
6. **Assertions**: Use specific assertions, not generic `toBeTruthy()`
7. **Async**: Always `await` promises and handle async operations
8. **Performance**: Keep tests fast (< 100ms each if possible)

## 🐛 Common Issues

### Canvas Not Available
Canvas is mocked in jsdom. Use `mockCanvasToDataUrl()` for PNG/JPEG tests.

### Image Loading Fails
Use `mockImageSuccess()` or `mockImageError()` to control image behavior.

### XHR Requests Fail
Use `mockXhrSuccess()`, `mockXhrError()`, or `stubUrlPattern()` to mock network requests.

### Tests Timeout
Increase timeout or mock async operations that have delays.

## 📖 Resources

- [Vitest Documentation](https://vitest.dev/)
- [Chai Assertion Library](https://www.chaijs.com/)
- [jsdom Documentation](https://github.com/jsdom/jsdom)
- [Sinon.js Mocking](https://sinonjs.org/)

## 🤝 Contributing

When adding new features:

1. Write tests first (TDD)
2. Ensure all tests pass: `npm run test:run`
3. Check coverage: `npm run test:coverage`
4. Update this documentation
5. Submit PR with tests

---

Happy testing! 🎉
