import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from 'src/entities/exam.entity';
import { Questions } from 'src/entities/questions.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Exam, Questions]), UserModule],
  controllers: [ExamController],
  providers: [ExamService]
})
export class ExamModule {}
