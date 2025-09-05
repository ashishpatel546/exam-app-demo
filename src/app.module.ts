import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// import { SharedModule } from './shared-module/shared-module.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { UserMiddleware } from './middlewares/user-middleware';
import { ExamModule } from './exam/exam.module';
import { QuestionModule } from './question/question.module';
import { SharedModule } from './shared-module/shared-module.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    DatabaseModule,
    UserModule,
    ExamModule,
    QuestionModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(UserMiddleware).forRoutes('*')
  }
}
