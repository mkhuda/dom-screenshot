import type {
  DomScreenshotOptions,
  FilterCallback,
  GetAndEncodeCallback,
  WebFont,
  ImageHandler,
  Utilities,
  Inliner,
  FontFaces,
  Images,
  Implementation,
} from './types/options';

/**
 * Default implementation options
 */
const defaultOptions = {
  imagePlaceholder: undefined as string | undefined,
  cacheBust: false,
};

/**
 * Main domtoimage module export
 */
export const domtoimage = {
  toSvg,
  toPng,
  toJpeg,
  toBlob,
  toPixelData,
  impl: {
    fontFaces: newFontFaces(),
    images: newImages(),
    util: newUtil(),
    inliner: newInliner(),
    options: {} as { imagePlaceholder?: string; cacheBust?: boolean },
  },
};

// Export individual functions for ESM usage
export { toSvg, toPng, toJpeg, toBlob, toPixelData };

/**
 * Render DOM node to SVG data URL
 * @param node - The DOM Node object to render
 * @param options - Rendering options
 * @returns Promise fulfilled with a SVG image data URL
 */
function toSvg(node: Node, options?: DomScreenshotOptions): Promise<string> {
  options = options || {};
  copyOptions(options);
  return Promise.resolve(node)
    .then((node) => cloneNode(node, options!.filter, true))
    .then(embedFonts)
    .then(inlineImages)
    .then(applyOptions)
    .then((clone) => {
      const util = domtoimage.impl.util;
      return makeSvgDataUri(
        clone as Element,
        options!.width || util.width(clone as Element),
        options!.height || util.height(clone as Element)
      );
    });

  function applyOptions(clone: unknown): unknown {
    if (!(clone instanceof Element)) return clone;
    if (options!.bgcolor)
      (clone as HTMLElement).style.backgroundColor = options!.bgcolor;

    if (options!.width)
      (clone as HTMLElement).style.width = options!.width + 'px';
    if (options!.height)
      (clone as HTMLElement).style.height = options!.height + 'px';

    if (options!.style) {
      const styleObj = options!.style as Record<string, string>;
      Object.keys(styleObj).forEach((property) => {
        (clone as any).style[property] = styleObj[property];
      });
    }

    return clone;
  }
}

/**
 * Render DOM node to PNG data URL
 * @param node - The DOM Node object to render
 * @param options - Rendering options
 * @returns Promise fulfilled with a PNG image data URL
 */
function toPng(node: Node, options?: DomScreenshotOptions): Promise<string> {
  return draw(node, options || {}).then((canvas) => {
    return canvas.toDataURL();
  });
}

/**
 * Render DOM node to JPEG data URL
 * @param node - The DOM Node object to render
 * @param options - Rendering options
 * @returns Promise fulfilled with a JPEG image data URL
 */
function toJpeg(node: Node, options?: DomScreenshotOptions): Promise<string> {
  options = options || {};
  return draw(node, options).then((canvas) => {
    return canvas.toDataURL('image/jpeg', options!.quality || 1.0);
  });
}

/**
 * Render DOM node to Blob
 * @param node - The DOM Node object to render
 * @param options - Rendering options
 * @returns Promise fulfilled with a Blob
 */
function toBlob(node: Node, options?: DomScreenshotOptions): Promise<Blob> {
  return draw(node, options || {}).then((canvas) => {
    const util = domtoimage.impl.util;
    return util.canvasToBlob(canvas);
  });
}

/**
 * Render DOM node to PixelData
 * @param node - The DOM Node object to render
 * @param options - Rendering options
 * @returns Promise fulfilled with pixel data array
 */
function toPixelData(
  node: Node,
  options?: DomScreenshotOptions
): Promise<Uint8ClampedArray> {
  return draw(node, options || {}).then((canvas) => {
    const util = domtoimage.impl.util;
    return canvas
      .getContext('2d')!
      .getImageData(0, 0, util.width(node as Element), util.height(node as Element)).data;
  });
}

