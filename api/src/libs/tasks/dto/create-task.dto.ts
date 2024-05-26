import { IsString, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task title', description: 'The title of the task' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Task description',
    description: 'A detailed description of the task',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '2024-05-26T00:00:00Z',
    description: 'The due date of the task',
  })
  @IsDate()
  due_date: Date;

  @ApiProperty({
    example: 'High',
    description: 'The priority of the task',
    enum: ['Low', 'Medium', 'High'],
  })
  @IsEnum(['Low', 'Medium', 'High'])
  priority: string;

  @ApiProperty({
    example: 'Pending',
    description: 'The status of the task',
    enum: ['Pending', 'In Progress', 'Completed'],
  })
  @IsEnum(['Pending', 'In Progress', 'Completed'])
  status: string;
}

export class UpdateTaskDto extends CreateTaskDto {}
