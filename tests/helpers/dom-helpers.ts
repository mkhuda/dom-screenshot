/**
 * DOM testing helpers
 */

/**
 * Create a simple div with text content
 */
export function createSimpleDiv(text: string = 'Test'): HTMLDivElement {
  const div = document.createElement('div');
  div.textContent = text;
  return div;
}

/**
 * Create a styled div with custom CSS
 */
export function createStyledDiv(
  text: string,
  styles: Record<string, string>
): HTMLDivElement {
  const div = createSimpleDiv(text);
  Object.assign(div.style, styles);
  return div;
}

/**
 * Create a div with background color
 */
export function createColoredDiv(
  text: string,
  color: string,
  bgColor: string
): HTMLDivElement {
  return createStyledDiv(text, { color, backgroundColor: bgColor });
}

/**
 * Create a simple image element
 */
export function createImageElement(
  src: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  alt: string = 'test'
): HTMLImageElement {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  return img;
}

/**
 * Create a canvas element with some drawing
 */
export function createCanvasElement(
  width: number = 100,
  height: number = 100
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, width, height);
  }

  return canvas;
}

/**
 * Create a video element
 */
export function createVideoElement(
  src: string = 'data:video/mp4;base64,',
  width: number = 100,
  height: number = 100
): HTMLVideoElement {
  const video = document.createElement('video');
  video.src = src;
  video.width = width;
  video.height = height;
  return video;
}

/**
 * Create a textarea with value
 */
export function createTextarea(value: string = 'test value'): HTMLTextAreaElement {
  const textarea = document.createElement('textarea');
  textarea.value = value;
  return textarea;
}

/**
 * Create an input element with value
 */
export function createInput(
  value: string = 'test input',
  type: string = 'text'
): HTMLInputElement {
  const input = document.createElement('input');
  input.type = type;
  input.value = value;
  return input;
}

/**
 * Create a complex DOM tree with various elements
 */
export function createComplexDOM(): HTMLDivElement {
  const container = document.createElement('div');
  container.style.width = '200px';
  container.style.height = '200px';
  container.style.backgroundColor = '#f0f0f0';

  // Add text
  const heading = document.createElement('h1');
  heading.textContent = 'Test Heading';
  heading.style.color = '#333';
  container.appendChild(heading);

  // Add paragraph
  const para = document.createElement('p');
  para.textContent = 'This is a test paragraph.';
  para.style.fontSize = '14px';
  container.appendChild(para);

  // Add image
  const img = createImageElement();
  img.style.width = '50px';
  img.style.height = '50px';
  container.appendChild(img);

  // Add nested div
  const nested = document.createElement('div');
  nested.style.border = '1px solid #ccc';
  nested.style.padding = '10px';
  nested.textContent = 'Nested content';
  container.appendChild(nested);

  return container;
}

/**
 * Create a DOM with inline styles
 */
export function createDOMWithStyles(): HTMLDivElement {
  const container = document.createElement('div');
  container.style.background = 'linear-gradient(to right, #ff0000, #00ff00)';
  container.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  container.style.borderRadius = '8px';
  container.style.padding = '20px';

  const text = document.createElement('span');
  text.textContent = 'Styled content';
  text.style.fontWeight = 'bold';
  text.style.color = 'white';
  container.appendChild(text);

  return container;
}

/**
 * Create a DOM with pseudo-elements (via CSS class)
 */
export function createDOMWithPseudoElements(): HTMLDivElement {
  const style = document.createElement('style');
  style.textContent = `
    .pseudo-element {
      position: relative;
    }
    .pseudo-element::before {
      content: '→ ';
      color: red;
    }
    .pseudo-element::after {
      content: ' ←';
      color: blue;
    }
  `;
  document.head.appendChild(style);

  const div = document.createElement('div');
  div.className = 'pseudo-element';
  div.textContent = 'Text with pseudo-elements';

  return div;
}

/**
 * Create a SVG element
 */
export function createSVGElement(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100');
  svg.setAttribute('height', '100');
  svg.setAttribute('viewBox', '0 0 100 100');

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '50');
  circle.setAttribute('cy', '50');
  circle.setAttribute('r', '40');
  circle.setAttribute('fill', 'blue');

  svg.appendChild(circle);
  return svg;
}

/**
 * Wait for a specified time
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get image data from a data URL
 */
export function parseDataUrl(dataUrl: string): { type: string; data: string } {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    throw new Error(`Invalid data URL: ${dataUrl}`);
  }
  return {
    type: match[1],
    data: match[2],
  };
}

/**
 * Check if a data URL is valid
 */
export function isValidDataUrl(str: string): boolean {
  return typeof str === 'string' && str.startsWith('data:');
}

/**
 * Check if a data URL is an image
 */
export function isImageDataUrl(str: string): boolean {
  return typeof str === 'string' && str.startsWith('data:image/');
}
