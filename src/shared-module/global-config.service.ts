import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EnvDto } from './dto/env.dto';
import { validateSync } from 'class-validator';

@Injectable()
export class GlobalConfigService {
  envConfig: EnvDto;

  constructor() {
    const config = plainToInstance(EnvDto, process.env, {
      enableImplicitConversion: true,
      excludeExtraneousValues: false,
    });
    const errors = validateSync(config, {
    //   whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    this.envConfig = config;
  }

  get env(): EnvDto {
    return this.envConfig;
  }
}
