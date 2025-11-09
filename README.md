# dom-screenshot

[![Build Status](https://app.travis-ci.com/mkhuda/dom-screenshot.svg?branch=main)](https://app.travis-ci.com/mkhuda/dom-screenshot) [![npm version](https://badge.fury.io/js/%40mkhuda%2Fdom-screenshot.svg)](https://badge.fury.io/js/%40mkhuda%2Fdom-screenshot)

A modern TypeScript library to capture DOM elements as **SVG**, **PNG**, **JPEG**, or **Blob** images. Built with latest tooling and fully type-safe.

> Forked & modified from [dom-to-image](https://github.com/tsayen/dom-to-image)

---

## ✨ Features

- 📸 **Multiple Formats**: SVG (vector), PNG (raster), JPEG (compressed), Blob, Pixel Data
- 🎨 **Style Preservation**: Captures all CSS styles, colors, gradients, shadows, transforms
- 📦 **Modern Build**: Rollup with TypeScript, ESM and CommonJS outputs
- 🔒 **Type Safe**: Full TypeScript support with complete type definitions
- ⚡ **Fast**: Optimized for performance, lazy initialization of dependencies
- 🚀 **Production Ready**: Tested and used in real-world applications
- 🎯 **React Friendly**: Works seamlessly with React via refs

---

## 📚 Documentation

### Quick Reference
- **Getting Started** → See below or check [`EXAMPLES_QUICKSTART.md`](./EXAMPLES_QUICKSTART.md)
- **React Example** → Run the interactive example in `examples/react-app/`
- **Testing** → See [`TESTING.md`](./TESTING.md) for test setup
- **Examples** → Check [`examples/README.md`](./examples/README.md) for detailed examples

### File Guides

| File | Purpose |
|------|---------|
| `EXAMPLES_QUICKSTART.md` | Quick start guide for running examples |
| `TESTING.md` | Testing framework setup and usage |
| `TESTING_STATUS.md` | Current test status and results |
| `TEST_SETUP_SUMMARY.md` | Comprehensive testing documentation |
| `examples/README.md` | Examples overview |
| `examples/react-app/README.md` | Detailed React example guide |
| `tests/README.md` | Test infrastructure details |

---

## 🚀 Quick Start

### Installation

```bash
npm install @mkhuda/dom-screenshot
# or
yarn add @mkhuda/dom-screenshot
```

### Basic Usage

```typescript
import { domtoimage } from '@mkhuda/dom-screenshot';

// Get the element to capture
const element = document.getElementById('content');

// Capture as SVG
const svg = await domtoimage.toSvg(element);

// Capture as PNG
const png = await domtoimage.toPng(element);

// Capture as JPEG
const jpeg = await domtoimage.toJpeg(element);

// Get as Blob
const blob = await domtoimage.toBlob(element);

// Get pixel data
const pixelData = await domtoimage.toPixelData(element);
```

### React Example

```typescript
import { useRef } from 'react';
import { domtoimage } from '@mkhuda/dom-screenshot';

export function MyComponent() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCapture = async () => {
    if (!contentRef.current) return;

    try {
      const png = await domtoimage.toPng(contentRef.current);

      // Download
      const link = document.createElement('a');
      link.href = png;
      link.download = 'screenshot.png';
      link.click();
    } catch (error) {
      console.error('Capture failed:', error);
    }
  };

  return (
    <div>
      <div ref={contentRef}>
        <h1>Content to capture</h1>
        <p>This will be captured</p>
      </div>
      <button onClick={handleCapture}>📸 Download as PNG</button>
    </div>
  );
}
```

---

## 📸 API Reference

### Functions

#### `toSvg(node, options?)`
Renders DOM node to SVG data URL (scalable vector format).

**Returns:** `Promise<string>` - SVG data URL

**Best for:** UI components, diagrams, simple graphics

```typescript
const svg = await domtoimage.toSvg(element);
```

#### `toPng(node, options?)`
Renders DOM node to PNG data URL (lossless raster format).

**Returns:** `Promise<string>` - PNG data URL

**Best for:** Screenshots, general purpose captures

```typescript
const png = await domtoimage.toPng(element);
```

#### `toJpeg(node, options?)`
Renders DOM node to JPEG data URL (lossy compressed format).

**Returns:** `Promise<string>` - JPEG data URL

**Best for:** Photos, space-constrained scenarios

```typescript
const jpeg = await domtoimage.toJpeg(element, { quality: 0.95 });
```

#### `toBlob(node, options?)`
Renders DOM node to Blob object.

**Returns:** `Promise<Blob>` - Blob object

**Best for:** Uploading to server, efficient data handling

```typescript
const blob = await domtoimage.toBlob(element);
```

#### `toPixelData(node, options?)`
Extracts raw pixel data from DOM node.

**Returns:** `Promise<Uint8ClampedArray>` - RGBA pixel data

**Best for:** Image processing, pixel manipulation

```typescript
const pixelData = await domtoimage.toPixelData(element);
```

### Options

```typescript
interface DomScreenshotOptions {
  width?: number;           // Override width
  height?: number;          // Override height
  bgcolor?: string;         // Background color
  quality?: number;         // JPEG quality (0-1)
  style?: CSSStyleDeclaration;  // Additional styles
  filter?: (node: Node) => boolean;  // Filter nodes
  cacheBust?: boolean;      // Bust cache with random query
  imagePlaceholder?: string; // Placeholder for broken images
}
```

---

## 🎯 Real-World Use Cases

### 1. Export Feature
Let users download rendered UI as images:
```typescript
const png = await domtoimage.toPng(contentElement);
downloadFile(png, 'export.png');
```

### 2. Report Generation
Create visual reports from data:
```typescript
const reports = await Promise.all([
  domtoimage.toPng(chart1),
  domtoimage.toPng(chart2),
  domtoimage.toPng(table),
]);
```

### 3. Screenshot Tools
Build screenshot applications:
```typescript
const screenshots = [];
screenshots.push(await domtoimage.toPng(screen1));
screenshots.push(await domtoimage.toPng(screen2));
```

### 4. Documentation
Auto-capture UI for documentation:
```typescript
const componentScreenshot = await domtoimage.toSvg(component);
```

---

## 🧪 Testing

The project includes a comprehensive test suite with:

- ✅ 20 infrastructure tests
- ✅ Unit tests for all functions
- ✅ Integration tests
- ✅ Custom test matchers
- ✅ Full TypeScript support

### Run Tests

```bash
# Run tests once
npm run test:run

# Watch mode
npm run test:watch

# UI dashboard
npm run test:ui

# Coverage report
npm run test:coverage
```

See [`TESTING.md`](./TESTING.md) for detailed testing information.

---

## 💻 Examples

### React Example App

A complete, production-ready React application demonstrating all features:

**Features:**
- Capture as SVG, PNG, JPEG
- Live preview gallery
- Auto-download files
- Beautiful responsive UI
- Full TypeScript

**Quick Start:**
```bash
npm run example:dev
```

Opens at `http://localhost:5173`

For detailed information, see:
- [`EXAMPLES_QUICKSTART.md`](./EXAMPLES_QUICKSTART.md) - Quick reference
- [`examples/README.md`](./examples/README.md) - Examples overview
- [`examples/react-app/README.md`](./examples/react-app/README.md) - Detailed guide

---

## 🏗️ Project Structure

```
dom-screenshot/
├── src/
│   ├── dom-screenshot.ts         # Main library
│   └── types/
│       └── options.ts             # Type definitions
├── dist/
│   ├── dom-screenshot.esm.js      # ES Module
│   ├── dom-screenshot.min.js      # IIFE (minified)
│   └── dom-screenshot.d.ts        # TypeScript types
├── tests/
│   ├── setup.ts                   # Test configuration
│   ├── helpers/                   # Test utilities
│   ├── mocks/                     # Mock implementations
│   ├── fixtures/                  # Test data
│   └── unit/
│       ├── simple.test.ts         # Infrastructure tests
│       └── basic.test.ts          # Feature tests
├── examples/
│   └── react-app/                 # React example application
├── vitest.config.mts              # Test runner config
├── tsconfig.json                  # TypeScript config
├── rollup.config.mjs              # Build config
└── package.json
```

---

## 🛠️ Development

### Prerequisites
- Node.js 22.12.0 (pinned with Volta)
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Build library
npm run build

# Watch for changes
npm run watch
```

### Build Commands

```bash
npm run build              # Build production
npm run test:run           # Run tests
npm run test:watch         # Watch tests
npm run test:ui            # Test UI dashboard
npm run example:dev        # Run React example
npm run example:build      # Build React example
```

---

## 📊 What's New (TypeScript Migration)

### ✅ Completed

- ✅ Full TypeScript migration
- ✅ Strict type checking enabled
- ✅ Modern build tooling (Rollup 4.x, TypeScript 5.x)
- ✅ ESM and CommonJS dual output
- ✅ Complete test suite (20+ tests passing)
- ✅ Production-ready React example
- ✅ Comprehensive documentation

### 🎯 Quality Metrics

| Metric | Status |
|--------|--------|
| TypeScript | ✅ Full coverage with strict mode |
| Tests | ✅ 20+ tests passing |
| Build | ✅ 0 errors |
| Output | ✅ ESM + IIFE dual format |
| Types | ✅ Complete definitions |
| Docs | ✅ Comprehensive guides |

---

## 🚀 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

For older browsers, ensure required polyfills are present.

---

## 🔄 Format Comparison

| Format | Use Case | Size | Speed | Quality |
|--------|----------|------|-------|---------|
| **SVG** | UI/Diagrams | Smallest | Fastest | Vector |
| **PNG** | General Purpose | Medium | Medium | Lossless |
| **JPEG** | Photos | Smallest | Slower | Lossy |
| **Blob** | Server Upload | Any | Any | Any |

---

## ⚙️ Advanced Options

### Custom Dimensions

```typescript
const png = await domtoimage.toPng(element, {
  width: 1920,
  height: 1080,
});
```

### Background Color

```typescript
const png = await domtoimage.toPng(element, {
  bgcolor: '#ffffff',
});
```

### JPEG Quality

```typescript
const jpeg = await domtoimage.toJpeg(element, {
  quality: 0.95,  // 0 to 1
});
```

### Filter Nodes

```typescript
const svg = await domtoimage.toSvg(element, {
  filter: (node) => {
    // Exclude elements with class 'no-capture'
    if (node instanceof HTMLElement) {
      return !node.classList.contains('no-capture');
    }
    return true;
  },
});
```

### Cache Busting

```typescript
const png = await domtoimage.toPng(element, {
  cacheBust: true,  // Add random query string to URLs
});
```

---

## 🐛 Troubleshooting

### Styles Not Captured
- Ensure styles are inline or in `<style>` tags
- External stylesheets may not be included
- Use computed styles for debugging

### Canvas-Related Errors
- SVG capture works in all environments
- PNG/JPEG may need browser environment
- Always use try-catch blocks

### Performance Issues
- Use SVG for simple UI elements
- Break large captures into sections
- Cache element references

### Import Errors
- Ensure library is built: `npm run build`
- Check Node.js version: `node --version`
- Try reinstalling: `rm -rf node_modules && npm install`

---

## 📄 File Guides

### Main Documentation Files

#### `TESTING.md`
Quick reference for:
- Running tests
- Test commands
- Test patterns

#### `TESTING_STATUS.md`
Current test status:
- Test results
- Coverage information
- Known issues

#### `TEST_SETUP_SUMMARY.md`
Comprehensive testing:
- Setup details
- Infrastructure overview
- Test organization

#### `EXAMPLES_QUICKSTART.md`
Quick start for examples:
- Installation steps
- Running instructions
- Troubleshooting

#### `examples/README.md`
Examples overview:
- Available examples
- Features demonstrated
- Technologies used

#### `examples/react-app/README.md`
React example details:
- Project structure
- Component documentation
- Customization guide

#### `tests/README.md`
Testing infrastructure:
- Test setup
- Helper utilities
- Mock implementations

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Ensure all tests pass
5. Submit a pull request

See `TESTING.md` for test setup instructions.

---

## 📝 License

[MIT](https://choosealicense.com/licenses/mit/)

---

## 🙏 Acknowledgments

- Original library: [dom-to-image](https://github.com/tsayen/dom-to-image) by tsayen
- Modern tooling and TypeScript migration by Muhammad K. Huda

---

## 📞 Support

- 📖 Check the documentation files listed above
- 🐛 Found a bug? [Open an issue](https://github.com/mkhuda/dom-screenshot/issues)
- 💬 Have questions? Check existing issues or discussions
- 🚀 Want to contribute? See Contributing section

---

**Ready to capture? Start with the [React example](#-examples) or read the [Quick Start](#-quick-start)!** 📸
