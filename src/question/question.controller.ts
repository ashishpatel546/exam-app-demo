import { Body, Controller, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { AddQuestionDto } from './dto/add-question.dto';
import { UserEmail } from 'src/decorators/user-decorator';

@Controller('question')
export class QuestionController {
    constructor(private readonly service: QuestionService){}

    @Post('/add-question')
    addQuestion(@Body() quesions: AddQuestionDto,  @UserEmail() userEmail: string){
         return this.service.addQeustions(quesions, userEmail)
    }
}
