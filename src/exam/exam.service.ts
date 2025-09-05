import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from 'src/entities/exam.entity';
import { Repository } from 'typeorm';
import { AddExamDto } from './dto/add-exam.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ExamService {
    private logger = new Logger(ExamService.name)

    constructor(
        @InjectRepository(Exam) private readonly examRepo : Repository<Exam>,
        private readonly userService: UserService
        
    ){}

    async addExam(examDto: AddExamDto, userEmail: string){
        try {
            const user = await this.userService.findUserByEmail(userEmail)
            
            if(!user){
                throw new BadRequestException('User not found with email provided in the header')
            }
            if(user.role !== 'admin'){
                throw new UnauthorizedException('You are not allowed to add exams')
            }
            if(examDto.total_question < examDto.question_in_exam){
                throw new BadRequestException('Total question should be greater than question in exam')
            }
            const newExam = this.examRepo.create({...examDto, created_by: user})
                // newExam.created_by = [user];
            await this.examRepo.save(newExam)
            return {
                status: 'ok',
                description: 'exam created'
            }
        } catch (error) {
            this.logger.error(error.message)
            throw new InternalServerErrorException(error.message)
        }
    }

    async listExam(limit: number, offset=0, exam_name?: string, orderBy= 'exam_name'){
        try {
            let query = this.examRepo.createQueryBuilder('exam').select()
            if(exam_name){
                query.where('exam.exam_name =:exam_name', {exam_name: exam_name})
            }
            if(orderBy){
                query.orderBy(`exam.${orderBy}`, 'ASC')
            }
            if(limit){
            query.take(limit)
        }
        if(offset){
            query.skip(offset)
        }
            const result = await query.getMany()
            return result
        } catch (error) {
            this.logger.error(error.message)
            throw new InternalServerErrorException(error.message)
        }
    }
}
