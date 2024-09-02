import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min, validateSync } from 'class-validator';

class SequelizeEnvironmentVariables {
  @IsNotEmpty()
  DATABASE_NAME: string;

  @IsNotEmpty()
  DATABASE_HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number;

  @IsNotEmpty()
  DATABASE_USERNAME: string;

  @IsNotEmpty()
  DATABASE_PASSWORD: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    SequelizeEnvironmentVariables,
    config,
    {
      enableImplicitConversion: true,
    },
  );
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
