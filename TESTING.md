# Testing Guide - DOM Screenshot

Complete testing setup for the dom-screenshot library.

## ⚡ Quick Commands

```bash
# Run tests in watch mode (interactive)
npm test

# Run all tests once
npm run test:run

# Open Vitest UI (visual dashboard)
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run specific test file
npx vitest tests/unit/basic.test.ts

# Run tests matching a pattern
npx vitest -t "toSvg"
```

## 📁 Test Structure

```
tests/
├── setup.ts              # Global configuration
├── unit/                 # Unit tests
│   └── basic.test.ts     # Example tests (YOUR STARTING POINT)
├── integration/          # Integration tests (coming soon)
├── helpers/              # Helper utilities
├── mocks/                # Mock implementations
└── fixtures/             # Test data
```

## 🎯 What's Been Set Up

### ✅ Configuration
- **vitest.config.ts** - Test runner configuration
- **tests/setup.ts** - Global test setup with custom matchers
- **npm scripts** - Easy test commands in package.json

### ✅ Helper Utilities
- **dom-helpers.ts** - DOM element creation functions
  - `createSimpleDiv()`, `createStyledDiv()`, `createComplexDOM()`, etc.

### ✅ Mock Utilities
- **canvas-mock.ts** - Mock Canvas API
  - `mockCanvasToDataUrl()`, `mockCanvasToBlob()`, `mockCanvasContext()`
- **image-mock.ts** - Mock Image loading
  - `mockImageSuccess()`, `mockImageError()`, `createImageDataUrl()`
- **xhr-mock.ts** - Mock XMLHttpRequest
  - `mockXhrSuccess()`, `mockXhrError()`, `mockXhrTimeout()`

### ✅ Test Fixtures
- **html.ts** - Pre-built HTML strings (SIMPLE_HTML, STYLED_HTML, etc.)
- **images.ts** - Pre-encoded image data URLs (PNG, JPEG, GIF, SVG)
- **styles.ts** - CSS fixtures (gradients, shadows, transforms, etc.)

### ✅ Sample Tests
- **basic.test.ts** - Working example tests for:
  - toSvg()
  - toPng()
  - toJpeg()
  - toBlob()
  - toPixelData()
  - Options handling
  - Error handling

## 🚀 Writing Your First Test

```typescript
// tests/unit/my-feature.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { domtoimage } from '../../src/dom-screenshot';
import { createStyledDiv } from '../helpers/dom-helpers';

describe('My Feature', () => {
  it('should do something', async () => {
    const div = createStyledDiv('Test', { backgroundColor: 'blue' });
    const result = await domtoimage.toSvg(div);

    expect(result).toBeValidSvgDataUrl();
  });
});
```

Run it:
```bash
npm test
```

## 🎭 Using Mocks

### Mock Canvas
```typescript
import { mockCanvasToDataUrl, createValidPngDataUrl } from '../mocks/canvas-mock';

beforeEach(() => {
  mockCanvasToDataUrl(createValidPngDataUrl());
});
```

### Mock Image Loading
```typescript
import { mockImageSuccess } from '../mocks/image-mock';

beforeEach(() => {
  mockImageSuccess(10); // 10ms delay
});
```

### Mock Network
```typescript
import { mockXhrSuccess } from '../mocks/xhr-mock';

beforeEach(() => {
  mockXhrSuccess('image-data', 10);
});
```

## 📊 Custom Matchers

```typescript
// Check if it's a valid data URL
expect(result).toBeValidDataUrl();

// Check if it's a valid SVG data URL
expect(result).toBeValidSvgDataUrl();

// Check if it's a valid PNG data URL
expect(result).toBeValidPngDataUrl();
```

## 📚 Test Fixtures

### Use HTML fixtures
```typescript
import { SIMPLE_HTML, STYLED_HTML, COMPLEX_HTML } from '../fixtures/html';

container.innerHTML = SIMPLE_HTML;
```

### Use image data URLs
```typescript
import { PNG_1X1_TRANSPARENT, TEST_IMAGES } from '../fixtures/images';

const img = new Image();
img.src = PNG_1X1_TRANSPARENT;
```

### Use CSS fixtures
```typescript
import { CSS_FIXTURES } from '../fixtures/styles';

container.innerHTML = CSS_FIXTURES.gradientDiv;
```

## 🔍 Debug Tests

### Enable logging
```typescript
it('my test', () => {
  console.log('Debug info', someVariable);
  expect(true).toBe(true);
});
```

### Run single test
```bash
npx vitest -t "my test"
```

### Open UI
```bash
npm run test:ui
```

## 📈 Coverage

```bash
npm run test:coverage
```

Creates:
- `coverage/index.html` - Visual report
- `coverage/lcov.info` - For CI/CD integration

## 🧬 Test Files Structure

Each test file should follow this pattern:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { domtoimage } from '../../src/dom-screenshot';
import { createSimpleDiv } from '../helpers/dom-helpers';

describe('Feature Name', () => {
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
    expect(result).toBeDefined();
  });
});
```

## 📝 Writing Good Tests

1. **One assertion per test** (usually)
2. **Descriptive names** - describe what should happen
3. **Setup/Teardown** - clean up after each test
4. **Mocking** - mock external dependencies
5. **Async/Await** - handle promises properly
6. **Fast** - keep tests < 100ms each

## ❌ Common Mistakes to Avoid

❌ Not mocking Canvas/Image/XHR
```typescript
// Don't do this
const result = await domtoimage.toPng(div); // Will fail without mocks
```

✅ Do this
```typescript
beforeEach(() => {
  mockCanvasToDataUrl(createValidPngDataUrl());
  mockImageSuccess();
});
```

---

## 📖 Next Steps

1. **Read** `tests/README.md` for detailed documentation
2. **Run** `npm test` to see tests in action
3. **Open** UI with `npm run test:ui` for visual debugging
4. **Write** your first test in `tests/unit/`
5. **Extend** fixtures and helpers as needed

## 🔗 Resources

- [Vitest Docs](https://vitest.dev/)
- [Chai Assertions](https://www.chaijs.com/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

**Happy testing!** 🎉

For detailed information, see [tests/README.md](./tests/README.md)
