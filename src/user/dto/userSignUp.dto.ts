import { IsEnum, IsString } from "class-validator";
import { UserRole } from "src/entities/user.entity";


export class UserSignUpDto{

    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    @IsEnum(UserRole)
    role: string
}