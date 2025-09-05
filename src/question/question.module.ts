import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from 'src/entities/questions.entity';
import { UserModule } from 'src/user/user.module';
import { Exam } from 'src/entities/exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questions, Exam]), UserModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
