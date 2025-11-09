/**
 * Simple tests to verify testing infrastructure
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createSimpleDiv, createStyledDiv } from '../helpers/dom-helpers';
import { createValidPngDataUrl, createValidSvgDataUrl } from '../mocks/canvas-mock';
import { PNG_1X1_TRANSPARENT } from '../fixtures/images';
import { SIMPLE_HTML } from '../fixtures/html';

describe('Testing Infrastructure', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  describe('Helper Functions', () => {
    it('should create a simple div', () => {
      const div = createSimpleDiv('Test');
      expect(div).toBeInstanceOf(HTMLDivElement);
      expect(div.textContent).toBe('Test');
    });

    it('should create a styled div', () => {
      const div = createStyledDiv('Styled', { color: 'red', fontSize: '16px' });
      expect(div).toBeInstanceOf(HTMLDivElement);
      expect(div.textContent).toBe('Styled');
      expect(div.style.color).toBe('red');
      expect(div.style.fontSize).toBe('16px');
    });

    it('should create div with background color', () => {
      const div = createSimpleDiv('Test');
      div.style.backgroundColor = 'blue';
      expect(div.style.backgroundColor).toBe('blue');
    });
  });

  describe('DOM Operations', () => {
    it('should add div to document', () => {
      const div = createSimpleDiv('Test');
      container.appendChild(div);
      expect(container.contains(div)).toBe(true);
    });

    it('should find nested elements', () => {
      container.innerHTML = '<div><p>Text</p></div>';
      const p = container.querySelector('p');
      expect(p).toBeDefined();
      expect(p?.textContent).toBe('Text');
    });

    it('should manipulate styles', () => {
      const div = document.createElement('div');
      div.style.width = '100px';
      div.style.height = '100px';
      expect(div.style.width).toBe('100px');
      expect(div.style.height).toBe('100px');
    });
  });

  describe('Custom Matchers', () => {
    it('should validate data URL', () => {
      const dataUrl = 'data:text/plain;base64,SGVsbG8=';
      expect(dataUrl).toBeValidDataUrl();
    });

    it('should validate SVG data URL', () => {
      const svgUrl = createValidSvgDataUrl();
      expect(svgUrl).toBeValidSvgDataUrl();
    });

    it('should validate PNG data URL', () => {
      const pngUrl = createValidPngDataUrl();
      expect(pngUrl).toBeValidPngDataUrl();
    });
  });

  describe('Fixtures', () => {
    it('should have HTML fixtures', () => {
      expect(SIMPLE_HTML).toBeDefined();
      expect(typeof SIMPLE_HTML).toBe('string');
      expect(SIMPLE_HTML.length).toBeGreaterThan(0);
    });

    it('should have image data URLs', () => {
      expect(PNG_1X1_TRANSPARENT).toMatch(/^data:image\/png/);
    });

    it('should render HTML fixtures', () => {
      container.innerHTML = SIMPLE_HTML;
      expect(container.innerHTML.length).toBeGreaterThan(0);
    });
  });

  describe('Mocking', () => {
    it('should create valid PNG data URL', () => {
      const png = createValidPngDataUrl();
      expect(png).toBeValidPngDataUrl();
    });

    it('should create valid SVG data URL', () => {
      const svg = createValidSvgDataUrl();
      expect(svg).toBeValidSvgDataUrl();
    });

    it('should create image data URL', () => {
      const img = new Image();
      img.src = PNG_1X1_TRANSPARENT;
      expect(img.src).toMatch(/^data:image\/png/);
    });
  });

  describe('DOM Parsing', () => {
    it('should parse data URL', () => {
      const dataUrl = 'data:text/plain;base64,SGVsbG8gV29ybGQ=';
      expect(dataUrl.split(',')[0]).toContain('data:');
    });

    it('should handle complex HTML', () => {
      const html = `
        <div>
          <h1>Title</h1>
          <p>Paragraph</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      `;
      container.innerHTML = html;
      expect(container.querySelector('h1')?.textContent).toBe('Title');
      expect(container.querySelectorAll('li').length).toBe(2);
    });
  });

  describe('Element Creation', () => {
    it('should create various DOM elements', () => {
      const div = document.createElement('div');
      const span = document.createElement('span');
      const p = document.createElement('p');

      expect(div).toBeInstanceOf(HTMLDivElement);
      expect(span).toBeInstanceOf(HTMLSpanElement);
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });

    it('should set attributes', () => {
      const img = document.createElement('img');
      img.setAttribute('src', PNG_1X1_TRANSPARENT);
      img.setAttribute('alt', 'test');

      expect(img.getAttribute('src')).toBe(PNG_1X1_TRANSPARENT);
      expect(img.getAttribute('alt')).toBe('test');
    });

    it('should set classes', () => {
      const div = document.createElement('div');
      div.className = 'test-class another-class';

      expect(div.classList.contains('test-class')).toBe(true);
      expect(div.classList.contains('another-class')).toBe(true);
    });
  });
});
