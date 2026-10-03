import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsString()
  @IsNotEmpty()
  @IsIn(['low', 'medium', 'high'])
  priority!: string;
  @IsString()
  @IsNotEmpty()
  @IsIn(['todo', 'in-progress', 'done'])
  status!: string;
}
