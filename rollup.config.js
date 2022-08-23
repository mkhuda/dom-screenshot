import { terser } from "rollup-plugin-terser";
import copy from 'rollup-plugin-copy'

export default {
  input: "src/dom-screenshot.js",
  output: [
    {
      file: "dist/dom-screenshot.min.js",
      format: "iife",
      name: "version",
      plugins: [
        terser(),
        copy({
          targets: [{ src: "types/dom-screenshot.d.ts", dest: "dist" }],
          hook: 'writeBundle'
        }),
      ],
    },
  ],
};
