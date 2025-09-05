import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ExamService } from './exam.service';
import { AddExamDto } from './dto/add-exam.dto';
import moment from 'moment';
import { UserEmail } from 'src/decorators/user-decorator';
import { EmailGaurd } from 'src/gaurd/email-gaurd';
import { AdminGaurd } from 'src/gaurd/admiin-gaurd';

@Controller('exam')
export class ExamController {
    constructor(private readonly service : ExamService,
      
    ){}

    // @UseGuards(AdminGaurd)
    @UseGuards(EmailGaurd)
    @Post('/add-exam')
    addExam(@Body() exam: AddExamDto, @UserEmail() userEmail: string){
        const {exam_date} = exam;
        console.log(exam_date)
        const date = new Date(exam_date)
        if(!moment(date).isValid()){
            throw new BadRequestException('Invalid exam date')
        }
        if(moment(date).isSameOrBefore(moment())){
            throw new BadRequestException('Future exam date is expected')
        }
        
        return this.service.addExam(exam, userEmail)
    }
}