function copyOptions(options: DomScreenshotOptions): void {
  // Copy options to impl options for use in impl
  if (typeof options.imagePlaceholder === 'undefined') {
    domtoimage.impl.options.imagePlaceholder =
      defaultOptions.imagePlaceholder;
  } else {
    domtoimage.impl.options.imagePlaceholder = options.imagePlaceholder;
  }

  if (typeof options.cacheBust === 'undefined') {
    domtoimage.impl.options.cacheBust = defaultOptions.cacheBust;
  } else {
    domtoimage.impl.options.cacheBust = options.cacheBust;
  }
}

function draw(
  domNode: Node,
  options: DomScreenshotOptions
): Promise<HTMLCanvasElement> {
  return toSvg(domNode, options)
    .then((svgUri) => {
      const util = domtoimage.impl.util;
      return util.makeImage(svgUri);
    })
    .then((image) => {
      const util = domtoimage.impl.util;
      return util.delay(100)(image);
    })
    .then((image) => {
      const canvas = newCanvas(domNode);
      canvas.getContext('2d')!.drawImage(image as CanvasImageSource, 0, 0);
      return canvas;
    });

  function newCanvas(domNode: Node): HTMLCanvasElement {
    const util = domtoimage.impl.util;
    const canvas = document.createElement('canvas');
    canvas.width = options.width || util.width(domNode as Element);
    canvas.height = options.height || util.height(domNode as Element);

    if (options.bgcolor) {
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = options.bgcolor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return canvas;
  }
}

function cloneNode(
  node: Node,
  filter?: FilterCallback,
  root?: boolean
): Promise<Node | undefined> {
  if (!root && filter && !filter(node)) return Promise.resolve(undefined);

  const util = domtoimage.impl.util;

  return Promise.resolve(node)
    .then(makeNodeCopy)
    .then((clone) => cloneChildren(node, clone, filter))
    .then((clone) => processClone(node, clone));

  function makeNodeCopy(node: Node): Node | Promise<HTMLImageElement> {
    if (node instanceof HTMLCanvasElement)
      return util.makeImage(node.toDataURL());
    return node.cloneNode(false);
  }

  function cloneChildren(
    original: Node,
    clone: Node | undefined,
    filter?: FilterCallback
  ): Promise<Node | undefined> {
    if (!clone) return Promise.resolve(clone);

    const children = original.childNodes;
    if (children.length === 0) return Promise.resolve(clone);

    return cloneChildrenInOrder(
      clone,
      util.asArray(children),
      filter
    ).then(() => clone);

    function cloneChildrenInOrder(
      parent: Node,
      children: Node[],
      filter?: FilterCallback
    ): Promise<void> {
      let done: Promise<void> = Promise.resolve();
      children.forEach((child) => {
        done = done
          .then(() => cloneNode(child, filter))
          .then((childClone) => {
            if (childClone) parent.appendChild(childClone);
          });
      });
      return done;
    }
  }

  function processClone(
    original: Node,
    originalClone: Node | undefined
  ): Promise<Node | undefined> {
    if (!originalClone) return Promise.resolve(originalClone);
    if (!(originalClone instanceof Element)) return Promise.resolve(originalClone);

    const clone = originalClone;

    return Promise.resolve()
      .then(renderVideo)
      .then(cloneStyle)
      .then(clonePseudoElements)
      .then(copyUserInput)
      .then(fixSvg)
      .then(() => {
        return clone;
      });

    function renderVideo(): void {
      if (!(clone instanceof HTMLVideoElement)) return;

      const dimensions = window.getComputedStyle(original as Element);
      const canvas = document.createElement('canvas');
      canvas.width = parseInt(dimensions.width, 10);
      canvas.height = parseInt(dimensions.height, 10);

      const ratio = Math.max(
        (original as HTMLVideoElement).videoWidth / canvas.width,
        (original as HTMLVideoElement).videoHeight / canvas.height
      );

      const width = (original as HTMLVideoElement).videoWidth / ratio;
      const height = (original as HTMLVideoElement).videoHeight / ratio;
      const x = canvas.width / 2 - width / 2;
      const y = canvas.height / 2 - height / 2;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(original as CanvasImageSource, x, y, width, height);

      const newImage = new Image();
      try {
        newImage.src = canvas.toDataURL();
      } catch (err) {
        newImage.src =
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
      }

      // Replace video element with image in the cloned tree
      const parentClone = clone.parentNode;
      if (parentClone) {
        parentClone.replaceChild(newImage, clone);
      }
    }

    function cloneStyle(): void {
      const computedStyle = window.getComputedStyle(original as Element);
      copyStyle(computedStyle, (clone as HTMLElement).style);

      function copyStyle(source: CSSStyleDeclaration, target: CSSStyleDeclaration): void {
        if (source.cssText) {
          target.cssText = source.cssText;
        } else {
          copyProperties(source, target);
        }

        function copyProperties(source: CSSStyleDeclaration, target: CSSStyleDeclaration): void {
          const util = domtoimage.impl.util;
          util.asArray(source).forEach((name: string) => {
            target.setProperty(
              name,
              source.getPropertyValue(name),
              source.getPropertyPriority(name)
            );
          });
        }
      }
    }

    function clonePseudoElements(): void {
      ([':before', ':after'] as const).forEach((element) => {
        clonePseudoElement(element);
      });

      function clonePseudoElement(element: ':before' | ':after'): void {
        const style = window.getComputedStyle(original as Element, element);
        const content = style.getPropertyValue('content');

        if (content === '' || content === 'none') return;

        const util = domtoimage.impl.util;
        const className = util.uid();
        (clone as HTMLElement).className = (clone as HTMLElement).className + ' ' + className;

        const styleElement = document.createElement('style');
        styleElement.appendChild(
          formatPseudoElementStyle(className, element, style)
        );
        clone.appendChild(styleElement);

        function formatPseudoElementStyle(
          className: string,
          element: ':before' | ':after',
          style: CSSStyleDeclaration
        ): Text {
          const selector = '.' + className + ':' + element;
          const cssText = style.cssText
            ? formatCssText(style)
            : formatCssProperties(style);
          return document.createTextNode(selector + '{' + cssText + '}');

          function formatCssText(style: CSSStyleDeclaration): string {
            const content = style.getPropertyValue('content');
            return style.cssText + ' content: ' + content + ';';
          }

          function formatCssProperties(style: CSSStyleDeclaration): string {
            const util = domtoimage.impl.util;
            return (
              util
                .asArray(style)
                .map((name: string) => formatProperty(name))
                .join('; ') + ';'
            );

            function formatProperty(name: string): string {
              return (
                name +
                ': ' +
                style.getPropertyValue(name) +
                (style.getPropertyPriority(name) ? ' !important' : '')
              );
            }
          }
        }
      }
    }

    function copyUserInput(): void {
      if (original instanceof HTMLTextAreaElement)
        (clone as HTMLElement).innerHTML = original.value;
      if (original instanceof HTMLInputElement)
        (clone as HTMLElement).setAttribute('value', original.value);
    }

    function fixSvg(): void {
      if (!(clone instanceof SVGElement)) return;
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

      if (!(clone instanceof SVGRectElement)) return;
      (['width', 'height'] as const).forEach((attribute) => {
        const value = clone.getAttribute(attribute);
        if (!value) return;

        (clone as any).style.setProperty(attribute, value);
      });
    }
  }
}

function embedFonts(node: Node): Promise<Node> {
  const fontFaces = domtoimage.impl.fontFaces;
  return fontFaces.resolveAll().then((cssText) => {
    const styleNode = document.createElement('style');
    node.appendChild(styleNode);
    styleNode.appendChild(document.createTextNode(cssText));
    return node;
  });
}

function inlineImages(node: Node): Promise<Node> {
  const images = domtoimage.impl.images;
  return images.inlineAll(node).then(() => node);
}

function makeSvgDataUri(
  node: Element,
  width: number,
  height: number
): Promise<string> {
  const util = domtoimage.impl.util;
  return Promise.resolve(node)
    .then((node) => {
      node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
      return new XMLSerializer().serializeToString(node);
    })
    .then((xhtml) => {
      return (
        '<foreignObject x="0" y="0" width="100%" height="100%">' +
        xhtml +
        '</foreignObject>'
      );
    })
    .then((foreignObject) => {
      return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="' +
        width +
        '" height="' +
        height +
        '">' +
        foreignObject +
        '</svg>'
      );
    })
    .then((svg) => {
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function newUtil(): Utilities {
  const TIMEOUT = 30000;

  return {
    escapeMain,
    parseExtension,
    mimeType,
    dataAsUrl,
    isDataUrl,
    canvasToBlob,
    resolveUrl,
    getAndEncode,
    uid: uid(),
    delay,
    asArray,
    escapeXhtml,
    makeImage,
    width,
    height,
  };

  function mimes(): Record<string, string> {
    const WOFF = 'application/font-woff';
    const JPEG = 'image/jpeg';

    return {
      woff: WOFF,
      woff2: WOFF,
      ttf: 'application/font-truetype',
      eot: 'application/vnd.ms-fontobject',
      png: 'image/png',
      jpg: JPEG,
      jpeg: JPEG,
      gif: 'image/gif',
      tiff: 'image/tiff',
      svg: 'image/svg+xml',
    };
  }

  function parseExtension(url: string): string {
    const match = /\.([^\.\\/]*?)$/g.exec(url);
    if (match) return match[1];
    else return '';
  }

  function mimeType(url: string): string {
    const extension = parseExtension(url).toLowerCase();
    return mimes()[extension] || '';
  }

  function isDataUrl(url: string): boolean {
    return url.search(/^(data:)/) !== -1;
  }

  function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve) => {
      const binaryString = window.atob(canvas.toDataURL().split(',')[1]);
      const length = binaryString.length;
      const binaryArray = new Uint8Array(length);

      for (let i = 0; i < length; i++)
        binaryArray[i] = binaryString.charCodeAt(i);

      resolve(
        new Blob([binaryArray], {
          type: 'image/png',
        })
      );
    });
  }

  function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    if (canvas.toBlob) {
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!);
        });
      });
    }

    return toBlob(canvas);
  }

  function resolveUrl(url: string, baseUrl: string): string {
    const doc = document.implementation.createHTMLDocument();
    const base = doc.createElement('base');
    doc.head.appendChild(base);
    const a = doc.createElement('a');
    doc.body.appendChild(a);
    base.href = baseUrl;
    a.href = url;
    return a.href;
  }

  function uid(): () => string {
    let index = 0;

    return function () {
      return 'u' + fourRandomChars() + index++;

      function fourRandomChars(): string {
        return (
          ('0000' + ((Math.random() * Math.pow(36, 4)) << 0).toString(36))
        ).slice(-4);
      }
    };
  }

  function makeImage(uri: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        reject(new Error(`Failed to load image: ${uri}`));
      };
      image.src = uri;
    });
  }

  function getAndEncode(url: string): Promise<string> {
    if (domtoimage.impl.options.cacheBust) {
      url +=
        (/\?/.test(url) ? '&' : '?') + new Date().getTime();
    }

    return new Promise((resolve) => {
      const request = new XMLHttpRequest();

      request.onreadystatechange = done;
      request.ontimeout = timeout;
      request.responseType = 'blob';
      request.timeout = TIMEOUT;
      request.open('GET', url, true);
      request.send();

      let placeholder: string | undefined;
      if (domtoimage.impl.options.imagePlaceholder) {
        const split = domtoimage.impl.options.imagePlaceholder.split(/,/);
        if (split && split[1]) {
          placeholder = split[1];
        }
      }

      function done(): void {
        if (request.readyState !== 4) return;

        if (request.status !== 200) {
          if (placeholder) {
            resolve(placeholder);
          } else {
            fail(
              'cannot fetch resource: ' + url + ', status: ' + request.status
            );
          }

          return;
        }

        const encoder = new FileReader();
        encoder.onloadend = () => {
          const content = (encoder.result as string).split(/,/)[1];
          resolve(content);
        };
        encoder.readAsDataURL(request.response);
      }

      function timeout(): void {
        if (placeholder) {
          resolve(placeholder);
        } else {
          fail(
            'timeout of ' +
              TIMEOUT +
              'ms occured while fetching resource: ' +
              url
          );
        }
      }

      function fail(message: string): void {
        console.error(message);
        resolve('');
      }
    });
  }

  function dataAsUrl(content: string, type: string): string {
    return 'data:' + type + ';base64,' + content;
  }

  function escapeMain(string: string): string {
    return string.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
  }

  function delay(ms: number): (arg: unknown) => Promise<unknown> {
    return (arg) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(arg);
        }, ms);
      });
    };
  }

  function asArray<T>(arrayLike: ArrayLike<T>): T[] {
    const array: T[] = [];
    const length = arrayLike.length;
    for (let i = 0; i < length; i++) array.push(arrayLike[i]);
    return array;
  }

  function escapeXhtml(string: string): string {
    return string.replace(/#/g, '%23').replace(/\n/g, '%0A');
  }

  function width(node: Element): number {
    const leftBorder = px(node, 'border-left-width');
    const rightBorder = px(node, 'border-right-width');
    return node.scrollWidth + leftBorder + rightBorder;
  }

  function height(node: Element): number {
    const topBorder = px(node, 'border-top-width');
    const bottomBorder = px(node, 'border-bottom-width');
    return node.scrollHeight + topBorder + bottomBorder;
  }

  function px(node: Element, styleProperty: string): number {
    const value = window
      .getComputedStyle(node)
      .getPropertyValue(styleProperty);
    return parseFloat(value.replace('px', ''));
  }
}

