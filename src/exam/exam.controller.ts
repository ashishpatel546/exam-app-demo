import { BadRequestException, Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ExamService } from './exam.service';
import { AddExamDto } from './dto/add-exam.dto';
import moment from 'moment';
import { UserEmail } from 'src/decorators/user-decorator';
import { EmailGaurd } from 'src/gaurd/email-gaurd';
import { AdminGaurd } from 'src/gaurd/admiin-gaurd';
import { ApiProperty } from '@nestjs/swagger';

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

    @ApiProperty({
        name: 'exam_name',
        description: 'exam_name',
        required: false
    })
    @ApiProperty({
        name: 'order_by',
        description: 'order_by',
        required: false
    })
    @ApiProperty({
        name: 'limit',
        description: 'limit default 10',
        required: false,
        type: Number
    })
    @ApiProperty({
        name: 'offset',
        description: 'offset',
        required: false,
        type: Number
    })
    @Get('list-exams')
    listExams(@Query('order_by') orderBy?: string, @Query('exam_name') exam_name?: string, @Query('limit') limit=10, @Query('offset') offset=0){
        return this.service.listExam(limit, offset, exam_name, orderBy)
    }
}
