/**
 * HTML test fixtures
 */

/**
 * Simple HTML fixture
 */
export const SIMPLE_HTML = `
  <div style="width: 100px; height: 100px; background-color: blue;">
    <p>Hello World</p>
  </div>
`;

/**
 * HTML with styled elements
 */
export const STYLED_HTML = `
  <div style="
    width: 200px;
    height: 200px;
    background: linear-gradient(to right, #ff0000, #00ff00);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  ">
    <h1 style="color: white; font-size: 24px; margin: 0;">Styled Content</h1>
    <p style="color: #f0f0f0; font-size: 14px;">This is a paragraph with custom styling.</p>
  </div>
`;

/**
 * HTML with various elements
 */
export const COMPLEX_HTML = `
  <div style="width: 300px; background-color: #f5f5f5; padding: 20px;">
    <h1>Title</h1>
    <p>Paragraph text</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="test" style="width: 50px; height: 50px;" />
  </div>
`;

/**
 * HTML with nested divs
 */
export const NESTED_HTML = `
  <div style="background-color: #ddd; padding: 10px;">
    <div style="background-color: #ccc; padding: 10px;">
      <div style="background-color: #bbb; padding: 10px;">
        <p>Nested content</p>
      </div>
    </div>
  </div>
`;

/**
 * HTML with text and spans
 */
export const TEXT_HTML = `
  <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
    <p>This is <strong>bold</strong> text.</p>
    <p>This is <em>italic</em> text.</p>
    <p>This is <span style="color: red;">colored</span> text.</p>
  </div>
`;

/**
 * HTML with forms
 */
export const FORM_HTML = `
  <div>
    <form>
      <input type="text" value="Test input" style="padding: 5px; border: 1px solid #ccc;" />
      <textarea style="padding: 5px; border: 1px solid #ccc;">Test textarea value</textarea>
      <button type="submit">Submit</button>
    </form>
  </div>
`;

/**
 * HTML with colors
 */
export const COLOR_HTML = `
  <div style="display: flex; gap: 10px;">
    <div style="width: 50px; height: 50px; background-color: red;"></div>
    <div style="width: 50px; height: 50px; background-color: green;"></div>
    <div style="width: 50px; height: 50px; background-color: blue;"></div>
    <div style="width: 50px; height: 50px; background-color: yellow;"></div>
  </div>
`;

/**
 * HTML with borders and shadows
 */
export const BORDER_SHADOW_HTML = `
  <div style="
    width: 150px;
    height: 150px;
    background-color: white;
    border: 2px solid #333;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 15px;
  ">
    <p style="margin: 0; text-align: center;">Bordered & Shadowed</p>
  </div>
`;

/**
 * HTML with transformations
 */
export const TRANSFORM_HTML = `
  <div style="
    width: 100px;
    height: 100px;
    background-color: blue;
    transform: rotate(45deg);
  "></div>
`;

/**
 * HTML with multiple images
 */
export const MULTI_IMAGE_HTML = `
  <div style="display: flex; gap: 10px;">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="img1" style="width: 50px; height: 50px;" />
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="img2" style="width: 50px; height: 50px;" />
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="img3" style="width: 50px; height: 50px;" />
  </div>
`;

/**
 * HTML with table
 */
export const TABLE_HTML = `
  <table style="border-collapse: collapse; width: 200px;">
    <tr style="background-color: #ddd;">
      <th style="border: 1px solid #333; padding: 8px;">Column 1</th>
      <th style="border: 1px solid #333; padding: 8px;">Column 2</th>
    </tr>
    <tr>
      <td style="border: 1px solid #333; padding: 8px;">Data 1</td>
      <td style="border: 1px solid #333; padding: 8px;">Data 2</td>
    </tr>
    <tr>
      <td style="border: 1px solid #333; padding: 8px;">Data 3</td>
      <td style="border: 1px solid #333; padding: 8px;">Data 4</td>
    </tr>
  </table>
`;

/**
 * HTML with SVG
 */
export const SVG_HTML = `
  <div>
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="blue" />
      <rect x="10" y="10" width="30" height="30" fill="red" />
    </svg>
  </div>
`;

/**
 * Empty div fixture
 */
export const EMPTY_HTML = `<div></div>`;

/**
 * Large HTML for performance testing
 */
export function generateLargeHTML(itemCount: number = 100): string {
  let html = '<div style="background-color: #f5f5f5; padding: 10px;">';
  for (let i = 0; i < itemCount; i++) {
    html += `
      <div style="
        background-color: ${i % 2 === 0 ? '#fff' : '#ddd'};
        padding: 5px;
        margin: 5px;
        border: 1px solid #ccc;
      ">
        <p>Item ${i + 1}</p>
      </div>
    `;
  }
  html += '</div>';
  return html;
}
