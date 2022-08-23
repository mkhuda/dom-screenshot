/**
 * @param {Node} node - The DOM Node object to render
 * @param {Options} options - Rendering options
 * @return {Promise} - A promise that is fulfilled with a SVG image data URL
 * */
export function toSvg(node: Node, options: {
    /**
     * - Should return true if passed node should be included in the output
     * (excluding node means excluding it's children as well). Not called on the root node.
     */
    filter?: Function | undefined;
    /**
     * - color for the background, any valid CSS color value.
     */
    bgcolor?: string | undefined;
    /**
     * - width to be applied to node before rendering.
     */
    width?: number | undefined;
    /**
     * - height to be applied to node before rendering.
     */
    height?: number | undefined;
    /**
     * - an object whose properties to be copied to node's style before rendering.
     */
    style?: any | undefined;
    /**
     * - a Number between 0 and 1 indicating image quality (applicable to JPEG only),
     * defaults to 1.0.
     */
    quality?: number | undefined;
    /**
     * - dataURL to use as a placeholder for failed images, default behaviour is to fail fast on images we can't fetch
     */
    imagePlaceholder?: string | undefined;
    /**
     * - set to true to cache bust by appending the time to the request url
     */
    cacheBust?: boolean;
}): Promise<any>;
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Options} options - Rendering options
 * @return {Promise} - A promise that is fulfilled with a PNG image data URL
 * */
export function toPng(node: Node, options: {
    /**
     * - Should return true if passed node should be included in the output
     * (excluding node means excluding it's children as well). Not called on the root node.
     */
    filter?: Function | undefined;
    /**
     * - color for the background, any valid CSS color value.
     */
    bgcolor?: string | undefined;
    /**
     * - width to be applied to node before rendering.
     */
    width?: number | undefined;
    /**
     * - height to be applied to node before rendering.
     */
    height?: number | undefined;
    /**
     * - an object whose properties to be copied to node's style before rendering.
     */
    style?: any | undefined;
    /**
     * - a Number between 0 and 1 indicating image quality (applicable to JPEG only),
     * defaults to 1.0.
     */
    quality?: number | undefined;
    /**
     * - dataURL to use as a placeholder for failed images, default behaviour is to fail fast on images we can't fetch
     */
    imagePlaceholder?: string | undefined;
    /**
     * - set to true to cache bust by appending the time to the request url
     */
    cacheBust?: boolean;
}): Promise<any>;
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Options} options - Rendering options
 * @return {Promise} - A promise that is fulfilled with a JPEG image data URL
 * */
export function toJpeg(node: Node, options: {
    /**
     * - Should return true if passed node should be included in the output
     * (excluding node means excluding it's children as well). Not called on the root node.
     */
    filter?: Function | undefined;
    /**
     * - color for the background, any valid CSS color value.
     */
    bgcolor?: string | undefined;
    /**
     * - width to be applied to node before rendering.
     */
    width?: number | undefined;
    /**
     * - height to be applied to node before rendering.
     */
    height?: number | undefined;
    /**
     * - an object whose properties to be copied to node's style before rendering.
     */
    style?: any | undefined;
    /**
     * - a Number between 0 and 1 indicating image quality (applicable to JPEG only),
     * defaults to 1.0.
     */
    quality?: number | undefined;
    /**
     * - dataURL to use as a placeholder for failed images, default behaviour is to fail fast on images we can't fetch
     */
    imagePlaceholder?: string | undefined;
    /**
     * - set to true to cache bust by appending the time to the request url
     */
    cacheBust?: boolean;
}): Promise<any>;
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Options} options - Rendering options
 * @return {Promise} - A promise that is fulfilled with a Blob image data URL
 * */
