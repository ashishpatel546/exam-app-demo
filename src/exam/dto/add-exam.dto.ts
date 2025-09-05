import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsSemVer, IsString, Min } from 'class-validator';


export class AddExamDto {

  @ApiProperty()
  @IsString()
  exam_name: string;

  @ApiProperty()
  @IsString()
  exam_date: string;


  @ApiProperty()
  @IsNumber()
  @IsInt() // Ensures the value is an integer
  @Min(1, { message: 'Number of questions cannot be less than 1' }) // Sets a minimum value of 1
  total_question: number;


  @ApiProperty()
  @IsInt() // Ensures the value is an integer
  @Min(1, { message: 'Number of questions cannot be less than 1' }) // Sets a minimum value of 1
  question_in_exam: number;

  @ApiProperty()
  @IsInt() // Ensures the value is an integer
  @Min(40, { message: 'passing percentage can not be less than 40' }) // Sets a minimum value of 1
  passing_percentage: number;
}
