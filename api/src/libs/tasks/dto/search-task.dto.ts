import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '../interfaces/tasks.interface';

export class SearchTaskDto {
  @ApiProperty({
    example: 'Task title',
    description: 'The title of the task',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'Task description',
    description: 'A detailed description of the task',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'assignee_id',
    description: 'The ID of the assignee',
    required: false,
  })
  @IsOptional()
  @IsString()
  assignee?: string;

  @ApiProperty({
    example: 'Pending',
    description: 'The status of the task',
    enum: TaskStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({
    example: '2024-05-26T00:00:00Z',
    description: 'The due date of the task',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({
    example: 'High',
    description: 'The priority of the task',
    enum: TaskPriority,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;
}
