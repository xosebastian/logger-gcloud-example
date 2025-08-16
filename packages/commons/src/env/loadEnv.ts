import { EnvDto } from './env.dto';
import { loadEnvFile } from './env-loader';

let cachedEnv: Readonly<EnvDto> | undefined;

/**
 * Load environment configuration from YAML files. Result is cached.
 */
export function loadEnv(envName?: string): Readonly<EnvDto> {
  if (!cachedEnv) {
    cachedEnv = Object.freeze(loadEnvFile(envName));
  }
  return cachedEnv;
}

/**
 * Get previously loaded environment configuration. Throws if not loaded.
 */
export function getEnv(): Readonly<EnvDto> {
  if (!cachedEnv) {
    throw new Error('Environment not loaded. Call loadEnv() first.');
  }
  return cachedEnv;
}

/** Internal: clear cached environment (for tests). */
export function _clearEnvCache() {
  cachedEnv = undefined;
}