// ============================================================================
// INLINER
// ============================================================================

function newInliner(): Inliner {
  const URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;
  const util = domtoimage.impl.util;

  return {
    inlineAll,
    shouldProcess,
    impl: {
      readUrls,
      inline,
    },
  };

  function shouldProcess(string: string): boolean {
    return string.search(URL_REGEX) !== -1;
  }

  function readUrls(string: string): string[] {
    const result: string[] = [];
    let match;
    while ((match = URL_REGEX.exec(string)) !== null) {
      result.push(match[1]);
    }
    return result.filter((url) => {
      return !util.isDataUrl(url);
    });
  }

  function inline(
    string: string,
    url: string,
    baseUrl?: string,
    get?: GetAndEncodeCallback
  ): Promise<string> {
    return Promise.resolve(url)
      .then((url) => {
        return baseUrl ? util.resolveUrl(url, baseUrl) : url;
      })
      .then((url) => {
        return (get || util.getAndEncode)(url);
      })
      .then((data) => {
        return util.dataAsUrl(data, util.mimeType(url));
      })
      .then((dataUrl) => {
        return string.replace(urlAsRegex(url), '$1' + dataUrl + '$3');
      });

    function urlAsRegex(url: string): RegExp {
      return new RegExp(
        "(url\\(['\"]?)(" + util.escapeMain(url) + ")(['\"]?\\))",
        'g'
      );
    }
  }

  function inlineAll(
    string: string,
    baseUrl?: string,
    get?: GetAndEncodeCallback
  ): Promise<string> {
    if (nothingToInline()) return Promise.resolve(string);

    return Promise.resolve(string)
      .then(() => readUrls(string))
      .then((urls) => {
        let done: Promise<string> = Promise.resolve(string);
        urls.forEach((url) => {
          done = done.then((str) => {
            return inline(str, url, baseUrl, get);
          });
        });
        return done;
      });

    function nothingToInline(): boolean {
      return !shouldProcess(string);
    }
  }
}

