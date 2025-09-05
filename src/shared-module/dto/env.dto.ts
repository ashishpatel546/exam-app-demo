import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";


export class EnvDto{
    @IsString()
    API_VERSION: string

    @IsNumber()
    @Transform(({value})=> Number(value))
    SERVICE_PORT: number

    @IsString()
    DB_HOST: string

    @IsString()
    @Transform(({value})=> Number(value))
    DB_PORT: number

    @IsString()
    DB_NAME: string

    @IsString()
    DB_USERNAME: string

    @IsString()
    DB_PASSWORD: string
}