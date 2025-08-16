import { loadEnv, getEnv, _clearEnvCache } from '../../src/env/loadEnv';
import path from 'path';

describe('env loading', () => {
  const originalCwd = process.cwd();
  const fixturesDir = path.join(__dirname, 'fixtures');

  beforeEach(() => {
    process.chdir(fixturesDir);
    _clearEnvCache();
  });

  afterEach(() => {
    process.chdir(originalCwd);
    delete process.env.SERVICE_ENV;
    delete process.env.NODE_ENV;
  });

  it('loads dev environment explicitly', () => {
    const env = loadEnv('dev');
    expect(env.SERVICE_NAME).toBe('demo');
    expect(env.PORT).toBe(3000);
  });

  it('loads environment using SERVICE_ENV', () => {
    process.env.SERVICE_ENV = 'qa';
    const env = loadEnv();
    expect(env.SERVICE_ENV).toBe('qa');
  });

  it('throws on missing file', () => {
    expect(() => loadEnv('missing')).toThrow(/Environment file not found/);
  });

  it('throws on invalid data', () => {
    expect(() => loadEnv('bad')).toThrow(/Invalid environment configuration/);
  });

  it('caches result and getEnv returns it', () => {
    const env1 = loadEnv('dev');
    const env2 = loadEnv('dev');
    expect(env1).toBe(env2);
    expect(getEnv()).toBe(env1);
  });

  it('getEnv throws if not loaded', () => {
    _clearEnvCache();
    expect(() => getEnv()).toThrow(/Environment not loaded/);
  });
});
