import reactPlugin from 'eslint-plugin-react';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      '**/node_modules/**', // node_modules 디렉토리 무시
      'dist/**', // dist 디렉토리 무시
      '*.config.{js,ts}', // 특정 config 파일 무시
    ],
  },
  {
    files: ['**/*.{js,ts,jsx,tsx}'], // 검사할 파일 확장자 지정
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
