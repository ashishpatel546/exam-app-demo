import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './shared-module/shared-module.module';
import { GlobalConfigService } from './shared-module/global-config.service';
import { setupSwagger } from './swagger-setup';
import { Logger, ValidationPipe } from '@nestjs/common';
import { loggerMiddleware } from './middlewares/logger-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.select(SharedModule).get(GlobalConfigService)
  app.use(loggerMiddleware);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  setupSwagger(app);
  const port = config.envConfig.SERVICE_PORT;

  await app.listen(port ?? 3000, async()=>{
    Logger.debug(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
