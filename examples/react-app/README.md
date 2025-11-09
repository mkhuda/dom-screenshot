# dom-screenshot React Example

A simple, real-world React application demonstrating how to use the `@mkhuda/dom-screenshot` library to capture DOM elements as SVG, PNG, or JPEG images.

## Features

- 📸 **Multiple Format Support**: Capture as SVG, PNG, or JPEG
- 🎨 **Beautiful UI**: Modern, responsive design with Tailwind-inspired styling
- 💾 **Download Support**: Automatically download captured screenshots
- 🔄 **Live Preview**: See captured screenshots in real-time
- ⚡ **Fast**: Built with Vite for quick development and builds

## Project Structure

```
src/
├── App.tsx              # Main application component
├── App.css              # Main styles
├── main.tsx             # React entry point
├── index.css            # Global styles
└── components/
    ├── Card.tsx         # Reusable card component
    └── ScreenshotButton.tsx  # Screenshot button with loading state
```

## Getting Started

### Prerequisites

- Node.js 22.12.0 (pinned with Volta)
- npm or yarn

### Installation

```bash
# From the root dom-screenshot project
cd examples/react-app

# Install dependencies
npm install

# For development, you may need to link the local library
npm link ../../
```

### Development

```bash
# Start development server
npm run dev

# The app will open at http://localhost:5173
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

The application demonstrates three main capturing modes:

### SVG Capture
```tsx
const svg = await domtoimage.toSvg(element);
// Creates a vector-based screenshot (scalable, smaller file size)
```

### PNG Capture
```tsx
const png = await domtoimage.toPng(element);
// Creates a raster PNG image (good quality, larger file size)
```

### JPEG Capture
```tsx
const jpeg = await domtoimage.toJpeg(element);
// Creates a compressed JPEG image (smaller file size, lossy compression)
```

## Real-World Use Cases

This example demonstrates how to use dom-screenshot in:

1. **Screenshot Tools**: Capture UI elements for sharing
2. **Report Generation**: Generate visual reports from React components
3. **Export Features**: Let users download rendered content as images
4. **Documentation**: Automatically create screenshots for documentation
5. **Social Media**: Generate share-ready images from web content

## Components

### App Component
- Main container that manages screenshot state
- Handles all three capture methods
- Manages preview gallery
- Download functionality

### Card Component
- Example component to capture
- Multiple instances to show complex DOM handling
- Color-coded with styled borders

### ScreenshotButton Component
- Reusable button for capture actions
- Shows loading state during capture
- Error handling built-in

## Technologies

- **React 18.3.1**: Latest React for UI
- **Vite 7.2.2**: Lightning-fast build tool
- **TypeScript**: Type-safe development
- **CSS**: Modern CSS Grid and Flexbox layouts
- **dom-screenshot**: The star of the show! 🌟

## Tips

1. **Complex Elements**: The library can capture nested elements, flexbox layouts, gradients, and more
2. **Performance**: For large DOM elements, SVG is usually faster than PNG/JPEG
3. **Styling**: All CSS styles (colors, fonts, shadows) are preserved in the output
4. **Error Handling**: Always wrap capture calls in try-catch blocks

## Troubleshooting

**Canvas-related Errors**: Some capture modes require canvas support. Use `try-catch` blocks.

**File Size**:
- SVG: Smallest but may have resolution issues on complex designs
- PNG: Larger but best quality for most use cases
- JPEG: Compressed, good for photos and complex gradients

**Performance**:
- Use SVG for simple UI elements
- Use PNG for general purpose screenshots
- Use JPEG for image-heavy content

## Next Steps

To extend this example:

1. Add different capture regions
2. Implement screenshot history
3. Add filters or modifications
4. Generate multiple formats at once
5. Integrate with cloud storage
6. Add annotation tools

## License

MIT - Same as the main dom-screenshot package

---

Happy screenshotting! 📸
