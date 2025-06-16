import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  // Global ignore patterns
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  // Main configuration
  {
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Add your ESLint rules here
    },
  },
  pluginJs.configs.recommended,
];
