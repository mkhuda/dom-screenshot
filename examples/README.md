# dom-screenshot Examples

This directory contains example applications demonstrating how to use the `@mkhuda/dom-screenshot` library in real-world scenarios.

## Available Examples

### React App Example

A modern React application built with **Vite** and **React 18.3.1** that demonstrates:

- 📸 Capturing DOM elements as SVG, PNG, and JPEG
- 🎨 Beautiful, responsive UI with modern styling
- 💾 Automatic file download after capture
- 🔄 Live preview of captured screenshots
- ⚡ Fast development and build times with Vite

**Location:** `react-app/`

**Quick Start:**
```bash
cd react-app
npm install
npm run dev
```

The app will open at `http://localhost:5173`

---

## Features Demonstrated

### 1. SVG Capture
- Vector-based output
- Smallest file size
- Perfect for UI elements and icons
- Scalable without quality loss

```tsx
const svg = await domtoimage.toSvg(element);
```

### 2. PNG Capture
- High-quality raster image
- Lossless compression
- Best for complex designs with gradients
- Larger file size than JPEG

```tsx
const png = await domtoimage.toPng(element);
```

### 3. JPEG Capture
- Compressed raster image
- Smaller file size than PNG
- Good for photographs
- Lossy compression

```tsx
const jpeg = await domtoimage.toJpeg(element);
```

---

## Real-World Use Cases

The React example shows how to implement:

1. **Export Feature** - Let users download rendered content
2. **Report Generation** - Create visual reports from UI
3. **Screenshot Tool** - Build screenshot applications
4. **Social Media** - Generate shareable images
5. **Documentation** - Auto-generate visual documentation

---

## Project Structure

```
examples/
├── README.md (this file)
└── react-app/
    ├── src/
    │   ├── App.tsx              # Main app component
    │   ├── App.css              # Styling
    │   ├── main.tsx             # React entry
    │   ├── index.css            # Global styles
    │   └── components/
    │       ├── Card.tsx         # Card component
    │       └── ScreenshotButton.tsx  # Button component
    ├── index.html               # HTML entry point
    ├── vite.config.ts           # Vite configuration
    ├── tsconfig.json            # TypeScript config
    ├── package.json             # Dependencies
    └── README.md                # Detailed docs
```

---

## Running from Root

From the root `dom-screenshot` directory:

```bash
# Start the React example in development mode
npm run example:dev

# Build the React example
npm run example:build
```

---

## Technologies Used

- **React 18.3.1** - Latest React
- **Vite 7.2.2** - Lightning-fast build tool
- **TypeScript** - Type safety
- **CSS Grid & Flexbox** - Modern layouts
- **@mkhuda/dom-screenshot** - The star! ⭐

---

## Key Features to Try

1. **Multi-format Capture**
   - Try capturing the same element in different formats
   - Compare file sizes and quality

2. **Complex Elements**
   - The example includes gradient backgrounds, shadows, and colors
   - Shows that dom-screenshot preserves all CSS styling

3. **Batch Processing**
   - Capture multiple times and see the preview gallery
   - Download any captured screenshot

4. **Responsive Design**
   - Try on different screen sizes
   - The app is fully responsive

---

## Tips for Your Own Project

### 1. Error Handling
```tsx
try {
  const svg = await domtoimage.toSvg(element);
  // Use svg...
} catch (error) {
  console.error('Capture failed:', error);
}
```

### 2. Performance
- For large elements, use SVG first (faster)
- Cache the element reference with `useRef`
- Provide loading feedback during capture

### 3. File Downloads
```tsx
const link = document.createElement('a');
link.href = dataUrl;
link.download = 'screenshot.png';
link.click();
```

### 4. Choose the Right Format
| Format | Best For | Size | Speed |
|--------|----------|------|-------|
| SVG | UI/Simple | Smallest | Fastest |
| PNG | General | Medium | Medium |
| JPEG | Photos | Smallest | Slow |

---

## Troubleshooting

**Issue: Canvas-related errors in tests**
- SVG capture should work fine in jsdom
- PNG/JPEG may need browser environment
- Use try-catch blocks

**Issue: Styles not captured**
- Ensure all styles are inline or in `<style>` tags
- External stylesheets may not be included
- Use `window.getComputedStyle()` to debug

**Issue: Performance**
- Break large captures into sections
- Use SVG for UI elements
- Use PNG/JPEG for complex content

---

## Next Steps

1. **Customize** - Modify colors, layout, content
2. **Extend** - Add more capture formats
3. **Integrate** - Connect to your backend
4. **Deploy** - Deploy to production

---

## Questions?

Check the main `README.md` at the root for library documentation, or look at the React example's `README.md` for detailed instructions.

---

**Happy screenshotting!** 📸
