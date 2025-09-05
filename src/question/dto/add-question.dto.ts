import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsSemVer,
  IsString,
  Min,
} from 'class-validator';

export class AddQuestionDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsBoolean()
  is_multiselect: boolean;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty() // Ensures the array is not empty
  @IsString({ each: true })
  options: string[];

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty() // Ensures the array is not empty
  @IsString({ each: true })
  answer: string[];
}
