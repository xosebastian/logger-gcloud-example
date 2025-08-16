import base from '../../jest.config';
import type { Config } from 'jest';

const { testRegex, ...baseConfig } = base;

const config: Config = {
  ...baseConfig,
  rootDir: '.',
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
};

export default config;