// ============================================================================
// FONT FACES
// ============================================================================

function newFontFaces(): FontFaces {
  const inliner = domtoimage.impl.inliner;
  const util = domtoimage.impl.util;

  return {
    resolveAll,
    impl: {
      readAll,
    },
  };

  function resolveAll(): Promise<string> {
    return readAll()
      .then((webFonts) => {
        return Promise.all(
          webFonts.map((webFont) => {
            return webFont.resolve();
          })
        );
      })
      .then((cssStrings) => {
        return cssStrings.join('\n');
      });
  }

  function readAll(): Promise<WebFont[]> {
    return Promise.resolve(util.asArray(document.styleSheets))
      .then(getCssRules)
      .then(selectWebFontRules)
      .then((rules) => {
        return rules.map(newWebFont);
      });

    function selectWebFontRules(
      cssRules: CSSRule[]
    ): CSSFontFaceRule[] {
      return cssRules
        .filter((rule): rule is CSSFontFaceRule => {
          return rule.type === CSSRule.FONT_FACE_RULE;
        })
        .filter((rule) => {
          return inliner.shouldProcess(rule.style.getPropertyValue('src'));
        });
    }

    function getCssRules(styleSheets: StyleSheetList | CSSStyleSheet[]): CSSRule[] {
      const cssRules: CSSRule[] = [];
      const sheetArray = Array.isArray(styleSheets) ? styleSheets : util.asArray(styleSheets);
      sheetArray.forEach((sheet) => {
        try {
          util
            .asArray((sheet as CSSStyleSheet).cssRules || [])
            .forEach((rule: any) => {
              cssRules.push(rule);
            });
        } catch (e) {
          console.log(
            'Error while reading CSS rules from ' + (sheet as CSSStyleSheet).href,
            (e as Error).toString()
          );
        }
      });
      return cssRules;
    }

    function newWebFont(webFontRule: CSSFontFaceRule): WebFont {
      return {
        resolve(): Promise<string> {
          const baseUrl = (webFontRule.parentStyleSheet as CSSStyleSheet)?.href;
          return inliner.inlineAll(webFontRule.cssText, baseUrl);
        },
        src(): string {
          return webFontRule.style.getPropertyValue('src');
        },
      };
    }
  }
}

