import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class EnvDto {
  @IsString()
  @IsNotEmpty()
  API_VERSION: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  SERVICE_PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  DB_PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;
}
