import 'reflect-metadata';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvDto } from './env.dto';

function buildFilePath(envName: string): string {
  return join(process.cwd(), 'environments', `${envName}.env.yaml`);
}

export function loadEnvFile(envName?: string): EnvDto {
  const env =
    envName ?? process.env.SERVICE_ENV ?? process.env.NODE_ENV ?? 'dev';
  const filePath = buildFilePath(env);
  if (!existsSync(filePath)) {
    throw new Error(`Environment file not found: ${filePath}`);
  }
  const raw = readFileSync(filePath, 'utf8');
  const parsed = parse(raw);
  const dto = plainToInstance(EnvDto, parsed, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(dto, { whitelist: true });
  if (errors.length > 0) {
    const message = errors
      .flatMap((e) => Object.values(e.constraints ?? {}))
      .join('; ');
    throw new Error(`Invalid environment configuration: ${message}`);
  }
  return dto;
}
