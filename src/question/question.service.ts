import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from 'src/entities/questions.entity';
import { Exam } from 'src/entities/exam.entity';
import { Repository } from 'typeorm';
import { AddQuestionDto } from './dto/add-question.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class QuestionService {
  private logger = new Logger(QuestionService.name);

  constructor(
    @InjectRepository(Questions)
    private readonly quesRepo: Repository<Questions>,
    @InjectRepository(Exam)
    private readonly examRepo: Repository<Exam>,
    private readonly userService: UserService,
  ) {}

  async addQeustions(questions: AddQuestionDto, userEmail: string) {
    try {
      const user = await this.userService.findUserByEmail(userEmail);
      if (!user) {
        throw new BadRequestException(
          'User not found with email provided in the header',
        );
      }
      if (user.role !== 'admin') {
        throw new UnauthorizedException('You are not allowed to add exams');
      }
      const newQuestion = this.quesRepo.create({
        ...questions,
        created_by: user,
      });
      await this.quesRepo.save(newQuestion);
      return {
        status: 'ok',
        description: 'exam created',
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async listQuestions(
    limit: number,
    offset = 0,
    description?: string,
    orderBy = 'description',
  ) {
    try {
      let query = this.quesRepo.createQueryBuilder('question').select();
      if (description) {
        query.where('question.description LIKE :description', {
          description: `%${description}%`,
        });
      }
      if (orderBy) {
        query.orderBy(`question.${orderBy}`, 'ASC');
      }
      if (limit) {
        query.take(limit);
      }
      if (offset) {
        query.skip(offset);
      }
      const result = await query.getMany();
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getShuffledQuestions(limit: number, examId: number) {
    try {
      // First, verify that the exam exists
      const exam = await this.examRepo.findOne({
        where: { id: examId },
      });

      if (!exam) {
        throw new BadRequestException('Exam not found with the provided ID');
      }

      // Get the count of total questions for this exam
      const totalQuestions = await this.quesRepo
        .createQueryBuilder('question')
        .where('question.examId = :examId', { examId })
        .getCount();

      if (totalQuestions === 0) {
        return {
          status: 'ok',
          description: 'No questions found for this exam',
          data: [],
        };
      }

      // Calculate the actual limit based on exam configuration
      const questionsToReturn = Math.min(
        limit,
        exam.question_in_exam,
        totalQuestions,
      );

      // Get shuffled questions using SQL's RANDOM() function
      const shuffledQuestions = await this.quesRepo
        .createQueryBuilder('question')
        .where('question.examId = :examId', { examId })
        .orderBy('RANDOM()') // This works for SQLite and PostgreSQL
        // For MySQL use: .orderBy('RAND()')
        // For SQL Server use: .orderBy('NEWID()')
        .limit(questionsToReturn)
        .getMany();

      return {
        status: 'ok',
        description: 'Shuffled questions retrieved successfully',
        data: shuffledQuestions,
        totalAvailable: totalQuestions,
        questionsReturned: shuffledQuestions.length,
        examInfo: {
          examName: exam.exam_name,
          totalQuestions: exam.total_question,
          questionsInExam: exam.question_in_exam,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
