// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // BẮT BUỘC phải có khi dùng ESM + ts-jest
  extensionsToTreatAsEsm: ['.ts'],
  
  // Cấu hình ts-jest dùng ESM mode
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        // Quan trọng: bật isolatedModules để tương thích ESM tốt hơn
        isolatedModules: true,
      },
    ],
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  transformIgnorePatterns: [
    // Chỉ ignore node_modules, TRỪ uuid (và các package bạn muốn transform)
    'node_modules/(?!(uuid|another-esm-package)/)',
  ],


  setupFilesAfterEnv: ["<rootDir>/tests/tests.setup.ts"],
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
};