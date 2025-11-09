import { useState, useRef } from 'react';
import { domtoimage } from '@mkhuda/dom-screenshot';
import { Card } from './components/Card';
import { ScreenshotButton } from './components/ScreenshotButton';
import './App.css';

export function App() {
  const [screenshots, setScreenshots] = useState<Array<{ id: string; type: string; url: string }>>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToSvg = async () => {
    if (!contentRef.current) return;
    try {
      const svg = await domtoimage.toSvg(contentRef.current);
      const id = Date.now().toString();
      setScreenshots((prev) => [{ id, type: 'SVG', url: svg }, ...prev]);
      downloadFile(svg, 'screenshot.svg');
    } catch (error) {
      console.error('SVG capture failed:', error);
    }
  };

  const handleToPng = async () => {
    if (!contentRef.current) return;
    try {
      const png = await domtoimage.toPng(contentRef.current);
      const id = Date.now().toString();
      setScreenshots((prev) => [{ id, type: 'PNG', url: png }, ...prev]);
      downloadFile(png, 'screenshot.png');
    } catch (error) {
      console.error('PNG capture failed:', error);
    }
  };

  const handleToJpeg = async () => {
    if (!contentRef.current) return;
    try {
      const jpeg = await domtoimage.toJpeg(contentRef.current);
      const id = Date.now().toString();
      setScreenshots((prev) => [{ id, type: 'JPEG', url: jpeg }, ...prev]);
      downloadFile(jpeg, 'screenshot.jpg');
    } catch (error) {
      console.error('JPEG capture failed:', error);
    }
  };

  const clearScreenshots = () => {
    setScreenshots([]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📸 dom-screenshot React Example</h1>
        <p>Capture DOM elements to SVG, PNG, or JPEG</p>
      </header>

      <main className="container">
        <div className="layout">
          {/* Content to capture */}
          <section className="capture-section">
            <h2>Content to Capture</h2>
            <div ref={contentRef} className="capture-content">
              <Card
                title="Beautiful Card"
                description="This card will be captured as a screenshot"
                color="blue"
              />
              <Card
                title="Another Card"
                description="Multiple elements can be captured together"
                color="purple"
              />
              <Card
                title="Third Card"
                description="Try different formats: SVG, PNG, or JPEG"
                color="green"
              />

              <div className="stats">
                <div className="stat-item">
                  <span className="stat-number">42</span>
                  <span className="stat-label">Captures</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">∞</span>
                  <span className="stat-label">Possibilities</span>
                </div>
              </div>
            </div>

            <div className="buttons">
              <ScreenshotButton label="📷 SVG" onClick={handleToSvg} />
              <ScreenshotButton label="🖼️ PNG" onClick={handleToPng} />
              <ScreenshotButton label="📷 JPEG" onClick={handleToJpeg} />
            </div>
          </section>

          {/* Screenshot previews */}
          <section className="previews-section">
            <div className="previews-header">
              <h2>Captured Screenshots ({screenshots.length})</h2>
              {screenshots.length > 0 && (
                <button className="clear-btn" onClick={clearScreenshots}>
                  Clear All
                </button>
              )}
            </div>

            <div className="previews-list">
              {screenshots.length === 0 ? (
                <p className="empty-state">No screenshots yet. Click a button above to capture!</p>
              ) : (
                screenshots.map((screenshot) => (
                  <div key={screenshot.id} className="preview-item">
                    <div className="preview-header">
                      <span className="preview-type">{screenshot.type}</span>
                      <span className="preview-time">
                        {new Date(parseInt(screenshot.id)).toLocaleTimeString()}
                      </span>
                    </div>
                    <img
                      src={screenshot.url}
                      alt={`Screenshot ${screenshot.type}`}
                      className="preview-image"
                    />
                    <button
                      className="download-btn"
                      onClick={() => downloadFile(screenshot.url, `screenshot-${screenshot.id}.${screenshot.type.toLowerCase()}`)}
                    >
                      Download
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <p>
          Created with <span className="heart">❤️</span> using dom-screenshot
        </p>
      </footer>
    </div>
  );
}
