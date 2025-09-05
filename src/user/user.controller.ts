import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserSignUpDto } from './dto/userSignUp.dto';


@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(
        private readonly service: UserService
    ){}

    @Post('signup')
    signup(@Body() userData: UserSignUpDto){
        return this.service.signup(userData)
    }
}
