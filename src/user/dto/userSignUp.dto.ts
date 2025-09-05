import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { UserRole } from "src/entities/user.entity";


export class UserSignUpDto{


    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @IsEnum(UserRole)
    role: string
}