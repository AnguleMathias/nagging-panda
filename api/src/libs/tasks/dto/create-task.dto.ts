import { IsString, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '../interfaces/tasks.interface';

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
    enum: TaskPriority,
  })
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @ApiProperty({
    example: 'Pending',
    description: 'The status of the task',
    enum: TaskStatus,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class UpdateTaskDto extends CreateTaskDto {}
