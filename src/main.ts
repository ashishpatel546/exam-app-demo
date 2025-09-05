import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './shared-module/shared-module.module';
import { GlobalConfigService } from './shared-module/global-config.service';
import { swaggerSetup } from './swagger-setup';
import { ValidationPipe } from '@nestjs/common';
import { loggerMiddleware } from './middlewares/logger-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const config = app.select(SharedModule).select(GlobalConfigService)
  app.use(loggerMiddleware)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  swaggerSetup(app)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
