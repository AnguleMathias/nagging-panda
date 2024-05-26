import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // Protect all routes in this controller
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiOperation({ summary: 'Get a task by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @ApiOperation({ summary: 'Get all tasks for a user' })
  @Get()
  findAll(@Query('userId') userId: string) {
    return this.tasksService.findAll(userId);
  }

  @ApiOperation({ summary: 'Update a task by ID' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Delete a task by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  @ApiOperation({ summary: 'Get dashboard data for a user' })
  @Get('dashboard/:userId')
  getDashboard(@Param('userId') userId: string) {
    return this.tasksService.getDashboard(userId);
  }

  @ApiOperation({ summary: 'Search and filter tasks for a user' })
  @Get('search/:userId')
  searchAndFilter(
    @Param('userId') userId: string,
    @Query() searchParams: SearchTaskDto,
  ) {
    return this.tasksService.searchAndFilter(userId, searchParams);
  }
}
