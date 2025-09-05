import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from 'src/entities/questions.entity';
import { Repository } from 'typeorm';
import { AddQuestionDto } from './dto/add-question.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class QuestionService {
    private logger = new Logger(QuestionService.name)

    constructor(
        @InjectRepository(Questions) private readonly quesRepo: Repository<Questions>,
        private readonly userService: UserService
    ){}

    async addQeustions(questions: AddQuestionDto, userEmail: string){
        try {
            const userArray = await this.userService.findUserByEmail(userEmail)
                        if(!userArray){
                            throw new BadRequestException('User not found with email provided in the header')
                        }
                        const user = userArray[0]
                        if(user.role !== 'admin'){
                            throw new UnauthorizedException('You are not allowed to add exams')
                        }
            const newQuestion = this.quesRepo.create({...questions, created_by: user })
            await this.quesRepo.save(newQuestion);
            return {
                status: 'ok',
                description: 'exam created'
            }
        } catch (error) {
            this.logger.error(error.message)
            throw new InternalServerErrorException(error.message)
        }
    }
}
