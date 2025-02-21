import reactPlugin from 'eslint-plugin-react';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

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
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          warnOnUnassignedImports: true,
          groups: [
            ['builtin', 'external'], // Node.js 내장 모듈과 외부 라이브러리
            'internal', // 내부 모듈 (예: @/utils)
            ['parent', 'sibling', 'index'], // 상대 경로
            'type', // TypeScript 타입 import
            'unknown',
          ],
          pathGroups: [
            {
              pattern: 'react*',
              group: 'external',
              position: 'before', // React 라이브러리를 외부 라이브러리 그룹의 최상단에 배치
            },
            {
              pattern: '@shared*',
              group: 'internal',
              position: 'before', // 내부 경로(@/...)를 internal 그룹의 최상단에 배치
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before', // 내부 경로(@/...)를 internal 그룹의 최상단에 배치
            },
            {
              pattern: '{**,.}/*.css', // CSS 파일 패턴
              group: 'unknown', // index 그룹으로 분류
              position: 'after', // 그룹의 마지막에 배치
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'type'], // 기본 내장 모듈은 pathGroups에서 제외
          'newlines-between': 'always', // 그룹 간 줄바꿈 강제
          alphabetize: {
            order: 'asc', // 알파벳 순서로 정렬
            caseInsensitive: true, // 대소문자 무시
          },
        },
      ],
    },
  },
];
