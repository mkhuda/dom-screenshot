# Examples - Quick Start Guide

## React Example - Get It Running in 3 Steps

### Step 1: Install Dependencies (from root)
```bash
npm install
```

This will automatically install dependencies for both the main library AND the React example (thanks to npm workspaces).

### Step 2: Build the Library
```bash
npm run build
```

This creates the distributable files that the example app will use.

### Step 3: Start the React Example
```bash
npm run example:dev
```

The app will automatically open in your browser at `http://localhost:5173`

---

## What You'll See

A beautiful React application with:

### 🎨 **Left Side - Content Area**
- Three colorful cards
- Statistics section
- Three capture buttons (SVG, PNG, JPEG)

### 📸 **Right Side - Preview Gallery**
- Shows all captured screenshots
- Download button for each capture
- Upload time displayed
- Clear All button

### 🎯 **How to Use**

1. Click **"📷 SVG"** to capture as vector format
2. Click **"🖼️ PNG"** to capture as raster format
3. Click **"📷 JPEG"** to capture as compressed format
4. Watch the screenshot appear in the preview gallery
5. Download any screenshot or clear them all

---

## Building for Production

```bash
# From root directory
npm run example:build
```

Creates optimized production build in `examples/react-app/dist/`

---

## Key Features Demonstrated

✅ **SVG Capture** - Scalable vector format
✅ **PNG Capture** - High-quality raster format
✅ **JPEG Capture** - Compressed image format
✅ **Error Handling** - Graceful error management
✅ **UI Patterns** - Loading states, disabled buttons
✅ **File Download** - Automatic download to user device
✅ **Live Preview** - Real-time screenshot gallery
✅ **Responsive Design** - Works on all screen sizes

---

## Project Structure

```
dom-screenshot/
├── dist/                    # Built library output
├── src/                     # Library source
├── tests/                   # Library tests
├── examples/
│   ├── README.md           # Examples overview
│   └── react-app/          # React example app
│       ├── src/
│       ├── dist/           # Built React app
│       └── package.json
└── package.json            # Root config with workspaces
```

---

## Available Commands

From the **root directory**:

```bash
# Library commands
npm run build              # Build the library
npm run test:run           # Run tests
npm run test:watch         # Watch mode
npm run test:ui            # Vitest UI

# Example app commands
npm run example:dev        # Start example in dev mode
npm run example:build      # Build example for production
```

From the **react-app directory**:

```bash
npm run dev                # Development server
npm run build              # Production build
npm run preview            # Preview built app
```

---

## Architecture

The React example uses:

- **Vite** for fast HMR (Hot Module Replacement) during development
- **React 18.3.1** with hooks for state management
- **TypeScript** for type safety
- **CSS** for styling (no frameworks needed)
- **@mkhuda/dom-screenshot** for DOM capture

---

## Real-World Use Cases

This example demonstrates patterns for:

1. **Export Features** - Let users download UI as images
2. **Report Generation** - Create visual reports from data
3. **Screenshot Tools** - Build screenshot applications
4. **Social Sharing** - Generate share-ready images
5. **Documentation** - Auto-capture UI for docs

---

## Troubleshooting

### Port Already in Use
If port 5173 is taken:
```bash
# Vite will automatically use next available port
npm run example:dev
```

### Module Not Found
Make sure you've built the library:
```bash
npm run build
```

### Styles Not Loading
Clear cache and reinstall:
```bash
rm -rf node_modules examples/react-app/node_modules
npm install
```

### Canvas Issues
Some formats (PNG/JPEG) require browser environment. SVG should always work:
```tsx
// Try SVG if other formats fail
const svg = await domtoimage.toSvg(element);
```

---

## Next Steps

### To Learn More
1. Read `examples/react-app/README.md` for detailed documentation
2. Explore the source code in `examples/react-app/src/`
3. Check the main library docs in the root `README.md`

### To Extend
1. Add more capture options
2. Implement filters/effects
3. Add screenshot history
4. Integrate with cloud storage
5. Create batch processing

### To Deploy
1. Build with `npm run example:build`
2. Upload `examples/react-app/dist/` to your server
3. Or deploy to Vercel/Netlify with one click

---

## File Sizes

After building:

| File | Size | Purpose |
|------|------|---------|
| `dist/dom-screenshot.min.js` | ~9.6 KB | Minified IIFE |
| `dist/dom-screenshot.esm.js` | ~26 KB | ES Module |
| `dist/dom-screenshot.d.ts` | ~2 KB | TypeScript types |

---

## Browser Support

The library works in:
- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

For older browsers, ensure you have the required polyfills.

---

## Performance Tips

1. **Use SVG** for simple UI elements (fastest)
2. **Use PNG** for general screenshots
3. **Use JPEG** for photo-like content (smallest)
4. **Cache element references** with `useRef`
5. **Provide loading feedback** during capture

---

## Getting Help

1. Check the example's `README.md`
2. Review component source code in `src/components/`
3. Look at the main library documentation
4. Check GitHub issues for common problems

---

**You're all set! 🚀 Start capturing!** 📸
