import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let noNonBrandFonts;

try {
  noNonBrandFonts = require('../dcyfr-labs/eslint-local-rules/no-non-brand-fonts.js');
} catch {
  noNonBrandFonts = null;
}

const localRuleConfig = noNonBrandFonts
  ? {
      plugins: {
        'dcyfr-local': { rules: { 'no-non-brand-fonts': noNonBrandFonts } },
      },
      rules: {
        'dcyfr-local/no-non-brand-fonts': 'warn',
      },
    }
  : {};

export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'dist/**', 'coverage/**', 'node_modules/**', 'drizzle.config.ts']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...localRuleConfig,
  },
]);
