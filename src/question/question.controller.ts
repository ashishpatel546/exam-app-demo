import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { AddQuestionDto } from './dto/add-question.dto';
import { UserEmail } from 'src/decorators/user-decorator';
import { ApiProperty } from '@nestjs/swagger';

@Controller('question')
export class QuestionController {
  constructor(private readonly service: QuestionService) {}

  @Post('/add-question')
  addQuestion(
    @Body() quesions: AddQuestionDto,
    @UserEmail() userEmail: string,
  ) {
    return this.service.addQeustions(quesions, userEmail);
  }

  @ApiProperty({
    name: 'description',
    description: 'Search by question description',
    required: false,
  })
  @ApiProperty({
    name: 'order_by',
    description: 'order_by field (default: description)',
    required: false,
  })
  @ApiProperty({
    name: 'limit',
    description: 'limit default 10',
    required: false,
    type: Number,
  })
  @ApiProperty({
    name: 'offset',
    description: 'offset',
    required: false,
    type: Number,
  })
  @Get('list-questions')
  listQuestions(
    @Query('order_by') orderBy?: string,
    @Query('description') description?: string,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    return this.service.listQuestions(limit, offset, description, orderBy);
  }

  @ApiProperty({
    name: 'limit',
    description: 'Maximum number of questions to return (default: 10)',
    required: false,
    type: Number,
  })
  @ApiProperty({
    name: 'examId',
    description: 'ID of the exam to get shuffled questions from',
    required: true,
    type: Number,
  })
  @Get('get-shuffled-questions')
  getShuffledQuestions(
    @Query('limit') limit = 10,
    @Query('examId') examId: number,
  ) {
    return this.service.getShuffledQuestions(limit, examId);
  }
}
