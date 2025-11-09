/**
 * CSS and style test fixtures
 */

/**
 * Basic CSS fixtures
 */
export const CSS_FIXTURES = {
  /**
   * Basic div with color
   */
  coloredDiv: `
    <div style="
      width: 100px;
      height: 100px;
      background-color: blue;
      color: white;
    ">Colored</div>
  `,

  /**
   * Gradient background
   */
  gradientDiv: `
    <div style="
      width: 100px;
      height: 100px;
      background: linear-gradient(to right, red, blue);
    ">Gradient</div>
  `,

  /**
   * Border and shadow
   */
  borderShadowDiv: `
    <div style="
      width: 100px;
      height: 100px;
      border: 2px solid black;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      background-color: white;
    ">Border & Shadow</div>
  `,

  /**
   * Border radius
   */
  borderRadiusDiv: `
    <div style="
      width: 100px;
      height: 100px;
      background-color: green;
      border-radius: 50%;
    ">Circle</div>
  `,

  /**
   * Transform and rotation
   */
  transformDiv: `
    <div style="
      width: 100px;
      height: 100px;
      background-color: orange;
      transform: rotate(45deg);
    ">Rotated</div>
  `,

  /**
   * Opacity
   */
  opacityDiv: `
    <div style="
      width: 100px;
      height: 100px;
      background-color: purple;
      opacity: 0.5;
    ">Transparent</div>
  `,

  /**
   * Font styling
   */
  fontStyledDiv: `
    <div style="
      font-family: Arial, sans-serif;
      font-size: 16px;
      font-weight: bold;
      color: #333;
      line-height: 1.5;
    ">
      <p>Styled text</p>
    </div>
  `,

  /**
   * Flexbox layout
   */
  flexboxDiv: `
    <div style="
      display: flex;
      gap: 10px;
      background-color: #f0f0f0;
      padding: 10px;
    ">
      <div style="
        width: 50px;
        height: 50px;
        background-color: red;
      "></div>
      <div style="
        width: 50px;
        height: 50px;
        background-color: green;
      "></div>
      <div style="
        width: 50px;
        height: 50px;
        background-color: blue;
      "></div>
    </div>
  `,

  /**
   * Grid layout
   */
  gridDiv: `
    <div style="
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      background-color: #f0f0f0;
      padding: 10px;
    ">
      <div style="background-color: red; height: 50px;"></div>
      <div style="background-color: green; height: 50px;"></div>
      <div style="background-color: blue; height: 50px;"></div>
    </div>
  `,

  /**
   * Padding and margin
   */
  spacingDiv: `
    <div style="
      background-color: #ddd;
      padding: 20px;
      margin: 10px;
      border: 1px solid #999;
    ">
      <div style="
        background-color: white;
        padding: 10px;
        margin: 10px;
        border: 1px solid #ccc;
      ">Spaced content</div>
    </div>
  `,

  /**
   * Text alignment
   */
  textAlignDiv: `
    <div style="width: 200px;">
      <p style="text-align: left;">Left aligned</p>
      <p style="text-align: center;">Center aligned</p>
      <p style="text-align: right;">Right aligned</p>
    </div>
  `,

  /**
   * Overflow handling
   */
  overflowDiv: `
    <div style="
      width: 100px;
      height: 100px;
      background-color: #f0f0f0;
      overflow: hidden;
      border: 1px solid #ccc;
    ">
      This text will be cut off because it exceeds the container size.
    </div>
  `,

  /**
   * List styling
   */
  listDiv: `
    <ul style="
      list-style: none;
      padding: 0;
    ">
      <li style="
        padding: 5px;
        background-color: #eee;
        margin: 2px;
        border-left: 3px solid blue;
        padding-left: 10px;
      ">Item 1</li>
      <li style="
        padding: 5px;
        background-color: #eee;
        margin: 2px;
        border-left: 3px solid blue;
        padding-left: 10px;
      ">Item 2</li>
    </ul>
  `,

  /**
   * Table styling
   */
  tableDiv: `
    <table style="
      border-collapse: collapse;
      width: 200px;
    ">
      <tr>
        <th style="
          background-color: #333;
          color: white;
          padding: 8px;
          border: 1px solid #333;
        ">Header 1</th>
        <th style="
          background-color: #333;
          color: white;
          padding: 8px;
          border: 1px solid #333;
        ">Header 2</th>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">Data 1</td>
        <td style="padding: 8px; border: 1px solid #ddd;">Data 2</td>
      </tr>
    </table>
  `,
};

/**
 * Create a CSS style element
 */
export function createStyleElement(css: string): HTMLStyleElement {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  return style;
}

/**
 * Create pseudo-element CSS
 */
export function createPseudoElementCSS(): string {
  return `
    .with-before::before {
      content: '→ ';
      color: red;
      font-weight: bold;
    }
    .with-after::after {
      content: ' ←';
      color: blue;
      font-weight: bold;
    }
    .with-both::before {
      content: '[';
      color: green;
    }
    .with-both::after {
      content: ']';
      color: green;
    }
  `;
}

/**
 * Create a div with pseudo-elements
 */
export function createDivWithPseudoElements(): HTMLDivElement {
  const style = createStyleElement(createPseudoElementCSS());

  const div = document.createElement('div');
  div.className = 'with-both';
  div.textContent = 'Text with pseudo-elements';

  return div;
}
