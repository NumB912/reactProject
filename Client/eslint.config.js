import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  { ignores: ['dist', 'build'] },

  // Áp dụng rule cho TypeScript
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // 🔒 TypeScript: tránh biến thừa, hạn chế any
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z_]' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],

      // 🔒 React Hooks an toàn
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // 🔒 React Refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // 🔒 Tránh lỗ hổng phổ biến
      'no-eval': 'error',                  // tránh eval → dễ bị XSS
      'no-implied-eval': 'error',          // tránh setTimeout("code")
      'no-new-func': 'error',              // tránh Function("code")
      'no-danger': 'off',                  // React không có rule này, nhưng tránh dùng dangerouslySetInnerHTML
    },
  },
]
