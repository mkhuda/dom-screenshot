import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/dom-screenshot.ts',
  output: [
    {
      file: 'dist/dom-screenshot.min.js',
      format: 'iife',
      name: 'domtoimage',
      sourcemap: true,
      plugins: [
        terser({
          compress: {
            drop_console: false,
          },
          format: {
            comments: false,
          },
        }),
      ],
    },
    {
      file: 'dist/dom-screenshot.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.build.json',
    }),
  ],
};