export function toBlob(node: Node, options: {
    /**
     * - Should return true if passed node should be included in the output
     * (excluding node means excluding it's children as well). Not called on the root node.
     */
    filter?: Function | undefined;
    /**
     * - color for the background, any valid CSS color value.
     */
    bgcolor?: string | undefined;
    /**
     * - width to be applied to node before rendering.
     */
    width?: number | undefined;
    /**
     * - height to be applied to node before rendering.
     */
    height?: number | undefined;
    /**
     * - an object whose properties to be copied to node's style before rendering.
     */
    style?: any | undefined;
    /**
     * - a Number between 0 and 1 indicating image quality (applicable to JPEG only),
     * defaults to 1.0.
     */
    quality?: number | undefined;
    /**
     * - dataURL to use as a placeholder for failed images, default behaviour is to fail fast on images we can't fetch
     */
    imagePlaceholder?: string | undefined;
    /**
     * - set to true to cache bust by appending the time to the request url
     */
    cacheBust?: boolean;
}): Promise<any>;
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Options} options - Rendering options
 * @return {Promise} - A promise that is fulfilled with a PixelData image data URL
 * */
export function toPixelData(node: Node, options: {
    /**
     * - Should return true if passed node should be included in the output
     * (excluding node means excluding it's children as well). Not called on the root node.
     */
    filter?: Function | undefined;
    /**
     * - color for the background, any valid CSS color value.
     */
    bgcolor?: string | undefined;
    /**
     * - width to be applied to node before rendering.
     */
    width?: number | undefined;
    /**
     * - height to be applied to node before rendering.
     */
    height?: number | undefined;
    /**
     * - an object whose properties to be copied to node's style before rendering.
     */
    style?: any | undefined;
    /**
     * - a Number between 0 and 1 indicating image quality (applicable to JPEG only),
     * defaults to 1.0.
     */
    quality?: number | undefined;
    /**
     * - dataURL to use as a placeholder for failed images, default behaviour is to fail fast on images we can't fetch
     */
    imagePlaceholder?: string | undefined;
    /**
     * - set to true to cache bust by appending the time to the request url
     */
    cacheBust?: boolean;
}): Promise<any>;
declare namespace fontFaces {
    export { resolveAll };
    export namespace impl_1 {
        export { readAll };
    }
    export { impl_1 as impl };
}
declare namespace images {
    export { inlineAll };
    export namespace impl_2 {
        export { newImage };
    }
    export { impl_2 as impl };
}
declare namespace util {
    export { escapeMain };
    export { parseExtension };
    export { mimeType };
    export { dataAsUrl };
    export { isDataUrl };
    export { canvasToBlob };
    export { resolveUrl };
    export { getAndEncode };
    export function uid(): string;
    export { delay };
    export { asArray };
    export { escapeXhtml };
    export { makeImage };
    export { width };
    export { height };
}
declare namespace inliner {
    export { inlineAll };
    export { shouldProcess };
    export namespace impl_3 {
        export { readUrls };
        export { inline };
    }
    export { impl_3 as impl };
}
declare function resolveAll(): Promise<string>;
declare function readAll(): Promise<any>;
declare function inlineAll(node: any): any;
declare function newImage(element: any): {
    inline: (get: any) => Promise<any>;
};
declare function escapeMain(string: any): any;
declare function parseExtension(url: any): string;
declare function mimeType(url: any): any;
declare function dataAsUrl(content: any, type: any): string;
declare function isDataUrl(url: any): boolean;
declare function canvasToBlob(canvas: any): Promise<any>;
declare function resolveUrl(url: any, baseUrl: any): string;
declare function getAndEncode(url: any): Promise<any>;
declare function delay(ms: any): (arg: any) => Promise<any>;
declare function asArray(arrayLike: any): any[];
declare function escapeXhtml(string: any): any;
declare function makeImage(uri: any): Promise<any>;
declare function width(node: any): any;
declare function height(node: any): any;
declare function inlineAll_1(string: any, baseUrl: any, get: any): Promise<any>;
declare function shouldProcess(string: any): boolean;
declare function readUrls(string: any): string[];
declare function inline(string: any, url: any, baseUrl: any, get: any): Promise<any>;
export declare namespace impl {
    export { fontFaces };
    export { images };
    export { util };
    export { inliner };
    export const options: {};
}
export {};
