import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export enum NodeEnv {
  development = 'development',
  qa = 'qa',
  production = 'production',
  test = 'test',
}

export enum ServiceEnv {
  dev = 'dev',
  qa = 'qa',
  prd = 'prd',
}

export enum LogLevel {
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
  fatal = 'fatal',
}

export class EnvDto {
  @IsEnum(NodeEnv)
  NODE_ENV!: NodeEnv;

  @IsEnum(ServiceEnv)
  SERVICE_ENV!: ServiceEnv;

  @IsString()
  SERVICE_NAME!: string;

  @IsOptional()
  @IsInt()
  @Min(1024)
  PORT?: number;

  @IsOptional()
  @IsEnum(LogLevel)
  LOG_LEVEL?: LogLevel;

  @IsOptional()
  @IsString()
  GOOGLE_CLOUD_PROJECT?: string;
}
