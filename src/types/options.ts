/**
 * Filter callback function type
 * Should return true if the node should be included in the output
 * (excluding a node also excludes its children). Not called on the root node.
 */
export type FilterCallback = (node: Node) => boolean;

/**
 * Callback function type for custom resource fetching and encoding
 */
export type GetAndEncodeCallback = (url: string) => Promise<string>;

/**
 * Rendering options for DOM screenshot functions
 */
export interface DomScreenshotOptions {
  /**
   * Filter function to selectively include/exclude nodes
   * Should return true if passed node should be included in the output
   * (excluding node means excluding its children as well). Not called on the root node.
   */
  filter?: FilterCallback;

  /**
   * Background color for the output image
   * Any valid CSS color value (e.g., '#ffffff', 'rgba(255,255,255,1)', 'white')
   */
  bgcolor?: string;

  /**
   * Width to be applied to node before rendering (in pixels)
   */
  width?: number;

  /**
   * Height to be applied to node before rendering (in pixels)
   */
  height?: number;

  /**
   * CSS style properties to be applied to node before rendering
   * Object whose properties are copied to node's style
   */
  style?: Record<string, string>;

  /**
   * Image quality for JPEG output
   * Number between 0 and 1, defaults to 1.0
   * Only applicable to JPEG format
   */
  quality?: number;

  /**
   * DataURL to use as a placeholder for failed images
   * Default behavior is to fail fast on images we can't fetch
   * Set this to gracefully handle failed image loads
   */
  imagePlaceholder?: string;

  /**
   * Cache bust flag
   * Set to true to cache bust by appending the current time to request URLs
   * Useful to bypass browser cache or CDN cache when needed
   * Defaults to false
   */
  cacheBust?: boolean;
}

/**
 * Web font interface for internal use
 */
export interface WebFont {
  resolve(): Promise<string>;
  src(): string;
}

/**
 * Image handler interface for internal use
 */
export interface ImageHandler {
  inline(get?: GetAndEncodeCallback): Promise<void>;
}

/**
 * Internal utility functions namespace
 */
export interface Utilities {
  escapeMain(string: string): string;
  parseExtension(url: string): string;
  mimeType(url: string): string;
  dataAsUrl(content: string, type: string): string;
  isDataUrl(url: string): boolean;
  canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob>;
  resolveUrl(url: string, baseUrl: string): string;
  getAndEncode(url: string): Promise<string>;
  uid(): string;
  delay(ms: number): (arg: unknown) => Promise<unknown>;
  asArray<T>(arrayLike: ArrayLike<T>): T[];
  escapeXhtml(string: string): string;
  makeImage(uri: string): Promise<HTMLImageElement>;
  width(node: Element): number;
  height(node: Element): number;
}

/**
 * Internal inliner interface for resource inlining
 */
export interface Inliner {
  inlineAll(
    string: string,
    baseUrl?: string,
    get?: GetAndEncodeCallback
  ): Promise<string>;
  shouldProcess(string: string): boolean;
  impl: {
    readUrls(string: string): string[];
    inline(
      string: string,
      url: string,
      baseUrl?: string,
      get?: GetAndEncodeCallback
    ): Promise<string>;
  };
}

/**
 * Internal font faces interface
 */
export interface FontFaces {
  resolveAll(): Promise<string>;
  impl: {
    readAll(): Promise<WebFont[]>;
  };
}

/**
 * Internal images interface
 */
export interface Images {
  inlineAll(node: Node): Promise<Node>;
  impl: {
    newImage(element: HTMLImageElement): ImageHandler;
  };
}

/**
 * Implementation namespace for internal access
 */
export interface Implementation {
  fontFaces: FontFaces;
  images: Images;
  util: Utilities;
  inliner: Inliner;
  options: {
    imagePlaceholder?: string;
    cacheBust?: boolean;
  };
}