// ============================================================================
// IMAGES
// ============================================================================

function newImages(): Images {
  const util = domtoimage.impl.util;
  const inliner = domtoimage.impl.inliner;

  return {
    inlineAll,
    impl: {
      newImage,
    },
  };

  function newImage(element: HTMLImageElement): ImageHandler {
    return {
      inline,
    };

    function inline(get?: GetAndEncodeCallback): Promise<void> {
      if (util.isDataUrl(element.src)) return Promise.resolve();

      return Promise.resolve(element.src)
        .then((src) => {
          return (get || util.getAndEncode)(src);
        })
        .then((data) => {
          return util.dataAsUrl(data, util.mimeType(element.src));
        })
        .then((dataUrl) => {
          return new Promise<void>((resolve, reject) => {
            element.onload = () => {
              resolve();
            };
            element.onerror = () => {
              reject(new Error(`Failed to load image: ${element.src}`));
            };
            element.src = dataUrl;
          });
        });
    }
  }

  function inlineAll(node: Node): Promise<Node> {
    if (!(node instanceof Element)) return Promise.resolve(node);

    return inlineBackground(node).then(() => {
      if (node instanceof HTMLImageElement) return newImage(node).inline();
      else
        return Promise.all(
          util.asArray(node.childNodes).map((child) => {
            return inlineAll(child);
          })
        ).then(() => undefined);
    });

    function inlineBackground(node: Node): Promise<undefined> {
      const background = (node as HTMLElement).style?.getPropertyValue(
        'background'
      );

      if (!background) return Promise.resolve(undefined);

      return inliner
        .inlineAll(background)
        .then((inlined) => {
          (node as HTMLElement).style.setProperty(
            'background',
            inlined,
            (node as HTMLElement).style.getPropertyPriority('background')
          );
        })
        .then(() => undefined);
    }
  }
}
