import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const noNonBrandFonts = require('../dcyfr-labs/eslint-local-rules/no-non-brand-fonts.js');

export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'dist/**', 'coverage/**', 'node_modules/**']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'dcyfr-local': { rules: { 'no-non-brand-fonts': noNonBrandFonts } },
    },
    rules: {
      'dcyfr-local/no-non-brand-fonts': 'warn',
    },
  },
]);
